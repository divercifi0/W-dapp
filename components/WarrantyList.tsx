import React, { useEffect } from "react";
import { useWarranty } from "@/hooks/useWarranty";
import WarrantyCard from "./WarrantyCard";
import { BlockchainLoader } from "./ui/blockLoader";

function WarrantyList({ account }: { account: string }) {
  const { warranties, warrantyLoading, getWarranties } = useWarranty();

  useEffect(() => {
    if (account) {
      getWarranties(account);
    }
  }, [account]);

  useEffect(() => {
    console.log(warranties);
  }, [warranties]);

  return (
    <div className="flex flex-col gap-4 w-full rounded-md">
      {warrantyLoading ? (
        <div className="flex justify-center items-center h-screen">
          <BlockchainLoader size="md" />
        </div>
      ) : warranties?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {warranties.map((warranty) => (
            <WarrantyCard key={warranty.hash} warranty={warranty} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-max p-10 ">
          <h2 className="text-lg font-bold">No warranties found</h2>
        </div>
      )}
    </div>
  );
}

export default WarrantyList;

// <MagicCard className="flex flex-col gap-4 bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#0ea5e9_0,#0ea5e9_50%,transparent_100%)]  shadow-2xl"> */

// <MagicCard className="bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#ffaa40_0,#f97300_50%,transparent_100%)]  shadow-2xl"> */

// <MagicCard className="bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#493D9E_0,#B2A5FF_50%,transparent_100%)]  shadow-2xl"></MagicCard>
