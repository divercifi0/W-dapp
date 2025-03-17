"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/constants";
import { ethers } from "ethers";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import { toast } from "sonner";
const formSchema = z.object({
  serialNumber: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function ClaimForm({
  account,
  provider,
}: {
  account: string;
  provider: any;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serialNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const myContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      // const gasLimit = 100000;
      const claimWarranty = await myContract.claimWarranty(values.serialNumber);

      const claimWarrantyRx = await claimWarranty.wait();
      const txHash = claimWarrantyRx?.hash;

      console.log("addManufacturer", claimWarranty);
      console.log("addManufacturerRx", claimWarrantyRx);
      console.log("txHash", txHash);

      setDoc(doc(db, "claims", txHash), {
        address: account,
        serialNumber: values.serialNumber,
        hash: txHash,
        createdDate: new Date().toISOString(),
        createdAt: serverTimestamp(),
      })
        .then((_res) => {
          setLoading(false);
          toast("Warranty has been claimed", {
            description: "Hash: " + txHash,
          });
        })
        .catch(function (error) {
          setLoading(false);
          toast("Error claiming warranty");
          console.log("error", error);
        });
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }

  return (
    <div className="flex w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serial Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Serial Number" {...field} />
                </FormControl>
                <FormDescription>
                  Add the serial number of the product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {loading ? (
            <Button type="button" disabled>
              Submitting...
            </Button>
          ) : (
            <Button type="submit" className="cursor-pointer">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
