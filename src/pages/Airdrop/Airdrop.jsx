"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Copy,
  CheckCircle,
  Upload,
  ArrowRight,
  Info,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { cn } from "@/lib/utils";
import AirdropHeader from "./Header";
import { useAccount } from "wagmi";
import ConnectWallet from "../../components/ui/ConnectButton";
import { erc20Abi } from "@/utils/ABI";
import { toast } from "react-toastify";
import { useTokenAirdrop } from "@/hooks/useTokenAirdrop";
import AirdropSuccessModal from "./Modal";
import { useTokenInfo } from "@/hooks/useTokenInfo";

// Function to validate and count addresses
function parseAddressList(addressList) {
  if (!addressList.trim()) {
    return [];
  }

  return addressList
    .split("\n")
    .map((addr) => addr.trim())
    .filter((addr) => addr.length >= 42 && addr.startsWith("0x"));
}

export default function AirdropPage() {
  const { isConnected, address } = useAccount();
  const {
    performTokenAirdrop,
    isApproving,
    isDistributing,
    isProcessing,
    currentTxHash,
    txReceipt,
    distributionStatus,
    clearDistributionStatus,
  } = useTokenAirdrop();

  const account = useAccount();
  const chainExplorer =
    account?.chain?.blockExplorers?.default?.url;
  const [tokenAddress, setTokenAddress] = useState("");
  const [airdropAmount, setAirdropAmount] = useState("");
  const [addressList, setAddressList] = useState("");
  const [addressCount, setAddressCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [hoveredField, setHoveredField] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce token address changes
  const [debouncedTokenAddress, setDebouncedTokenAddress] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTokenAddress(tokenAddress);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [tokenAddress]);

  // Get token info using our custom hook
  const { tokenInfo, isLoadingToken, tokenError, fetchTokenInfo } =
    useTokenInfo(debouncedTokenAddress, address);

  // Fetch token info when debounced address changes
  useEffect(() => {
    if (debouncedTokenAddress && debouncedTokenAddress.length === 42) {
      fetchTokenInfo();
    }
  }, [debouncedTokenAddress, fetchTokenInfo]);

  // Count addresses with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const validAddresses = parseAddressList(addressList);
      setAddressCount(validAddresses.length);
    }, 300);

    return () => clearTimeout(timer);
  }, [addressList]);

  // Monitor distribution status changes
  useEffect(() => {
    if (distributionStatus.status === "pending" && !isModalOpen) {
      setIsModalOpen(true);
    } else if (
      distributionStatus.status === "success" ||
      distributionStatus.status === "error"
    ) {
      setIsModalOpen(true);
    }
  }, [distributionStatus, isModalOpen]);

  const handleCopyExample = () => {
    const exampleAddresses =
      "0x690C65EB2e2dd321ACe41a9865Aea3fAa98be2A5\n0x429cB52eC6a7Fc28bC88431909Ae469977F6daCF\n0x0dD157808C204C97dE18b941e76bcAa20Cd0E806";

    navigator.clipboard.writeText(exampleAddresses);
    setAddressList(exampleAddresses);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        setAddressList(content);
      }
    };
    reader.readAsText(file);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (distributionStatus.status === "success") {
      // Reset form if distribution was successful
      setTokenAddress("");
      setAirdropAmount("");
      setAddressList("");
    }
    clearDistributionStatus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!tokenAddress || !airdropAmount || !addressList.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const recipients = parseAddressList(addressList);

    if (recipients.length === 0) {
      toast.error("Please enter at least one valid recipient address");
      return;
    }

    setIsSubmitting(true);
    try {
      // Use our token airdrop function
      const result = await performTokenAirdrop(
        tokenAddress,
        tokenInfo?.decimal || 18, // Use token decimals from token info
        recipients,
        airdropAmount
      );

      if (!result.success) {
        toast.error(`Airdrop failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Error sending airdrop:", error);
      toast.error(
        `Failed to send airdrop: ${error.message || "Unknown error"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a20] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <AirdropHeader />

        <form onSubmit={handleSubmit} className="mt-8">
          <motion.div
            className="bg-gradient-to-b from-[#1D2538]/90 to-[#1D2538] backdrop-blur-sm border border-[#475B74]/50 rounded-3xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-4 md:p-8">
              {/* Token Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#97CBDC]">
                    Token Address <span className="text-red-500">*</span>
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-[#97CBDC]" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                        <p className="text-xs max-w-xs">
                          Enter the contract address of the token you want to
                          airdrop
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <motion.div
                  className="relative"
                  onMouseEnter={() => setHoveredField("tokenAddress")}
                  onMouseLeave={() => setHoveredField(null)}
                >
                  <AnimatePresence>
                    {hoveredField === "tokenAddress" && (
                      <motion.span
                        className="absolute inset-0 bg-[#004581]/10 rounded-xl z-0"
                        layoutId="hoverField"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </AnimatePresence>
                  <Input
                    type="text"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                    placeholder="0x1728d6Ad90e84E24ee68fe68fD01014D9B8d7B3"
                    className="bg-[#0a0a20]/80 border-[#475B74] rounded-xl placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200 relative z-10"
                  />
                </motion.div>
              </motion.div>

              {/* Token Info */}
              <AnimatePresence>
                {isLoadingToken ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-[#0a0a20]/80 border border-[#475B74]/50 rounded-xl p-4 mb-6"
                  >
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-[#97CBDC] animate-spin mr-2"></div>
                      <span className="text-[#97CBDC]">
                        Loading token information...
                      </span>
                    </div>
                  </motion.div>
                ) : tokenError ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-[#0a0a20]/80 border border-red-500/30 rounded-xl p-4 mb-6"
                  >
                    <div className="flex items-center text-red-400">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>{tokenError}</span>
                    </div>
                  </motion.div>
                ) : tokenInfo ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-[#0a0a20]/80 border border-[#475B74]/50 rounded-xl p-4 mb-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[#97CBDC] text-sm">Name:</div>
                        <div className="text-white font-medium">
                          {tokenInfo.name || "Unknown"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#97CBDC] text-sm">Symbol:</div>
                        <div className="text-white font-medium">
                          {tokenInfo.symbol || "Unknown"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#97CBDC] text-sm">Decimal:</div>
                        <div className="text-white font-medium">
                          {tokenInfo.decimal?.toString() || "0"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#97CBDC] text-sm">Balance:</div>
                        <div className="text-white font-medium">
                          {tokenInfo.balance} {tokenInfo.symbol}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Airdrop Amount */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#97CBDC]">
                    Airdrop Amount <span className="text-red-500">*</span>
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-[#97CBDC]" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                        <p className="text-xs max-w-xs">
                          Amount of tokens to send to each recipient address
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <motion.div
                  className="relative"
                  onMouseEnter={() => setHoveredField("airdropAmount")}
                  onMouseLeave={() => setHoveredField(null)}
                >
                  <AnimatePresence>
                    {hoveredField === "airdropAmount" && (
                      <motion.span
                        className="absolute inset-0 bg-[#004581]/10 rounded-xl z-0"
                        layoutId="hoverField"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </AnimatePresence>
                  <Input
                    type="text"
                    value={airdropAmount}
                    onChange={(e) => setAirdropAmount(e.target.value)}
                    placeholder="2000"
                    className="bg-[#0a0a20]/80 border-[#475B74] rounded-xl placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200 relative z-10"
                  />
                </motion.div>
              </motion.div>

              {/* Address List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#97CBDC]">
                    Address List <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-2">
                    <motion.button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#97CBDC] cursor-pointer hover:text-white hover:bg-[#1D2538]/70 text-xs rounded-lg px-2 py-1 flex items-center transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Upload className="h-3 w-3 mr-1" />
                      Import
                    </motion.button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".txt,.csv"
                      className="hidden"
                    />
                    <motion.button
                      type="button"
                      onClick={handleCopyExample}
                      className="text-[#97CBDC] cursor-pointer hover:text-white hover:bg-[#1D2538]/70 text-xs rounded-lg px-2 py-1 flex items-center transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Example
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
                <motion.div
                  className="relative"
                  onMouseEnter={() => setHoveredField("addressList")}
                  onMouseLeave={() => setHoveredField(null)}
                >
                  <AnimatePresence>
                    {hoveredField === "addressList" && (
                      <motion.span
                        className="absolute inset-0 bg-[#004581]/10 rounded-xl z-0"
                        layoutId="hoverField"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </AnimatePresence>
                  <Textarea
                    value={addressList}
                    onChange={(e) => setAddressList(e.target.value)}
                    placeholder="Enter one address per line"
                    className="bg-[#0a0a20]/80 border-[#475B74] rounded-xl placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200 min-h-[120px] relative z-10"
                  />
                </motion.div>
                {addressCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-[#97CBDC] flex items-center"
                  >
                    <CheckCircle className="h-3 w-3 mr-1 text-[#018ABD]" />
                    {addressCount} valid address{addressCount !== 1 ? "es" : ""}{" "}
                    found
                  </motion.div>
                )}
              </motion.div>

              {/* Total Cost and Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-[#475B74]/50"
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <span className="text-[#97CBDC]">Total cost:</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-[#018ABD] to-[#97CBDC] bg-clip-text text-transparent ml-2">
                    0.002 {account.chain?.nativeCurrency?.symbol || "PTT"}
                  </span>
                </div>
                <motion.button
                  type="submit"
                  disabled={!isConnected || isSubmitting || isProcessing}
                  className={cn(
                    "bg-gradient-to-r cursor-pointer from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl px-8 py-4 h-auto font-medium transition-all duration-300 w-full md:w-auto shadow-lg shadow-[#004581]/20",
                    "disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  )}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isSubmitting || isProcessing ? (
                    <>
                      <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                      {isApproving
                        ? "Approving..."
                        : isDistributing
                        ? "Distributing..."
                        : "Processing..."}
                    </>
                  ) : !isConnected ? (
                    <ConnectWallet />
                  ) : (
                    <>
                      Send Airdrop
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </form>

        {/* Success Modal */}
        <AirdropSuccessModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          status={distributionStatus.status}
          txHash={distributionStatus.txHash}
          tokenInfo={tokenInfo}
          recipientCount={addressCount}
          airdropAmount={airdropAmount}
          error={distributionStatus.error}
          chainExplorer={chainExplorer}
        />
      </div>
    </div>
  );
}
