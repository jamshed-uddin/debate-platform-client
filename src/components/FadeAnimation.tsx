"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

const FadeAnimation = ({
  children,
  delay = 0,
  duration = 0.6,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeAnimation;
