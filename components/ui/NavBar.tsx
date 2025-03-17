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
  useEffect,
  useState,
  //  useEffect, useState
} from "react";
import { useRouter } from "next/navigation";
import { BlockchainLoader } from "@/components/ui/blockLoader";

// import RPC from "../../utils/ethersRPC";
// import { ethers } from "ethers";
// import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/constants";
// import RPC from "./viemRPC";
// import RPC from "./web3RPC";

import { AuthContext, AuthContextType } from "@/context/Auth";
import { ShimmerButton } from "../mgui/ShimmerButton";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ClipboardIcon, Codepen, Codesandbox, QrCode } from "lucide-react";

function NavBar() {
  const {
    login,
    logout,
    // getAccounts,
    // getUserInfo,
    provider,
    loggedIn,
    account,
    balance,
    // balance,
    // user,
  } = useContext(AuthContext) as AuthContextType;
  const router = useRouter();

  // const { userInfo } = useWeb3Auth();

  const [addressval, setAddressval] = useState("");
  const [balanceinfo, setBalance] = useState(account);

  useEffect(() => {
    if (account) {
      setBalance(balance);
      setAddressval(account);
    }
  }, [account]);

  // useEffect(() => {
  //   if (userInfo) {
  //     // setAddressval(userInfo.address);
  //     console.log("userInfo", userInfo);
  //   }
  // }, [userInfo]);

  const loggedInView = (
    <div className="flex justify-between border-b w-full mb-5">
      <div
        className="flex w-max p-4 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Codepen size={40} className="text-purple-200" />
        <QrCode size={40} className="text-purple-200" />
        <Codesandbox size={40} className="text-purple-200" />
      </div>

      <div className="flex justify-end items-center w-full p-4 gap-4 w-max">
        {addressval === "" ? (
          <BlockchainLoader size="sm" />
        ) : (
          <>
            <div className="text-sm border border-purple-200/50 rounded-md px-2 py-1">
              Balance:
              <span className="font-bold text-green-200 ml-2">
                {balanceinfo}
              </span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(addressval)}
                  >
                    {addressval} <ClipboardIcon className="ml-2 h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to copy</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* <div>{account}</div> */}
            <ShimmerButton
              className="shadow-2xl"
              onClick={() => router.push("/my-warranty")}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-semibold leading-none tracking-tight text-purple-200 dark:from-white dark:to-slate-900/10 ">
                User View
              </span>
            </ShimmerButton>
            <ShimmerButton
              className="shadow-2xl"
              onClick={() => router.push("/enterprise")}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-semibold leading-none tracking-tight text-purple-200 dark:from-white dark:to-slate-900/10 ">
                Enterprise View
              </span>
            </ShimmerButton>
            <ShimmerButton className="shadow-2xl" onClick={logout}>
              <span className="whitespace-pre-wrap text-center text-sm font-semibold leading-none tracking-tight text-red-200 dark:from-white dark:to-slate-900/10 ">
                Sign Out
              </span>
            </ShimmerButton>
            {/* <div>
          <button className="border border-white rounded-md p-2">
            Log Out
          </button>
        </div> */}
          </>
        )}
      </div>
    </div>
  );

  const unloggedInView = (
    <div className="flex justify-end items-center w-full p-4">
      {/* <button
        onClick={login}
        className="rounded-md bg-blue-500 text-white py-1 px-4"
      >
        Login
      </button> */}
      <ShimmerButton className="shadow-2xl" onClick={login}>
        <span className="whitespace-pre-wrap text-center text-sm font-semibold leading-none tracking-tight text-green-200 dark:from-white dark:to-slate-900/10 ">
          Sign In
        </span>
      </ShimmerButton>
    </div>
  );

  return <div className="flex">{loggedIn ? loggedInView : unloggedInView}</div>;
}

export default NavBar;
