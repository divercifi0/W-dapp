import React, { useEffect } from "react";
import ClaimedCard from "./ClaimedCard";
import { useWarranty } from "@/hooks/useWarranty";
import { BlockchainLoader } from "@/components/ui/blockLoader";

function ClaimedWarranty({
  account,
  provider,
}: {
  account: string;
  provider: any;
}) {
  const { claimedWarranties, getClaimedWarranties, warrantyLoading } =
    useWarranty();
  useEffect(() => {
    getClaimedWarranties(account);
  }, []);

  return (
    <div>
      {warrantyLoading ? (
        <div className="flex justify-center items-center h-screen">
          <BlockchainLoader size="md" />
        </div>
      ) : claimedWarranties?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {claimedWarranties.map((warranty: any) => (
            <ClaimedCard
              account={account}
              key={warranty.hash}
              warranty={warranty}
              provider={provider}
            />
          ))}
        </div>
      ) : (
        <div>No warranties Claimed</div>
      )}
    </div>
  );
}

export default ClaimedWarranty;
