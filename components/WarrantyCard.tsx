"use client";

import { ExternalLink, PawPrint, ScanQrCode } from "lucide-react";
import { MagicCard, MagicContainer } from "./mgui/Mcards";
import Link from "next/link";

const WarrantyCard = ({ warranty }: { warranty: any }) => {
  return (
    <div>
      <MagicContainer key={warranty.hash}>
        <MagicCard className="bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#493D9E_0,#B2A5FF_50%,transparent_100%)]  shadow-2xl text-clip overflow-hidden">
          <div className="flex flex-col gap-4 relative">
            <PawPrint
              size={40}
              className="text-purple-200 absolute top-0 right-0"
            />
            <div className="w-max">
              <Link
                href={`https://hashscan.io/testnet/transaction/${warranty.hash}`}
                className="text-sm  border border-purple-300/50 rounded-full px-4 py-2 hover:bg-gray-700/40 transition-all duration-300 flex items-center justify-center"
              >
                <span className="text-gray-400 mr-1">Trnx Hash:</span>
                <span className="text-gray-300 mr-2">
                  {warranty.hash.slice(0, 5)}.....
                  {warranty.hash.slice(-10)}
                </span>
                <ExternalLink size={14} className="text-purple-200 ml-2" />
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-300">Reliance Digital</div>
              <div className="flex gap-2 text-sm text-gray-300">
                <div className="font-semibold">Serial No:</div>
                <div className="">{warranty.name}</div>
              </div>
              <div className="flex gap-2 text-sm text-gray-300">
                <ScanQrCode size={16} className="text-green-400" />
                <div className="">ACTIVE</div>
              </div>
              <div className="text-sm  flex flex-col gap-2">
                <div className="font-semibold  text-gray-300">
                  Terms & Conditions
                </div>
                <div className="text-gray-400 px-4">
                  {warranty.coverageDetails
                    .split("\n")
                    .map((line: string, index: number) => (
                      <div key={index}>{line}</div>
                    ))}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end text-sm text-gray-300 cursor-pointer">
              View T&C
            </div>
          </div>
        </MagicCard>
      </MagicContainer>
    </div>
  );
};

export default WarrantyCard;
