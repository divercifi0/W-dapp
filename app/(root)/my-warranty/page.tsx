"use client";
import ClaimedWarranty from "@/components/ClaimedWarranty";
import React, { useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContextType } from "@/context/Auth";
import { AuthContext } from "@/context/Auth";
import ClaimWarranty from "@/components/ClaimWarranty";
// import ClaimWarranty from "@/components/ClaimWarranty";

function UserFlow() {
  const { provider, account } = useContext(AuthContext) as AuthContextType;
  return (
    <div>
      <div className="w-full border rounded-lg p-4">
        <Tabs defaultValue="claim" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="claim" className="cursor-pointer">
              Claim Warranty
            </TabsTrigger>
            <TabsTrigger value="claimed" className="cursor-pointer">
              Claimed Warranties
            </TabsTrigger>
          </TabsList>
          <div className="py-4">
            <TabsContent value="claim">
              <ClaimWarranty provider={provider} account={account} />
            </TabsContent>
            <TabsContent value="claimed">
              <ClaimedWarranty account={account} provider={provider} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default UserFlow;
