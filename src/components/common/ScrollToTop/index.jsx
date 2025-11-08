import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

let lenisInstance = null;

export const setLenisInstance = (instance) => {
  lenisInstance = instance;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop; 