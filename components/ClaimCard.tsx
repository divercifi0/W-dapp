"use client";

import { ExternalLink, PawPrint, ScanQrCode } from "lucide-react";
import { MagicCard, MagicContainer } from "./mgui/Mcards";
import Link from "next/link";
import { ShimmerButton } from "./mgui/ShimmerButton";
import { useWarranty } from "@/hooks/useWarranty";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/constants";
import { useState } from "react";
import { BlockchainLoader } from "./ui/blockLoader";
const ClaimCard = ({
  warranty,
  provider,
  account,
}: {
  warranty: any;
  provider: any;
  account: string;
}) => {
  const { claimWarranty } = useWarranty();
  const [loading, setLoading] = useState(false);
  const openNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleClaim = async (SrNumber: string) => {
    setLoading(true);
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();
    const myContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    // const gasLimit = 100000;
    const claimWarrantyFunc = await myContract.claimWarranty(SrNumber);

    const claimWarrantyRx = await claimWarrantyFunc.wait();
    const txHash = claimWarrantyRx?.hash;
    if (txHash) {
      await claimWarranty(warranty, txHash, account);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <BlockchainLoader size="sm" />
      ) : (
        <MagicContainer key={warranty.hash}>
          <MagicCard className="bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#493D9E_0,#B2A5FF_50%,transparent_100%)]  shadow-2xl text-clip overflow-hidden">
            <div className="flex flex-col gap-4 relative">
              <PawPrint
                size={40}
                className="text-purple-200 absolute top-0 right-0"
              />
              <div className="w-max">
                <div
                  className="text-sm  border border-purple-300/50 rounded-full px-4 py-2 hover:bg-gray-700/40 transition-all duration-300 flex items-center justify-center"
                  onClick={() =>
                    openNewTab(
                      `https://hashscan.io/testnet/transaction/${warranty.hash}`
                    )
                  }
                >
                  <span className="text-gray-400 mr-1">Trnx Hash:</span>
                  <span className="text-gray-300 mr-2">
                    {warranty.hash.slice(0, 5)}.....
                    {warranty.hash.slice(-10)}
                  </span>
                  <ExternalLink size={14} className="text-purple-200 ml-2" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-300">Reliance Digital</div>
                <div className="flex gap-2 text-sm text-gray-300">
                  <div className="font-semibold">Serial No:</div>
                  <div className="">{warranty.name}</div>
                </div>

                {/* <div className="flex text-sm text-gray-300 w-max cursor-pointer"></div> */}
                <div className="flex gap-2 items-center justify-between">
                  {/* <div className="p-[1px] bg-green-500/40 rounded-full w-max"> */}
                  <ShimmerButton
                    className="shadow-2xl"
                    onClick={() => handleClaim(warranty.name)}
                  >
                    <span className="whitespace-pre-wrap text-center text-sm font-semibold leading-none tracking-tight text-green-200 dark:from-white dark:to-slate-900/10 ">
                      CLAIM NOW!
                    </span>
                  </ShimmerButton>
                  {/* </div> */}
                  <div>
                    <ScanQrCode size={80} className="text-green-400" />
                    {/* <div className="text-xs">ACTIVE</div> */}
                  </div>
                </div>
              </div>
              {/* <div className="w-full flex justify-end text-sm text-gray-300 cursor-pointer">
              View T&C
            </div> */}
            </div>
          </MagicCard>
        </MagicContainer>
      )}
    </div>
  );
};

export default ClaimCard;
