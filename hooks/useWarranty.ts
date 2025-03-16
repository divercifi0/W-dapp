import {
  doc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/client";
import { useState } from "react";

export const useWarranty = () => {
  const [warranties, setWarranties] = useState<any[]>([]);
  const [allWarranties, setAllWarranties] = useState<any[]>([]);
  const [warrantyLoading, setWarrantyLoading] = useState(false);

  const getWarranties = async (address: string) => {
    console.log("address", address);

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
          //   where("claimed", "==", false),
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

  const claimWarranty = async (warranty: any, txHash: string) => {
    console.log("warranty", warranty);
    try {
      const docRef = doc(db, "warranties", warranty.hash);
      await updateDoc(docRef, {
        claimed: true,
      });

      //batch update claims
    } catch (error) {
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
  };
};
