"use client";

import { motion } from "framer-motion";

export const AnimatedGradient = () => {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-blue-900 to-pink-700"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 5,
        ease: "linear",
        repeat: Infinity,
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    />
  );
};
  