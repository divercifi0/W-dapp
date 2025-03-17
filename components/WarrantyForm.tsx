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
import { BlockchainLoader } from "./ui/blockLoader";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  coverageDetails: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  durationInMonths: z.string().min(1, {
    message: "Duration must be at least 1 month.",
  }),
});

export function WarrantyForm({
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
      name: "",
      coverageDetails: "",
      durationInMonths: "",
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
      const addManufacturer = await myContract.createWarranty(
        values.name,
        values.coverageDetails,
        values.durationInMonths
      );

      const addManufacturerRx = await addManufacturer.wait();
      const txHash = addManufacturer?.hash;

      console.log("addManufacturer", addManufacturer);
      console.log("addManufacturerRx", addManufacturerRx);
      console.log("txHash", txHash);

      setDoc(doc(db, "warranties", txHash), {
        address: account,
        name: values.name,
        coverageDetails: values.coverageDetails,
        durationInMonths: values.durationInMonths,
        hash: txHash,
        claimed: false,
        createdDate: new Date().toISOString(),
        createdAt: serverTimestamp(),
      })
        .then((_res) => {
          toast("Warranty has been created", {
            description: "Hash: " + txHash,
          });
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          toast("Error creating warranty");
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
            name="name"
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
          <FormField
            control={form.control}
            name="durationInMonths"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (in months)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Duration in Months"
                    min="0"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Add the duration of the warranty in months.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverageDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coverage Details</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter Terms & Conditions" {...field} />
                </FormControl>
                <FormDescription>
                  Add the T&C/coverage details of the product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {loading ? (
            <BlockchainLoader size="sm" />
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
