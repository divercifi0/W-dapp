"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BlockchainLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BlockchainLoader({
  size = "md",
  className,
}: BlockchainLoaderProps) {
  const [activeBlock, setActiveBlock] = useState(0);

  // Sizes based on the size prop
  const blockSizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const containerSizes = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-5",
  };

  // Animation to cycle through blocks
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBlock((prev) => (prev + 1) % 6);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("flex items-center", containerSizes[size])}>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                blockSizes[size],
                "rounded-sm transition-all duration-300",
                index === activeBlock
                  ? "bg-primary scale-125"
                  : index === (activeBlock + 5) % 6 ||
                    index === (activeBlock + 1) % 6
                  ? "bg-primary/70"
                  : "bg-primary/30"
              )}
            />

            {/* Connection lines between blocks */}
            {index < 5 && (
              <div
                className={cn(
                  "h-[1px] bg-primary/50 transition-all duration-300",
                  size === "sm" ? "w-3" : size === "md" ? "w-4" : "w-5",
                  (index === activeBlock || index === (activeBlock + 5) % 6) &&
                    "bg-primary"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
