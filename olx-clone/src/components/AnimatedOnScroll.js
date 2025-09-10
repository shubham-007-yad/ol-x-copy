import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedOnScroll = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Store ref.current in a variable for cleanup
    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
      animate={isVisible ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ perspective: 1000 }} // Apply perspective for 3D effect
    >
      {children}
    </motion.div>
  );
};

export default AnimatedOnScroll;
