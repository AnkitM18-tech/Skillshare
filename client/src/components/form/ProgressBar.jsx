import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const ProgressBar = ({ isMediaUploading, progress }) => {
  const [showProgress, setShowProgress] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (isMediaUploading) {
      setShowProgress(true);
      setAnimationProgress(progress);
    } else {
      const timer = setTimeout(() => setShowProgress(false), 1000);

      return () => clearTimeout(timer);
    }
  }, [isMediaUploading, progress]);

  if (!showProgress) return null;

  return (
    <div className="relative w-full h-3 mt-5 mb-5 overflow-hidden bg-gray-200 rounded-full">
      <motion.div
        className="h-3 bg-green-500 rounded-full"
        initial={{ width: 0 }}
        animate={{
          width: `${animationProgress}%`,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      >
        {progress >= 100 && isMediaUploading && (
          <motion.div
            className="absolute top-0 bottom-0 left-0 right-0 bg-green-300 opacity-50"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ProgressBar;
