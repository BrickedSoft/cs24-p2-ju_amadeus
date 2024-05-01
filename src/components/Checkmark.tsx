"use client";

import { Suspense } from "react";
import { Variants, motion } from "framer-motion";

type Props = {
  stroke?: string;
  className?: string;
};

const CheckMark: React.FC<Props> = ({ stroke = "white", className = "" }) => {
  return (
    <Suspense fallback={null}>
      <Icon variant={drawVariants} className={className} stroke={stroke} />
    </Suspense>
  );
};

export default CheckMark;

const drawVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 2,
    transition: {
      ease: "easeInOut",
      duration: 2,
    },
  },
};

type LinesProps = {
  stroke?: string;
  variant: Variants;
  className: string;
};

const Icon: React.FC<LinesProps> = ({ stroke, variant, className }) => {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      whileInView="visible"
      stroke={stroke || "hsl(var(--primary))"}
    >
      <motion.path
        d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"
        variants={variant}
      />
      <motion.path
        d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"
        variants={variant}
      />
    </motion.svg>
  );
};
