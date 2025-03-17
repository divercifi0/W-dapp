"use client";

import React, { useContext, useEffect, useState } from "react";
import { AdminForm } from "@/components/AdminForm";
import { WarrantyForm } from "@/components/WarrantyForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContextType } from "@/context/Auth";
import { AuthContext } from "@/context/Auth";
import WarrantyList from "@/components/WarrantyList";
import ClaimWarranty from "@/components/ClaimWarranty";
function EnterpriseFlow() {
  const { provider, loggedIn, account } = useContext(
    AuthContext
  ) as AuthContextType;

  return (
    <div className="w-full border rounded-lg p-4">
      <Tabs defaultValue="view" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="view" className="cursor-pointer">
            All Warranties
          </TabsTrigger>
          <TabsTrigger value="claim" className="cursor-pointer">
            Claim Warranty
          </TabsTrigger>
          <TabsTrigger value="add" className="cursor-pointer">
            Add Warranty
          </TabsTrigger>
          {/* <TabsTrigger value="register" className="cursor-pointer">
            Enterprise Registration
          </TabsTrigger> */}
        </TabsList>
        <div className="py-4">
          <TabsContent value="view">
            <WarrantyList account={account} />
          </TabsContent>
          <TabsContent value="add">
            <WarrantyForm account={account} provider={provider} />
          </TabsContent>
          {/* <TabsContent value="register">
            <div className="w-max border rounded-md py-2 px-4 my-4">
              <h1>Enterprise Registration</h1>
            </div>
            <AdminForm account={account} provider={provider} />
          </TabsContent> */}
          <TabsContent value="claim">
            <ClaimWarranty provider={provider} account={account} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default EnterpriseFlow;
