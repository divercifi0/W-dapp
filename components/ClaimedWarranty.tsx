import React from "react";

function ClaimedWarranty({ account }: { account: string }) {
  return (
    <div>
      <h1>Claimed Warranties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>{account}</div>
      </div>
    </div>
  );
}

export default ClaimedWarranty;
