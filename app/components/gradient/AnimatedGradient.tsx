import { motion } from "framer-motion";

export const AnimatedGradient = () => {
    return (
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-800 to-pink-600"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
    );
  };
  