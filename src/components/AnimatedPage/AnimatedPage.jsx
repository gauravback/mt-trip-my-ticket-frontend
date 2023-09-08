import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
