import { motion } from "framer-motion";

export default function TextReveal({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
}) {
  return (
    <div
      className={`overflow-hidden ${className}`}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: "110%",
        }}
        whileInView={{
          opacity: 1,
          y: "0%",
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}