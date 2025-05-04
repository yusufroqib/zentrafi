"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertCircle, ArrowUpRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAccount } from "wagmi"

export default function TransactionStatus({ status, txHash, errorMessage, onReset }) {
  const account = useAccount();
  // Shortened tx hash for display
  const shortTxHash = txHash ? `${txHash.slice(0, 6)}...${txHash.slice(-4)}` : ""

  // Transaction explorer URL - would be different based on network
  const txExplorerUrl = txHash ? `${account.chain.blockExplorers}/tx/${txHash}` : "#"

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className={`rounded-xl p-4 ${
          status === "pending"
            ? "bg-blue-500/10 border border-blue-500/30"
            : status === "success"
              ? "bg-green-500/10 border border-green-500/30"
              : status === "error"
                ? "bg-red-500/10 border border-red-500/30"
                : ""
        }`}
      >
        <div className="flex items-center">
          <div className="mr-3">
            {status === "pending" && (
              <div className="h-8 w-8 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
            )}
            {status === "success" && <CheckCircle className="h-8 w-8 text-green-400" />}
            {status === "error" && <AlertCircle className="h-8 w-8 text-red-400" />}
          </div>

          <div className="flex-1">
            <div className="font-medium">
              {status === "pending" && "Transaction Processing"}
              {status === "success" && "Transaction Successful"}
              {status === "error" && "Transaction Failed"}
            </div>

            <div className="text-sm mt-1 text-[#97CBDC]">
              {status === "pending" && "Your transaction is being processed..."}
              {status === "success" && txHash && (
                <div className="flex items-center">
                  <span className="mr-2">Transaction: {shortTxHash}</span>
                  <a
                    href={txExplorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#018ABD] hover:text-white transition-colors inline-flex items-center"
                  >
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </a>
                </div>
              )}
              {status === "error" && <span className="text-red-400">{errorMessage || "An error occurred"}</span>}
            </div>
          </div>

          {(status === "success" || status === "error") && onReset && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-[#97CBDC] hover:text-white hover:bg-[#1D2538]/70"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              {status === "error" ? "Try Again" : "New Order"}
            </Button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
