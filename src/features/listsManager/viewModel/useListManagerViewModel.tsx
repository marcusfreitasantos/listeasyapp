import { useState } from "react";

export const useListManagerViewModel = async () => {
  const [loading, setLoading] = useState(false);

  return {
    loading,
  };
};
