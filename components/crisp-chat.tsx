"use-client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("1643d167-fa11-4d10-8cc0-136de06b460d");
  }, []);

  return null;
};
