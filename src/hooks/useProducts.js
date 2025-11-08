import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/strapi';

/**
 * Custom hook to fetch products from Strapi
 * @param {Object} options - Query options
 * @param {string|Array<string>} options.category - Filter by category (single or multiple)
 * @param {string} options.search - Search in product name or description
 * @param {number} options.limit - Limit number of results
 * @param {number} options.start - Start position for pagination
 * @param {string} options.sort - Sort field (e.g., 'name:asc', 'name:desc')
 * @param {Object} options.filters - Custom filters object (Strapi filter format)
 * @param {boolean} options.enabled - Whether to fetch (default: true)
 * @returns {Object} { products, loading, error, refetch }
 */
export const useProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (options.enabled === false) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(options);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      console.error('Error in useProducts:', err);
    } finally {
      setLoading(false);
    }
  }, [options.category, options.search, options.limit, options.start, options.sort, options.enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    products,
    loading,
    error,
    refetch: fetchData,
  };
};

