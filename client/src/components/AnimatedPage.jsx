// src/components/AnimatedPage.jsx
import { motion } from "framer-motion";
import { useEffect } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.97,
    y: 20,
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    scale: 0.97,
    y: -20,
  },
};

const pageTransition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.6,
};

export default function AnimatedPage({ children }) {
  
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{
        willChange: "transform, opacity",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
