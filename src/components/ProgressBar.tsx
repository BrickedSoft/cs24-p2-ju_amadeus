"use client";

import { Next13ProgressBar } from "next13-progressbar";

const ProgressBar: React.FC = () => {
  return (
    <Next13ProgressBar
      height="4px"
      color="hsl(var(--primary))"
      options={{ showSpinner: false }}
      showOnShallow
    />
  );
};

export default ProgressBar;
