import { useCallback, useEffect, useState } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { BONDING_POOL_ABI } from "@/utils/ABI/BondingPool";
import { formatUnits, parseUnits } from "viem";
import { erc20Abi } from "@/utils/ABI";
import { toast } from "react-toastify";
import axios from "axios";

export function useBondingContract(contractAddress) {
  const [contractInfo, setContractInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { address: userAddress } = useAccount();

  // For write operations
  const {
    writeContractAsync,
    isPending: isWritePending,
    isError: isWriteError,
    error: writeError,
  } = useWriteContract();

  // Validate contract address
  const isValidAddress =
    contractAddress &&
    contractAddress.length === 42 &&
    contractAddress.startsWith("0x");

  // Read contract functions
  const version = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "VERSION",
    enabled: shouldFetch && isValidAddress,
  });

  const poolDetails = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "poolDetails",
    enabled: shouldFetch && isValidAddress,
  });

  const poolState = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "poolState",
    enabled: shouldFetch && isValidAddress,
  });

  const poolType = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "poolType",
    enabled: shouldFetch && isValidAddress,
  });

  const tokenAddress = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "token",
    enabled: shouldFetch && isValidAddress,
  });

  const circulatingSupply = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "circulatingSupply",
    enabled: shouldFetch && isValidAddress,
  });

  const tokenPrice = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "getTokenPrice",
    enabled: shouldFetch && isValidAddress,
  });

  const decimals = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "getDecimal",
    enabled: shouldFetch && isValidAddress,
  });

  const poolInfo = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "getPoolInfo",
    enabled: shouldFetch && isValidAddress,
  });

  const holdersInfo = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "getHolders",
    enabled: shouldFetch && isValidAddress,
  });

  const kycStatus = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "kycStatus",
    enabled: shouldFetch && isValidAddress,
  });

  const auditStatus = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "auditStatus",
    enabled: shouldFetch && isValidAddress,
  });

  // Additional read for ethAmount
  const ethAmount = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "ethAmount",
    enabled: shouldFetch && isValidAddress,
  });
  const tokenAAmount = useReadContract({
    address: isValidAddress ? contractAddress : undefined,
    abi: BONDING_POOL_ABI,
    functionName: "tokenAAmount",
    enabled: shouldFetch && isValidAddress,
  });

  // Function to check token allowance
  const checkAllowance = useCallback(
    async (tokenAddr, amount) => {
      if (!userAddress || !isValidAddress) return false;

      try {
        const result = await fetch("/api/token/allowance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokenAddress: tokenAddr,
            ownerAddress: userAddress,
            spenderAddress: contractAddress,
          }),
        });

        const data = await result.json();
        return BigInt(data.allowance) >= BigInt(amount);
      } catch (error) {
        console.error("Error checking allowance:", error);
        return false;
      }
    },
    [userAddress, contractAddress, isValidAddress]
  );

  // Function to approve token spending
  const approveToken = useCallback(
    async (tokenAddr, amount) => {
      if (!userAddress || !isValidAddress) {
        toast.error("Invalid address or not connected");
        return false;
      }

      try {
        toast.loading("Approving token...");
        const tx = await writeContractAsync({
          address: tokenAddr,
          abi: erc20Abi,
          functionName: "approve",
          args: [contractAddress, amount],
        });
        toast.dismiss();
        toast.success("Token approved successfully");
        return tx;
      } catch (error) {
        toast.dismiss();
        toast.error(`Approval failed: ${error.message || "Unknown error"}`);
        console.error("Error approving token:", error);
        return false;
      }
    },
    [userAddress, contractAddress, isValidAddress, writeContractAsync]
  );

  // Fetch current ETH price for market cap calculation
  const fetchEthPrice = useCallback(async () => {
    try {
      const priceResponse = await axios.get(
        `${import.meta.env.VITE_SERVER_URL || ""}/api/get-price`
      );
      const { pairPrice, pairDecimal } = priceResponse.data;
      return { price: pairPrice, decimal: pairDecimal };
    } catch (error) {
      console.error("Error fetching ETH price:", error);
      return { price: 0, decimal: 18 };
    }
  }, []);

  // Function to trigger data fetching
  const fetchContractInfo = useCallback(() => {
    if (!isValidAddress) {
      setContractInfo(null);
      setError("Invalid contract address");
      setIsLoading(false);
      toast.error("Invalid contract address");
      return;
    }

    setShouldFetch(true);
    setIsLoading(true);
    setError(null);
    // toast.loading("Fetching contract info...");
  }, [isValidAddress]);

  // Enhanced swap function
  const swap = useCallback(
    async (amount, swapType, bytesProof, valueToSend = 0) => {
      if (!isValidAddress) {
        toast.error("Invalid contract address");
        throw new Error("Invalid contract address");
      }

      if (!userAddress) {
        toast.error("Please connect your wallet");
        throw new Error("Wallet not connected");
      }

      try {
        // For selling tokens (swapType = 2), check and request approval if needed
        if (swapType === 2) {
          const token = tokenAddress.data;

          if (!token) {
            toast.error("Token address not available");
            throw new Error("Token address not available");
          }

          // Check if allowance is sufficient
          const hasAllowance = await checkAllowance(token, amount);

          if (!hasAllowance) {
            toast.info("Token approval required");
            const approved = await approveToken(token, amount);
            if (!approved) {
              throw new Error("Token approval failed");
            }
          }
        }

        toast.loading(
          swapType === 1 ? "Buying tokens..." : "Selling tokens..."
        );

        const tx = await writeContractAsync({
          address: contractAddress,
          abi: BONDING_POOL_ABI,
          functionName: "swap",
          args: [amount, swapType, bytesProof],
          value:
            valueToSend > 0
              ? parseUnits(valueToSend.toString(), 18)
              : undefined,
        });

        toast.dismiss();
        toast.success(
          swapType === 1 ? "Purchase successful!" : "Sale successful!"
        );
        return tx;
      } catch (error) {
        toast.dismiss();
        const errorMessage = error.message || "Unknown error";
        const userFriendlyError = errorMessage.includes("user rejected")
          ? "Transaction rejected by user"
          : errorMessage.includes("insufficient funds")
          ? "Insufficient funds for transaction"
          : `Error: ${errorMessage.slice(0, 100)}${
              errorMessage.length > 100 ? "..." : ""
            }`;

        toast.error(userFriendlyError);
        console.error("Error executing swap:", error);
        throw error;
      }
    },
    [
      contractAddress,
      isValidAddress,
      writeContractAsync,
      userAddress,
      tokenAddress.data,
      checkAllowance,
      approveToken,
    ]
  );

  // Enhanced emergencyWithdraw
  const emergencyWithdraw = useCallback(
    async (toAddress, amount) => {
      if (!isValidAddress) {
        toast.error("Invalid contract address");
        throw new Error("Invalid contract address");
      }

      try {
        toast.loading("Processing emergency withdrawal...");
        const tx = await writeContractAsync({
          address: contractAddress,
          abi: BONDING_POOL_ABI,
          functionName: "emergencyWithdraw",
          args: [toAddress, amount],
        });
        toast.dismiss();
        toast.success("Emergency withdrawal successful");
        return tx;
      } catch (error) {
        toast.dismiss();
        toast.error(`Withdrawal failed: ${error.message || "Unknown error"}`);
        console.error("Error executing emergency withdraw:", error);
        throw error;
      }
    },
    [contractAddress, isValidAddress, writeContractAsync]
  );

  // Enhanced withdrawLeftovers
  const withdrawLeftovers = useCallback(async () => {
    if (!isValidAddress) {
      toast.error("Invalid contract address");
      throw new Error("Invalid contract address");
    }

    try {
      toast.loading("Withdrawing leftovers...");
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: BONDING_POOL_ABI,
        functionName: "withdrawLeftovers",
      });
      toast.dismiss();
      toast.success("Leftovers withdrawn successfully");
      return tx;
    } catch (error) {
      toast.dismiss();
      toast.error(`Withdrawal failed: ${error.message || "Unknown error"}`);
      console.error("Error executing withdraw leftovers:", error);
      throw error;
    }
  }, [contractAddress, isValidAddress, writeContractAsync]);

  // Enhanced updatePoolDetails
  const updatePoolDetails = useCallback(
    async (details) => {
      if (!isValidAddress) {
        toast.error("Invalid contract address");
        throw new Error("Invalid contract address");
      }

      try {
        toast.loading("Updating pool details...");
        const tx = await writeContractAsync({
          address: contractAddress,
          abi: BONDING_POOL_ABI,
          functionName: "updatePoolDetails",
          args: [details],
        });
        toast.dismiss();
        toast.success("Pool details updated successfully");
        return tx;
      } catch (error) {
        toast.dismiss();
        toast.error(`Update failed: ${error.message || "Unknown error"}`);
        console.error("Error updating pool details:", error);
        throw error;
      }
    },
    [contractAddress, isValidAddress, writeContractAsync]
  );

  // Enhanced setKycAudit
  const setKycAudit = useCallback(
    async (kycStatus, auditStatus, kycLink, auditLink) => {
      if (!isValidAddress) {
        toast.error("Invalid contract address");
        throw new Error("Invalid contract address");
      }

      try {
        toast.loading("Updating KYC/Audit status...");
        const tx = await writeContractAsync({
          address: contractAddress,
          abi: BONDING_POOL_ABI,
          functionName: "setKycAudit",
          args: [kycStatus, auditStatus, kycLink, auditLink],
        });
        toast.dismiss();
        toast.success("KYC/Audit status updated successfully");
        return tx;
      } catch (error) {
        toast.dismiss();
        toast.error(`Update failed: ${error.message || "Unknown error"}`);
        console.error("Error setting KYC/Audit status:", error);
        throw error;
      }
    },
    [contractAddress, isValidAddress, writeContractAsync]
  );

  // Process the results when they're available
  useEffect(() => {
    if (!shouldFetch || !isValidAddress) return;

    const allLoaded =
      !version.isLoading &&
      !poolDetails.isLoading &&
      !poolState.isLoading &&
      !poolType.isLoading &&
      !tokenAddress.isLoading &&
      !circulatingSupply.isLoading &&
      !tokenPrice.isLoading &&
      !decimals.isLoading &&
      !poolInfo.isLoading &&
      !holdersInfo.isLoading &&
      !kycStatus.isLoading &&
      !auditStatus.isLoading &&
      !ethAmount.isLoading;

    const hasError =
      version.error ||
      poolDetails.error ||
      poolState.error ||
      poolType.error ||
      tokenAddress.error ||
      circulatingSupply.error ||
      tokenPrice.error ||
      decimals.error ||
      poolInfo.error ||
      holdersInfo.error ||
      kycStatus.error ||
      auditStatus.error ||
      ethAmount.error;

    if (hasError) {
      const errorMessage =
        "Failed to fetch contract information. Please check the address.";
      setError(errorMessage);
      setContractInfo(null);
      setIsLoading(false);
      setShouldFetch(false);
      toast.dismiss();
      toast.error(errorMessage);
      return;
    }

    if (allLoaded) {
      try {
        // Parse pool details string
        const poolDetailsArr = poolDetails.data
          ? poolDetails.data.split("$#$")
          : [];
        console.log("Pool Icon: ", poolDetailsArr);
        const poolDetailsObj = {
          icon: poolDetailsArr[0] || "",
          backgroundImage: poolDetailsArr[1] || "",
          website: poolDetailsArr[2] || "",
          description: poolDetailsArr[3] || "",
          twitter: poolDetailsArr[4] || "",
          telegram: poolDetailsArr[5] || "",
          discord: poolDetailsArr[6] || "",
          youtube: poolDetailsArr[7] || "",
        };

        // Format the circulating supply with proper decimals if available
        let formattedSupply = "0";
        let rawSupply = "0";
        if (circulatingSupply.data && decimals.data) {
          rawSupply = circulatingSupply.data.toString();
          formattedSupply = formatUnits(circulatingSupply.data, decimals.data);
        }

        // Process token price data
        let formattedPrice = "0";
        let priceTimestamp = 0;
        if (tokenPrice.data) {
          formattedPrice = tokenPrice.data[0]?.toString() || "0";
          priceTimestamp = tokenPrice.data[1]?.toString() || "0";
        }

        // Process holders data
        let holdersCount = 0;
        let holdersAddresses = [];
        if (holdersInfo.data) {
          holdersCount = Number(holdersInfo.data[0] || 0);
          holdersAddresses = holdersInfo.data[1] || [];
        }

        // Process pool info data
        let poolInfoData = null;
        if (poolInfo.data) {
          poolInfoData = {
            tokenAddress: poolInfo.data[0],
            poolState: Number(poolInfo.data[1]?.[0] || 0),
            poolType: Number(poolInfo.data[1]?.[1] || 0),
            decimals: Number(poolInfo.data[1]?.[2] || 18),
            ethAmount: poolInfo.data[2]?.[0]?.toString() || "0",
            tokenAmount: poolInfo.data[2]?.[1]?.toString() || "0",
            kycStatus: Number(poolInfo.data[2]?.[2] || 0) === 1,
            auditStatus: Number(poolInfo.data[2]?.[3] || 0) === 1,
            marketCap: Number(poolInfo.data[2]?.[4] || 0),
            circulatingSupply: poolInfo.data[2]?.[5]?.toString() || "0",
            name: poolInfo.data[3] || "",
            symbol: poolInfo.data[4] || "",
            tokenId: poolInfo.data[6]?.toString() || "0",
            v3Pair: poolInfo.data[7] || "",
            holdersAddresses: poolInfo.data[8] || [],
            tokenTotalSupply: poolInfo.data[9]?.toString() || "0",
          };
        }

        // Calculate market cap using token price
        const fetchPriceAndCalculateMarketCap = async () => {
          console.log({contractAddress})
          try {
            const ethPriceData = await fetchEthPrice();
            const decimalValue = Number(decimals.data || 18);
            const ethAmountValue = ethAmount.data
              ? BigInt(ethAmount.data.toString())
              : BigInt(0);
            const tokenAAmountValue = tokenAAmount.data
              ? BigInt(tokenAAmount.data.toString())
              : BigInt(0);
         
// console.log("ethAmountValue", ethAmount.data)
            // Calculate using the formula from the contract 
            // currentRate = (ethAmount * ethPrice) / (tokenAAmount * (10 ** (18 - tokenDecimals)))
            let currentRate = 0;
            if (ethAmountValue > 0 && tokenAAmountValue > 0) {
              currentRate =
                (Number(ethAmountValue) * Number(ethPriceData.price)) /
                10 ** Number(ethPriceData.decimal) /
                (Number(tokenAAmountValue) * 10 ** (18 - decimalValue));
            }

            console.log({currentRate})

            // Calculate market cap
            const marketCapValue = currentRate * (Number(circulatingSupply.data)/ 10 ** decimalValue);
// console.log("Supply data", circulatingSupply.data)
console.log({marketCapValue})
            // Calculate progress towards target market cap
            const targetMarketCap = poolInfoData?.marketCap || 6900;
            const progress = Math.min(
              100,
              Math.floor((marketCapValue / targetMarketCap) * 100)
            );

            setContractInfo({
              version: version.data?.toString() || "0",
              poolDetails: poolDetailsObj,
              poolState: Number(poolState.data || 0),
              poolStateLabel:
                ["In Use", "Completed", "Cancelled"][
                  Number(poolState.data || 0)
                ] || "Unknown",
              poolType: Number(poolType.data || 0),
              poolTypeLabel:
                ["Presale", "Private Sale", "Fair Sale", "Bonding"][
                  Number(poolType.data || 0)
                ] || "Unknown",
              tokenAddress: tokenAddress.data || "",
              circulatingSupply: formattedSupply,
              rawCirculatingSupply: rawSupply,
              tokenPrice: formattedPrice,
              priceTimestamp: priceTimestamp,
              decimal: Number(decimals.data || 18),
              poolInfo: poolInfoData,
              holdersCount: holdersCount,
              holdersAddresses: holdersAddresses,
              kycStatus: kycStatus.data || false,
              auditStatus: auditStatus.data || false,
              ethAmount: ethAmount.data?.toString() || "0",
              marketCap: marketCapValue.toFixed(2),
              progress: progress,
              status: Number(poolState.data || 0) === 0 ? "LIVE" : "COMPLETED",
              ethPrice: ethPriceData.price,
            });

            setIsLoading(false);
            toast.dismiss();
            // toast.success("Contract info loaded successfully");
          } catch (error) {
            console.error("Error calculating market cap:", error);
            setError("Error calculating market cap");
            setIsLoading(false);
            toast.dismiss();
            toast.error("Error calculating market cap");
          }
        };

        fetchPriceAndCalculateMarketCap();
      } catch (error) {
        console.error("Error processing contract data:", error);
        const errorMessage = "Error processing contract data";
        setError(errorMessage);
        setContractInfo(null);
        setIsLoading(false);
        setShouldFetch(false);
        toast.dismiss();
        toast.error(errorMessage);
      }
    }
  }, [
    shouldFetch,
    isValidAddress,
    version.data,
    version.isLoading,
    version.error,
    poolDetails.data,
    poolDetails.isLoading,
    poolDetails.error,
    poolState.data,
    poolState.isLoading,
    poolState.error,
    poolType.data,
    poolType.isLoading,
    poolType.error,
    tokenAddress.data,
    tokenAddress.isLoading,
    tokenAddress.error,
    circulatingSupply.data,
    circulatingSupply.isLoading,
    circulatingSupply.error,
    tokenPrice.data,
    tokenPrice.isLoading,
    tokenPrice.error,
    decimals.data,
    decimals.isLoading,
    decimals.error,
    poolInfo.data,
    poolInfo.isLoading,
    poolInfo.error,
    holdersInfo.data,
    holdersInfo.isLoading,
    holdersInfo.error,
    kycStatus.data,
    kycStatus.isLoading,
    kycStatus.error,
    auditStatus.data,
    auditStatus.isLoading,
    auditStatus.error,
    ethAmount.data,
    ethAmount.isLoading,
    ethAmount.error,
    fetchEthPrice,
  ]);

  // Reset contract info when address changes
  useEffect(() => {
    if (!shouldFetch) {
      setContractInfo(null);
    }
  }, [contractAddress, shouldFetch]);

  // Add a helper function to get estimated token amount for buy/sell
  const getEstimatedAmount = useCallback(
    (amount, swapType) => {
      if (!contractInfo || !isValidAddress || !contractInfo.ethAmount)
        return "0";

      try {
        // Use the ethAmount from contractInfo
        const currentEthAmount = BigInt(contractInfo.ethAmount);
        const currentCirculatingSupply = BigInt(
          parseUnits(
            contractInfo.circulatingSupply,
            contractInfo.decimal
          ).toString()
        );

        // Calculate k value for the bonding curve (k = token supply * eth reserve)
        const k = currentCirculatingSupply * currentEthAmount;
        let estimatedAmount;

        if (swapType === 1) {
          // Buy tokens with ETH
          // New token supply = k / (eth reserve + input eth)
          // Tokens received = old supply - new supply
          const amountBigInt = BigInt(amount);
          estimatedAmount =
            currentCirculatingSupply - k / (currentEthAmount + amountBigInt);
        } else {
          // Sell tokens for ETH
          // New eth reserve = k / (token supply + tokens sold)
          // ETH received = old eth reserve - new eth reserve
          const amountBigInt = BigInt(amount);
          estimatedAmount =
            currentEthAmount - k / (currentCirculatingSupply + amountBigInt);
        }

        return estimatedAmount.toString();
      } catch (error) {
        console.error("Error calculating estimated amount:", error);
        return "0";
      }
    },
    [contractInfo, isValidAddress]
  );

  return {
    contractInfo,
    isLoading,
    error,
    fetchContractInfo,
    // Write functions
    swap,
    emergencyWithdraw,
    withdrawLeftovers,
    updatePoolDetails,
    setKycAudit,
    // Helper functions
    checkAllowance,
    approveToken,
    getEstimatedAmount,
    // Write status
    isWritePending,
    isWriteError,
    writeError,
  };
}
