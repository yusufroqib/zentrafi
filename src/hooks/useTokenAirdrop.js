import { useState, useCallback, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { readContract, waitForTransaction } from "@wagmi/core";
import { parseUnits } from "viem";
import {
  AIRDROP_ABI,
  PAHROS_AIRDROP_CONTRACT_ADDRESS,
  CELO_AIRDROP_CONTRACT_ADDRESS,
} from "@/utils/ABI/Airdrop";
import { erc20Abi } from "@/utils/ABI";
import { toast } from "react-toastify";
import { config } from "@/providers/Wagmi";

export function useTokenAirdrop() {
  const { address } = useAccount();
  const chainId = useChainId();
  const [isApproving, setIsApproving] = useState(false);
  const [isDistributing, setIsDistributing] = useState(false);
  const [currentTxHash, setCurrentTxHash] = useState(null);
  const [approvalTxHash, setApprovalTxHash] = useState(null);
  const [distributionStatus, setDistributionStatus] = useState({
    status: null, // 'success', 'error', 'pending', null
    txHash: null,
    error: null,
    timestamp: null,
  });

  // Get the correct airdrop contract address based on the current chain
  const getAirdropContractAddress = useCallback(() => {
    // Pharos chain ID
    if (chainId === 50002) {
      return PAHROS_AIRDROP_CONTRACT_ADDRESS;
    }
    // Celo Alfajores
    if (chainId === 44787) {
      return CELO_AIRDROP_CONTRACT_ADDRESS;
    }
    return null;
  }, [chainId]);

  const airdropContractAddress = getAirdropContractAddress();

  // Contract write hooks
  const { writeContractAsync: approveTokenAsync } = useWriteContract();
  const { writeContractAsync: distributeTokenAsync } = useWriteContract();

  // Transaction receipt hooks
  const { data: txReceipt, isLoading: isWaitingForReceipt } =
    useWaitForTransactionReceipt({
      hash: currentTxHash,
    });

  // Service fee reader
  const { data: serviceFee } = useReadContract({
    address: airdropContractAddress,
    abi: AIRDROP_ABI,
    functionName: "getServiceFee",
    enabled: !!airdropContractAddress,
  });

  // Function to check token allowance - using readContract instead of hook
  const checkTokenAllowance = useCallback(
    async (tokenAddress, totalAmountInWei) => {
      try {
        if (!airdropContractAddress || !address) {
          throw new Error("Missing contract address or user address");
        }

        // Use readContract function (not hook) to fetch allowance
        const allowance = await readContract(config, {
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "allowance",
          args: [address, airdropContractAddress],
        });

        return {
          allowance,
          needsApproval: allowance < totalAmountInWei,
        };
      } catch (error) {
        console.error("Error checking allowance:", error);
        throw new Error("Failed to check token allowance");
      }
    },
    [airdropContractAddress, address]
  );

  // Effect to handle transaction receipt updates

 useEffect(() => {
   if (txReceipt && currentTxHash) {
     const status = txReceipt.status === "success" ? "success" : "error";
     setDistributionStatus({
       status,
       txHash: currentTxHash,
       error: status === "error" ? "Transaction failed" : null,
       timestamp: Date.now(),
     });

     // Only reset isDistributing if this was a distribution transaction
     if (isDistributing) {
       setIsDistributing(false);
       // Show toast notification
       if (status === "success") {
         toast.success("Tokens distributed successfully!");
       } else {
         toast.error(
           "Token distribution failed. Check transaction for details."
         );
       }
     }

     // Reset currentTxHash after processing
     setCurrentTxHash(null);
   }
 }, [txReceipt, currentTxHash, isDistributing]);

  // Function to approve token spending with direct transaction waiting
  const approveToken = useCallback(
    async (tokenAddress, totalAmountInWei) => {
      try {
        setIsApproving(true);

        const hash = await approveTokenAsync({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [airdropContractAddress, totalAmountInWei],
        });

        setApprovalTxHash(hash);
        toast.info("Approving token transfer...");

        // Directly wait for the transaction completion
        const receipt = await waitForTransaction(config, {
          hash,
        });

        if (receipt.status !== "success") {
          throw new Error("Approval transaction failed");
        }

        return true;
      } catch (error) {
        console.error("Error approving token:", error);
        toast.error(
          `Error approving token: ${error.message || "Unknown error"}`
        );
        return false;
      } finally {
        setIsApproving(false);
        setApprovalTxHash(null);
      }
    },
    [airdropContractAddress, approveTokenAsync]
  );

  // Execute token distribution
  const distributeToken = useCallback(
    async (tokenAddress, recipients, amountsInWei) => {
      try {
        if (!airdropContractAddress) {
          throw new Error("Unsupported chain");
        }

        if (!serviceFee) {
          throw new Error("Could not fetch service fee");
        }

        setIsDistributing(true);
        setDistributionStatus({
          status: "pending",
          txHash: null,
          error: null,
          timestamp: Date.now(),
        });

        // Call distribute token function
        const hash = await distributeTokenAsync({
          address: airdropContractAddress,
          abi: AIRDROP_ABI,
          functionName: "distributeToken",
          args: [tokenAddress, recipients, amountsInWei],
          value: serviceFee, // Pass the service fee as the transaction value
          gas: BigInt(3_000_000),

        });

        setCurrentTxHash(hash);
        setDistributionStatus((prev) => ({
          ...prev,
          txHash: hash,
        }));

        toast.info("Processing token distribution...");
        return hash;
      } catch (error) {
        console.error("Error distributing tokens:", error);
        setDistributionStatus({
          status: "error",
          txHash: null,
          error: error.message || "Unknown error",
          timestamp: Date.now(),
        });

        toast.error(
          `Error distributing tokens: ${error.message || "Unknown error"}`
        );
        return null;
      } finally {
        if (!currentTxHash) {
          setIsDistributing(false);
        }
      }
    },
    [airdropContractAddress, distributeTokenAsync, serviceFee, currentTxHash]
  );

  // Function to handle the entire airdrop process
  const performTokenAirdrop = useCallback(
    async (tokenAddress, tokenDecimals, recipients, amountPerRecipient) => {
      try {
        // Validate inputs
        if (!recipients || recipients.length === 0) {
          throw new Error("No recipients provided");
        }

        if (!amountPerRecipient || parseFloat(amountPerRecipient) <= 0) {
          throw new Error("Invalid amount per recipient");
        }

        // Reset distribution status
        setDistributionStatus({
          status: null,
          txHash: null,
          error: null,
          timestamp: null,
        });

        // Convert amounts to wei format
        const amountInWei = parseUnits(
          amountPerRecipient.toString(),
          tokenDecimals
        );
        const totalAmountInWei =
          recipients.length > 0
            ? amountInWei * BigInt(recipients.length)
            : BigInt(0);

        // If total amount is 0, no need to proceed
        if (totalAmountInWei === BigInt(0)) {
          throw new Error("Total amount to distribute is 0");
        }

        // Convert for the contract which expects an array
        const amountsInWei = recipients.map(() => amountInWei);

        // Step 1: Check if approval is needed
        const { needsApproval } = await checkTokenAllowance(
          tokenAddress,
          totalAmountInWei
        );

        // Step 2: Approve token transfer if needed
        if (needsApproval) {
          const isApproved = await approveToken(tokenAddress, totalAmountInWei);
          if (!isApproved) {
            throw new Error("Token approval failed or was rejected");
          }
          // No need to wait further - approveToken already waited for completion
        }

        // Step 3: Distribute tokens
        const hash = await distributeToken(
          tokenAddress,
          recipients,
          amountsInWei
        );
        if (!hash) {
          throw new Error("Token distribution failed or was rejected");
        }

        return {
          success: true,
          hash,
        };
      } catch (error) {
        console.error("Error in token airdrop process:", error);
        setDistributionStatus({
          status: "error",
          txHash: null,
          error: error.message || "Unknown error",
          timestamp: Date.now(),
        });

        toast.error(`Airdrop failed: ${error.message || "Unknown error"}`);
        return {
          success: false,
          error: error.message || "Unknown error",
        };
      }
    },
    [checkTokenAllowance, approveToken, distributeToken]
  );

  // Clear distribution status (useful for UI resets)
  const clearDistributionStatus = useCallback(() => {
    setDistributionStatus({
      status: null,
      txHash: null,
      error: null,
      timestamp: null,
    });
  }, []);

  return {
    performTokenAirdrop,
    isApproving,
    isDistributing,
    isProcessing: isApproving || isDistributing || isWaitingForReceipt,
    currentTxHash,
    txReceipt,
    distributionStatus,
    clearDistributionStatus,
  };
}
