import { motion } from "framer-motion";

export default function PopIn({
  children,
  delay = 0,
  className = "",
}) {
  return (
    <motion.div
      className={`h-full ${className}`}
      initial={{
        opacity: 0,
        scale: 0.94,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}