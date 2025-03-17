"use client";

import React from "react";
import { BlockchainLoader } from "@/components/ui/blockLoader";
const loading = () => {
  return (
    <div className="h-[500px] w-full flex flex-col  justify-center items-center">
      <BlockchainLoader size="lg" />
    </div>
  );
};

export default loading;
