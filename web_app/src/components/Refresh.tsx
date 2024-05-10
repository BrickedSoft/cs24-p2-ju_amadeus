"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Refresh = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Refresh;
