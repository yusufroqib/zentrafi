"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  XCircle,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function AirdropSuccessModal({
  isOpen,
  onClose,
  status = "success",
  txHash,
  tokenInfo,
  recipientCount,
  airdropAmount,
  error,
  chainExplorer,
}) {
  const [isCopied, setIsCopied] = useState(false);

  console.log(status);

  // Reset copied state after 2 seconds
  useEffect(() => {
    let timeout;
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [isCopied]);

  const copyTxHash = () => {
    if (txHash) {
      navigator.clipboard.writeText(txHash);
      setIsCopied(true);
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-b from-[#1D2538]/90 to-[#1D2538] rounded-3xl max-w-md w-full overflow-hidden border border-[#475B74]/50 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with close button */}
          <div className="flex justify-between items-center border-b border-[#475B74]/50 p-4">
            <h2 className="text-[#97CBDC] font-medium text-lg">
              {status === "success"
                ? "Airdrop Successful"
                : status === "error"
                ? "Airdrop Failed"
                : "Processing Airdrop"}
            </h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col items-center text-center">
            {/* Status Icon */}
            <div className="relative mb-6">
              <motion.div
                className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#004581]/20 to-[#018ABD]/20 blur-md"
                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
              {status === "success" ? (
                <div className="bg-gradient-to-r from-[#004581] to-[#018ABD] p-4 rounded-full">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              ) : status === "error" ? (
                <div className="bg-gradient-to-r from-red-600 to-red-400 p-4 rounded-full">
                  <XCircle className="h-12 w-12 text-white" />
                </div>
              ) : (
                <div className="p-4">
                  <div className="h-12 w-12 rounded-full border-4 border-[#97CBDC] border-t-transparent animate-spin" />
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#018ABD] to-[#97CBDC] bg-clip-text text-transparent mb-2">
              {status === "success"
                ? "Tokens Distributed Successfully!"
                : status === "error"
                ? "Distribution Failed"
                : "Processing Your Airdrop"}
            </h3>

            {/* Description */}
            <p className="text-[#97CBDC]/80 mb-6">
              {status === "success" && tokenInfo && recipientCount
                ? `${airdropAmount} ${
                    tokenInfo.symbol
                  } tokens have been sent to ${recipientCount} recipient${
                    recipientCount !== 1 ? "s" : ""
                  }.`
                : status === "error"
                ? error ||
                  "There was an error processing your airdrop transaction."
                : "Please wait while we process your airdrop transaction."}
            </p>

            {/* Transaction Hash */}
            {txHash && (
              <div className="w-full mb-6">
                <div className="text-left text-xs text-[#97CBDC] mb-1">
                  Transaction Hash:
                </div>
                <div className="bg-[#0a0a20]/80 border border-[#475B74]/50 rounded-xl p-3 flex items-center justify-between">
                  <p className="text-[#97CBDC] text-sm font-mono truncate">
                    {txHash}
                  </p>
                  <button
                    onClick={copyTxHash}
                    className="ml-2 cursor-pointer text-[#97CBDC] hover:text-white transition-colors"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {txHash && (
                <a
                  href={`${chainExplorer}/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex cursor-pointer items-center justify-center bg-gradient-to-r from-[#004581] to-[#018ABD]",
                    "hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl px-4 py-3",
                    "transition-all duration-300 font-medium shadow-lg shadow-[#004581]/20"
                  )}
                >
                  View Transaction
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              )}

              <button
                onClick={onClose}
                className={cn(
                  "flex cursor-pointer items-center justify-center bg-[#0a0a20]/80 border border-[#475B74]/50",
                  "hover:bg-[#0a0a20] text-[#97CBDC] hover:text-white rounded-xl px-4 py-3",
                  "transition-colors font-medium"
                )}
              >
                {status === "success"
                  ? "Close"
                  : status === "error"
                  ? "Try Again"
                  : "Continue"}
              </button>
            </div>
          </div>

          {/* Footer with token info */}
          {status === "success" && tokenInfo && (
            <div className="border-t border-[#475B74]/50 p-4 bg-[#0a0a20]/50">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[#97CBDC]/70">Token:</div>
                  <div className="text-white font-medium truncate">
                    {tokenInfo.name}
                  </div>
                </div>
                <div>
                  <div className="text-[#97CBDC]/70">Symbol:</div>
                  <div className="text-white font-medium">
                    {tokenInfo.symbol}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
