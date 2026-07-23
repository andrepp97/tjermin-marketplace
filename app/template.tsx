'use client';

import React from 'react';
import { motion, Transition, Target } from 'framer-motion';

interface AnimationPreset {
  initial: Target;
  animate: Target;
  transition: Transition;
}

const fadeAndRise: AnimationPreset = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.28, ease: 'easeInOut' },
};

const scaleFade: AnimationPreset = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const activePreset = fadeAndRise; // fadeAndRise OR scaleFade

  return (
    <motion.div
      initial={activePreset.initial}
      animate={activePreset.animate}
      transition={activePreset.transition}
    >
      {children}
    </motion.div>
  );
}