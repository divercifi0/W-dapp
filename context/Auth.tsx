"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import {
  CHAIN_NAMESPACES,
  IAdapter,
  IProvider,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";

import RPC from "@/utils/ethersRPC";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { ethers } from "ethers";
// import { ethers } from "ethers";
// import { CONTRACT_ABI } from "@/utils/constants";
// import RPC from "./viemRPC";
// import RPC from "./web3RPC";
// import { useRouter, usePathname } from "next/navigation";

export type AuthContextType = {
  login: () => void;
  logout: () => void;
  getAccounts: () => void;
  getUserInfo: () => void;
  provider: any;
  loggedIn: boolean;
  account: any;
  balance: any;
  user: any;
};

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x128",
  rpcTarget: "https://testnet.hashio.io/api",
  displayName: "Hedera Testnet",
  blockExplorerUrl: "https://hashscan.io/testnet/",
  ticker: "HBAR",
  tickerName: "HBAR",
  logo: "https://cryptologos.cc/logos/hedera-hbar-logo.png?v=033",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
};
const web3auth = new Web3Auth(web3AuthOptions);

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [account, setAccount] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const adapters = await getDefaultExternalAdapters({
          options: web3AuthOptions,
        });
        adapters.forEach((adapter: IAdapter<unknown>) => {
          web3auth.configureAdapter(adapter);
        });
        await web3auth.initModal();
        setProvider(web3auth.provider);
        console.log("web3auth", web3auth);
        console.log("web3auth.provider", web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
          const ethersProvider = new ethers.BrowserProvider(
            web3auth.provider as IProvider
          );
          const signer = await ethersProvider.getSigner();
          const address = await signer.getAddress();
          const balance = ethers.formatEther(
            await ethersProvider.getBalance(address) // Balance is in wei
          );
          setAccount(address);
          setBalance(balance);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  // Check the RPC file for the implementation
  const getAccounts = async () => {
    console.log("enterrr");
    console.log("enterrr", provider);
    console.log("w3", web3auth.provider);

    // if (provider) {
    //   const ethersProvider = new ethers.BrowserProvider(provider);
    //   const signer = await ethersProvider.getSigner();
    //   const address = signer.getAddress();
    //   const balance = ethers.formatEther(
    //     await ethersProvider.getBalance(address) // Balance is in wei
    //   );
    //   setAccount(address);
    //   setBalance(balance);
    // } else {
    //   setAccount(null);
    //   setBalance(null);
    // }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        getAccounts,
        getUserInfo,
        provider,
        loggedIn,
        account,
        balance,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
