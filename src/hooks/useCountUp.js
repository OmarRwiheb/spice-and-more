import { useState, useEffect } from 'react';

const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const percentage = Math.min(progress / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4); // Easing function for smooth animation

      const currentCount = Math.floor(easeOutQuart * (end - start) + start);
      setCount(currentCount);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    // Cleanup function to cancel animation frame when component unmounts
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
};

export default useCountUp; 