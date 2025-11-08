/**
 * Strapi Cloud API Service
 * Handles all API calls to Strapi Cloud
 */

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || '';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || '';

/**
 * Fetch products from Strapi
 * @param {Object} options - Query options
 * @param {string} options.category - Filter by category
 * @param {number} options.limit - Limit number of results
 * @returns {Promise<Array>} Array of products
 */
export const fetchProducts = async (options = {}) => {
  try {
    if (!STRAPI_API_URL) {
      throw new Error('Strapi API URL is not configured. Please set VITE_STRAPI_API_URL in your .env file');
    }

    // Build query parameters
    const queryParams = new URLSearchParams();
    
    if (options.category) {
      queryParams.append('filters[category][$eq]', options.category);
    }
    
    if (options.limit) {
      queryParams.append('pagination[limit]', options.limit);
    }

    // Populate image field to get full image data
    queryParams.append('populate', 'image');

    const queryString = queryParams.toString();
    const url = `${STRAPI_API_URL}/api/products?${queryString}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Transform Strapi response to match existing product structure
    return data.data.map((item) => {
      // Handle Strapi image format
      let imageUrl = 'product1.webp'; // default fallback
      
      if (item.attributes.image?.data?.attributes?.url) {
        const imagePath = item.attributes.image.data.attributes.url;
        // If URL is already absolute, use it as-is; otherwise prepend API URL
        imageUrl = imagePath.startsWith('http') 
          ? imagePath 
          : `${STRAPI_API_URL}${imagePath}`;
      } else if (item.attributes.image) {
        // Handle case where image might be a string
        imageUrl = item.attributes.image;
      }

      return {
        id: item.id.toString(),
        name: item.attributes.name,
        description: item.attributes.description || '',
        category: item.attributes.category,
        image: imageUrl,
      };
    });
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
      throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const item = data.data;

    // Handle Strapi image format
    let imageUrl = 'product1.webp'; // default fallback
    
    if (item.attributes.image?.data?.attributes?.url) {
      const imagePath = item.attributes.image.data.attributes.url;
      // If URL is already absolute, use it as-is; otherwise prepend API URL
      imageUrl = imagePath.startsWith('http') 
        ? imagePath 
        : `${STRAPI_API_URL}${imagePath}`;
    } else if (item.attributes.image) {
      // Handle case where image might be a string
      imageUrl = item.attributes.image;
    }

    return {
      id: item.id.toString(),
      name: item.attributes.name,
      description: item.attributes.description || '',
      category: item.attributes.category,
      image: imageUrl,
    };
  } catch (error) {
    console.error('Error fetching product from Strapi:', error);
    throw error;
  }
};

