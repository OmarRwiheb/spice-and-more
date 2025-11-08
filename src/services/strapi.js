/**
 * Strapi Cloud API Service
 * Handles all API calls to Strapi Cloud
 */

// Normalize API URL (remove trailing slash)
const normalizeUrl = (url) => {
  if (!url) return '';
  return url.replace(/\/+$/, '');
};

const STRAPI_API_URL = normalizeUrl(import.meta.env.VITE_STRAPI_API_URL || '');
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || '';

/**
 * Fetch products from Strapi
 * @param {Object} options - Query options
 * @param {string|Array<string>} options.category - Filter by category (single or multiple)
 * @param {string} options.search - Search in product name or description
 * @param {number} options.limit - Limit number of results
 * @param {number} options.start - Start position for pagination
 * @param {string} options.sort - Sort field (e.g., 'name:asc', 'name:desc')
 * @param {Object} options.filters - Custom filters object (Strapi filter format)
 * @returns {Promise<Array>} Array of products
 */
export const fetchProducts = async (options = {}) => {
  try {
    if (!STRAPI_API_URL) {
      throw new Error('Strapi API URL is not configured. Please set VITE_STRAPI_API_URL in your .env file');
    }

    // Build query parameters - Strapi v4+ format
    const queryParams = {};
    
    // Build filters object
    const filters = options.filters || {};
    
    // Category filter - support single or multiple categories
    if (options.category) {
      if (Array.isArray(options.category)) {
        // Multiple categories: use $in operator
        filters.category = {
          $in: options.category
        };
      } else {
        // Single category: use $eq operator
        filters.category = {
          $eq: options.category
        };
      }
    }
    
    // Search filter - search in name or description
    if (options.search) {
      filters.$or = [
        { name: { $containsi: options.search } },
        { description: { $containsi: options.search } }
      ];
    }
    
    // Add custom filters if provided
    if (Object.keys(filters).length > 0) {
      queryParams.filters = filters;
    }
    
    // Build pagination object
    if (options.limit || options.start) {
      queryParams.pagination = {};
      if (options.limit) {
        queryParams.pagination.limit = options.limit;
      }
      if (options.start !== undefined) {
        queryParams.pagination.start = options.start;
      }
    }
    
    // Build sort object
    if (options.sort) {
      const [field, order] = options.sort.split(':');
      queryParams.sort = [`${field}:${order || 'asc'}`];
    }

    // Populate image field to get full image data
    queryParams.populate = 'image';

    // Convert to query string manually to handle nested objects
    const buildQueryString = (params) => {
      const parts = [];
      
      // Build filters query string
      if (params.filters) {
        Object.keys(params.filters).forEach((key) => {
          const filterValue = params.filters[key];
          
          if (key === '$or') {
            // Handle $or operator
            filterValue.forEach((orCondition, index) => {
              Object.keys(orCondition).forEach((field) => {
                const condition = orCondition[field];
                Object.keys(condition).forEach((operator) => {
                  const value = condition[operator];
                  parts.push(`filters[$or][${index}][${field}][${operator}]=${encodeURIComponent(value)}`);
                });
              });
            });
          } else if (typeof filterValue === 'object' && filterValue !== null) {
            // Handle object filters (e.g., { $eq: 'value' } or { $in: ['value1', 'value2'] })
            Object.keys(filterValue).forEach((operator) => {
              const value = filterValue[operator];
              if (Array.isArray(value)) {
                // Handle $in operator with array
                value.forEach((item, idx) => {
                  parts.push(`filters[${key}][${operator}][${idx}]=${encodeURIComponent(item)}`);
                });
              } else {
                parts.push(`filters[${key}][${operator}]=${encodeURIComponent(value)}`);
              }
            });
          } else {
            // Simple equality filter
            parts.push(`filters[${key}]=${encodeURIComponent(filterValue)}`);
          }
        });
      }
      
      // Build pagination query string
      if (params.pagination) {
        if (params.pagination.limit) {
          parts.push(`pagination[limit]=${params.pagination.limit}`);
        }
        if (params.pagination.start !== undefined) {
          parts.push(`pagination[start]=${params.pagination.start}`);
        }
      }
      
      // Build sort query string
      if (params.sort && Array.isArray(params.sort)) {
        params.sort.forEach((sortItem) => {
          parts.push(`sort=${encodeURIComponent(sortItem)}`);
        });
      }
      
      // Build populate query string
      if (params.populate) {
        parts.push(`populate=${encodeURIComponent(params.populate)}`);
      }
      
      return parts.join('&');
    };

    const queryString = buildQueryString(queryParams);
    const url = queryString 
      ? `${STRAPI_API_URL}/api/products?${queryString}`
      : `${STRAPI_API_URL}/api/products?populate=image`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }),
      },
    });

    if (!response.ok) {
      // Try to get more details from the error response
      let errorMessage = `Failed to fetch products: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage += ` - ${JSON.stringify(errorData)}`;
        console.error('Strapi API Error:', errorData);
      } catch (e) {
        // If response is not JSON, use the status text
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Validate response structure
    if (!data) {
      throw new Error('Invalid response from Strapi API: response is null or undefined');
    }

    // Handle different response structures
    const products = data.data || data || [];
    
    if (!Array.isArray(products)) {
      console.error('Unexpected response structure:', data);
      throw new Error('Strapi API returned invalid data structure. Expected array of products.');
    }

    // Transform Strapi response to match existing product structure
    return products.map((item) => {
      // Validate item structure
      if (!item) {
        console.warn('Skipping invalid item:', item);
        return null;
      }

      // Handle both Strapi v4 (attributes) and v3 (direct properties) formats
      const attributes = item.attributes || item;
      
      if (!attributes) {
        console.warn('Item has no attributes:', item);
        return null;
      }

      // Handle Strapi image format
      let imageUrl = 'product1.webp'; // default fallback
      
      const imageData = attributes.image;
      
      if (imageData) {
        // Strapi v4 format: image.data.attributes.url
        if (imageData.data?.attributes?.url) {
          const imagePath = imageData.data.attributes.url;
          imageUrl = imagePath.startsWith('http') 
            ? imagePath 
            : `${STRAPI_API_URL}${imagePath}`;
        }
        // Strapi v3 format or direct URL string
        else if (typeof imageData === 'string') {
          imageUrl = imageData.startsWith('http') 
            ? imageData 
            : `${STRAPI_API_URL}${imageData}`;
        }
        // Direct URL in attributes
        else if (imageData.url) {
          imageUrl = imageData.url.startsWith('http') 
            ? imageData.url 
            : `${STRAPI_API_URL}${imageData.url}`;
        }
      }

      return {
        id: (item.id || item._id || Math.random().toString()).toString(),
        name: attributes.name || 'Unnamed Product',
        description: attributes.description || '',
        category: attributes.category || '',
        image: imageUrl,
      };
    }).filter(Boolean); // Remove any null items
  } catch (error) {
    console.error('Error fetching products from Strapi:', error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const fetchProductById = async (id) => {
  try {
    if (!STRAPI_API_URL) {
      throw new Error('Strapi API URL is not configured');
    }

    const url = `${STRAPI_API_URL}/api/products/${id}?populate=image`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }),
      },
    });

    if (!response.ok) {
      // Try to get more details from the error response
      let errorMessage = `Failed to fetch product: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage += ` - ${JSON.stringify(errorData)}`;
        console.error('Strapi API Error:', errorData);
      } catch (e) {
        // If response is not JSON, use the status text
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Validate response structure
    if (!data) {
      throw new Error('Invalid response from Strapi API: response is null or undefined');
    }

    const item = data.data || data;

    if (!item) {
      throw new Error('Product not found in Strapi response');
    }

    // Handle both Strapi v4 (attributes) and v3 (direct properties) formats
    const attributes = item.attributes || item;

    if (!attributes) {
      throw new Error('Product data is invalid: missing attributes');
    }

    // Handle Strapi image format
    let imageUrl = 'product1.webp'; // default fallback
    
    const imageData = attributes.image;
    
    if (imageData) {
      // Strapi v4 format: image.data.attributes.url
      if (imageData.data?.attributes?.url) {
        const imagePath = imageData.data.attributes.url;
        imageUrl = imagePath.startsWith('http') 
          ? imagePath 
          : `${STRAPI_API_URL}${imagePath}`;
      }
      // Strapi v3 format or direct URL string
      else if (typeof imageData === 'string') {
        imageUrl = imageData.startsWith('http') 
          ? imageData 
          : `${STRAPI_API_URL}${imageData}`;
      }
      // Direct URL in attributes
      else if (imageData.url) {
        imageUrl = imageData.url.startsWith('http') 
          ? imageData.url 
          : `${STRAPI_API_URL}${imageData.url}`;
      }
    }

    return {
      id: (item.id || item._id || Math.random().toString()).toString(),
      name: attributes.name || 'Unnamed Product',
      description: attributes.description || '',
      category: attributes.category || '',
      image: imageUrl,
    };
  } catch (error) {
    console.error('Error fetching product from Strapi:', error);
    throw error;
  }
};

