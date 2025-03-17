import {
  doc,
  getDocs,
  // setDoc,
  // updateDoc,
  collection,
  // deleteDoc,
  query,
  where,
  orderBy,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/client";
import { useState } from "react";
import { toast } from "sonner";

export const useWarranty = () => {
  const [warranties, setWarranties] = useState<any[]>([]);
  const [allWarranties, setAllWarranties] = useState<any[]>([]);
  const [warrantyLoading, setWarrantyLoading] = useState(false);
  const [claimedWarranties, setClaimedWarranties] = useState<any[]>([]);

  const getWarranties = async (address: string) => {
    // console.log("address", address);

    setWarrantyLoading(true);
    try {
      getDocs(
        query(
          collection(db, "warranties"),
          where("address", "==", address),
          orderBy("createdAt", "desc")
        )
      ).then((res) => {
        setWarrantyLoading(false);
        if (res?.docs) {
          setWarranties(
            res?.docs?.map((doc: any) => {
              return doc.data();
            })
          );
        }
      });
    } catch (error) {
      setWarrantyLoading(false);
      console.log("error", error);
    }
  };

  const getAllWarranties = async () => {
    setWarrantyLoading(true);
    try {
      getDocs(
        query(
          collection(db, "warranties"),
          where("claimed", "==", false),
          orderBy("createdAt", "desc")
        )
      ).then((res) => {
        setWarrantyLoading(false);
        if (res?.docs) {
          setAllWarranties(
            res?.docs?.map((doc: any) => {
              return doc.data();
            })
          );
        }
      });
    } catch (error) {
      setWarrantyLoading(false);
      console.log("error", error);
    }
  };

  const claimWarranty = async (
    warranty: any,
    txHash: string,
    account: string
  ) => {
    // console.log("warranty", warranty);
    try {
      const batch = writeBatch(db);

      batch.update(doc(db, "warranties", warranty.hash), {
        claimed: true,
      });

      batch.set(doc(db, "claims", txHash), {
        address: account,
        serialNumber: warranty.name,
        hash: txHash,
        createdDate: new Date().toISOString(),
        createdAt: serverTimestamp(),
      });

      await batch
        .commit()
        .then(() => {
          toast("Warranty has been claimed", {
            description: "Hash: " + txHash,
          });
        })
        .catch((err) => {
          toast("Error claiming warranty");
          console.log("err", err);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getClaimedWarranties = async (address: string) => {
    setWarrantyLoading(true);
    try {
      getDocs(
        query(
          collection(db, "claims"),
          where("address", "==", address),
          orderBy("createdAt", "desc")
        )
      ).then((res) => {
        setWarrantyLoading(false);
        if (res?.docs) {
          setClaimedWarranties(
            res?.docs?.map((doc: any) => {
              return doc.data();
            })
          );
        }
      });
    } catch (error) {
      setWarrantyLoading(false);
      console.log("error", error);
    }
  };

  return {
    warranties,
    warrantyLoading,
    getWarranties,
    getAllWarranties,
    allWarranties,
    claimWarranty,
    getClaimedWarranties,
    claimedWarranties,
  };
};
