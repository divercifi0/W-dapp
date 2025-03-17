import React, { useContext, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContextType } from "@/context/Auth";
import { AuthContext } from "@/context/Auth";
// import ClaimWarranty from "@/components/ClaimWarranty";
import ClaimedWarranty from "@/components/ClaimedWarranty";
import { AdminForm } from "@/components/AdminForm";
function AdminFlow() {
  const { provider, account, getAccounts } = useContext(
    AuthContext
  ) as AuthContextType;

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className="w-full border p-4">
      <Tabs defaultValue="register" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="register" className="cursor-pointer">
            Register
          </TabsTrigger>
          <TabsTrigger value="claimed" className="cursor-pointer">
            Claimed Warranties
          </TabsTrigger>
        </TabsList>
        <div className="py-4">
          <TabsContent value="register">
            <AdminForm account={account} provider={provider} />
          </TabsContent>
          <TabsContent value="claimed">
            <ClaimedWarranty account={account} provider={provider} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default AdminFlow;
