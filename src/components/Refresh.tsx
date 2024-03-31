'use client'

import { useRouter } from "next/navigation";

const Refresh = () => {
  const router = useRouter();
  router.refresh();

  return null;
};

export default Refresh;
