import { useState, useEffect } from "react";
import { Check, Copy, ExternalLink, Rocket, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { toast } from "react-toastify";

export default function SuccessModal({
  contractAddress,
  tokenSymbol,
  tokenDecimals = 18,
  isOpen,
  onClose,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [addingToWallet, setAddingToWallet] = useState(false);
  const account = useAccount();
  const navigate = useNavigate();

  // Reset copied state after 2 seconds
  useEffect(() => {
    let timeout;
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [isCopied]);

  if (!isOpen) return null;

  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    setIsCopied(true);
  };

  const viewOnTestnet = () => {
    window.open(
      `${account?.chain?.blockExplorers?.default?.url}/address/${contractAddress}`,
      "_blank"
    );
  };

  const createFairlaunch = () => {
    navigate("/fair-launch");
    console.log("Creating fairlaunch for", contractAddress);
  };

  const addTokenToWallet = async () => {
    setAddingToWallet(true);
    try {
      // Check if ethereum is available (MetaMask or similar)
      if (account) {
        const wasAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: contractAddress,
              symbol: tokenSymbol || "TOKEN",
              decimals: tokenDecimals || 18,
              image: "",
            },
          },
        });

        console.log(wasAdded);

        if (wasAdded) {
          console.log("Token added to wallet");
          toast.success(`${tokenSymbol} successfully added to wallet`);
        } else {
          console.log("User rejected adding the token");
          toast.error("User rejected adding the token");
        }
      } else {
        console.log("Ethereum provider not detected");
        toast.error("Wallet not detected");
        // Alternative implementation for non-MetaMask wallets could go here
      }
    } catch (error) {
      console.error("Error adding token to wallet:", error);
    } finally {
      setAddingToWallet(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          ></motion.div>

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-gradient-to-b from-[#1D2538]/90 to-[#1D2538] backdrop-blur-sm border border-[#475B74]/50 rounded-3xl shadow-2xl w-full max-w-md mx-auto z-10 overflow-hidden"
          >
            <DotLottieReact src="/Verified.json" loop autoplay />

            {/* Header */}
            <div className="text-center pt-14 pb-4 px-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#018ABD] to-[#97CBDC] bg-clip-text text-transparent">
                Token Created Successfully
              </h2>
              <p className="text-[#97CBDC] mt-2 text-sm">
                Your token has been deployed to the blockchain
              </p>
            </div>

            {/* Contract Address */}
            <div className="px-6 py-4">
              <div className="bg-[#171C2E] border border-[#475B74]/30 rounded-lg p-4 overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#97CBDC] text-xs">
                    Contract Address:
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer h-7 px-2 text-xs text-[#018ABD] hover:text-[#97CBDC] hover:bg-[#018ABD]/10"
                    onClick={copyAddress}
                  >
                    {isCopied ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="w-3 h-3" /> Copy
                      </span>
                    )}
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="w-full font-mono text-xs sm:text-sm text-[#97CBDC] break-all">
                    {contractAddress}
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Success Message */}
            <div className="px-6 py-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#018ABD]/20 border border-[#018ABD]/20 rounded-lg p-4 text-center"
              >
                <p className="text-[#97CBDC] text-xs sm:text-sm">
                  Your token is now live on{" "}
                  {account?.chain?.name || "the blockchain"}!
                </p>
              </motion.div>
            </div>

            {/* Actions */}
            <div className="p-6 space-y-3">
              <div className="flex space-x-3">
                <Button
                  onClick={viewOnTestnet}
                  className={cn(
                    "flex-1 cursor-pointer bg-gradient-to-r from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl py-4 font-medium transition-all duration-300 shadow-lg shadow-[#004581]/20 transform hover:scale-105",
                    "text-sm sm:text-base flex items-center justify-center gap-2"
                  )}
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>View on Explorer</span>
                </Button>

                <Button
                  onClick={addTokenToWallet}
                  disabled={addingToWallet}
                  className={cn(
                    "flex-1 cursor-pointer bg-[#6A3FC2] hover:bg-[#5a33a5] text-white rounded-xl py-4 font-medium transition-all duration-300 shadow-lg shadow-[#6A3FC2]/20 transform hover:scale-105",
                    "text-sm sm:text-base flex items-center justify-center gap-2"
                  )}
                >
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{addingToWallet ? "Adding..." : "Add to Wallet"}</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  onClick={createFairlaunch}
                  className={cn(
                    "w-full cursor-pointer bg-[#171C2E] hover:bg-[#1D2538] text-[#97CBDC] border border-[#475B74]/50 rounded-xl py-2.5 sm:py-3 font-medium transition-all",
                    "text-sm sm:text-base flex items-center justify-center gap-2"
                  )}
                >
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Create Fairlaunch</span>
                </Button>

                <Button
                  onClick={onClose}
                  variant="ghost"
                  className="w-full cursor-pointer text-[#97CBDC] hover:text-white hover:bg-[#475B74]/20 rounded-xl py-2.5 sm:py-3 text-sm sm:text-base font-medium"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
