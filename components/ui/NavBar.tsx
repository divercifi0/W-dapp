/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

"use client";

import {
  // CHAIN_NAMESPACES,
  // IAdapter,
  IProvider,
  // WEB3AUTH_NETWORK,
} from "@web3auth/base";
// import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
// import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
// import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import {
  useContext,
  //  useEffect, useState
} from "react";

// import RPC from "../../utils/ethersRPC";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/constants";
// import RPC from "./viemRPC";
// import RPC from "./web3RPC";

import { AuthContext, AuthContextType } from "@/context/Auth";

function NavBar() {
  const {
    login,
    logout,
    // getAccounts,
    // getUserInfo,
    provider,
    loggedIn,
    // account,
    // balance,
    // user,
  } = useContext(AuthContext) as AuthContextType;

  // useEffect(() => {
  //   if (loggedIn) {
  //     getUserInfo();
  //     getAccounts();
  //   }
  // }, [loggedIn]);

  const checkTransaction = async (providerlol: IProvider | null) => {
    if (!providerlol) {
      return;
    }
    let txHash;
    try {
      const ethersProvider = new ethers.BrowserProvider(providerlol);
      const signer = await ethersProvider.getSigner();
      const myContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      console.log("mycontract", myContract);
      console.log("ethersProvider", ethersProvider);
      // const gasLimit = 100000;
      const addManufacturer = await myContract.registerManufacturer(
        "one",
        "email"
      );

      const addManufacturerRx = await addManufacturer.wait();

      console.log("addManufacturer", addManufacturer);
      txHash = addManufacturer.transactionHash;
      // const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";

      // const amount = ethers.parseEther("0.001");
      // const fees = await ethersProvider.getFeeData();

      // // Submit transaction to the blockchain
      // const tx = await signer.sendTransaction({
      //   to: destination,
      //   value: amount,
      //   maxPriorityFeePerGas: fees.maxPriorityFeePerGas, // Max priority fee per gas
      //   maxFeePerGas: fees.maxFeePerGas, // Max fee per gas
      // });

      // // Wait for transaction to be mined
      // const receipt = await tx.wait();

      // return receipt;
    } catch (error) {
      console.log("error", error);
      return error as string;
    }
  };

  const loggedInView = (
    <>
      <div className="flex justify-end items-center w-full p-4 gap-4">
        <div>
          <button
            onClick={() => checkTransaction(provider)}
            className="border border-white rounded-md p-2"
          >
            Check Transaction
          </button>
        </div>
        <div>
          <button
            onClick={logout}
            className="border border-white rounded-md p-2"
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );

  const unloggedInView = (
    <div className="flex justify-end items-center w-full p-4">
      <button
        onClick={login}
        className="rounded-md bg-blue-500 text-white py-1 px-4"
      >
        Login
      </button>
    </div>
  );

  return <div className="flex">{loggedIn ? loggedInView : unloggedInView}</div>;
}

export default NavBar;
