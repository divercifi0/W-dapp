import React, { useEffect, useState } from "react";
import { useWarranty } from "@/hooks/useWarranty";
import ClaimCard from "./ClaimCard";
import { BlockchainLoader } from "@/components/ui/blockLoader";

function ClaimWarranty({ provider, account }: { provider: any; account: any }) {
  const { allWarranties, getAllWarranties, warrantyLoading } = useWarranty();
  //   const [warrantyList, setWarrantyList] = useState<any>([]);

  useEffect(() => {
    getAllWarranties();
  }, []);

  //   useEffect(() => {
  //     console.log("allWarranties", allWarranties);

  //     if (allWarranties?.length) {
  //       setWarrantyList(allWarranties);
  //     }
  //   }, [allWarranties]);

  return (
    <div>
      {warrantyLoading ? (
        <div className="flex justify-center items-center h-screen">
          <BlockchainLoader size="md" />
        </div>
      ) : allWarranties?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allWarranties.map((warranty: any) => (
            <ClaimCard
              account={account}
              key={warranty.hash}
              warranty={warranty}
              provider={provider}
            />
          ))}
        </div>
      ) : (
        <div>No warranties found</div>
      )}
    </div>
  );
}

export default ClaimWarranty;
