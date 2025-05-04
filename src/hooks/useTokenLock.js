import { useState, useCallback, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { readContract, waitForTransaction, multicall } from "@wagmi/core";
import { parseUnits } from "viem";
import { erc20Abi } from "@/utils/ABI";
import { toast } from "react-toastify";
import { config } from "@/providers/xWagmi";
import {
  TOKEN_LOCKER_ADDRESSES,
  FACTORY_ABI,
  TOKEN_LOCKER_ABI,
  LP_FACTORY_ADDRESSES,
} from "@/utils/ABI/Lock";

// Utility function for multicall across chains
export async function multiChainMulticall(chainConfigs) {
  // chainConfigs is an array of objects with structure:
  // [{ chainId: number, calls: [{ address, abi, functionName, args }] }]

  const results = {};

  // Execute multicall for each chain
  for (const chainConfig of chainConfigs) {
    const { chainId, calls } = chainConfig;

    if (!calls || calls.length === 0) continue;

    try {
      // Execute multicall for this chain
      const chainResults = await multicall(config, {
        chainId,
        contracts: calls,
        // multicallAddress: "0x3308CC3B0b2fCD4E9994E210A8290649d61360D7",
      });

      results[chainId] = chainResults;
    } catch (error) {
      console.error(`Multicall failed for chain ${chainId}:`, error);
      results[chainId] = { error };
    }
  }

  return results;
}

export function useTokenLock() {
  const { address } = useAccount();
  const chainId = useChainId();
  const [isApproving, setIsApproving] = useState(false);
  const [isLocking, setIsLocking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTxHash, setCurrentTxHash] = useState(null);
  const [approvalTxHash, setApprovalTxHash] = useState(null);
  const [lockStatus, setLockStatus] = useState({
    status: null, // 'success', 'error', 'pending', null
    txHash: null,
    error: null,
    timestamp: null,
    lockId: null,
  });

  // Get the correct locker contract address based on the current chain
  const getLockerContractAddress = useCallback(() => {
    return TOKEN_LOCKER_ADDRESSES[chainId] || null;
  }, [chainId]);

  const lockerContractAddress = getLockerContractAddress();

  // Contract write hooks
  const { writeContractAsync: approveTokenAsync } = useWriteContract();
  const { writeContractAsync: lockTokenAsync } = useWriteContract();
  const { writeContractAsync: vestingLockAsync } = useWriteContract();
  const { writeContractAsync } = useWriteContract();

  // Transaction receipt hooks
  const { data: txReceipt, isLoading: isWaitingForReceipt } =
    useWaitForTransactionReceipt({
      hash: currentTxHash,
    });

  // Effect to handle transaction receipt updates
  useEffect(() => {
    if (txReceipt && currentTxHash) {
      const status = txReceipt.status === "success" ? "success" : "error";

      // Extract lockId from event logs if successful
      let lockId = null;
      if (status === "success") {
        // Find LockAdded event in the logs
        const lockAddedEvent = txReceipt.logs.find((log) => {
          try {
            // This is simplified and would need proper event parsing
            return log.topics[0] === "0x..."; // LockAdded event signature
          } catch (e) {
            return false;
          }
        });

        if (lockAddedEvent) {
          // Extract lockId from the event
          // This is simplified - you'd need proper event log parsing
          lockId = parseInt(lockAddedEvent.topics[1], 16);
        }
      }

      setLockStatus({
        status,
        txHash: currentTxHash,
        error: status === "error" ? "Transaction failed" : null,
        timestamp: Date.now(),
        lockId,
      });

      // Only reset isLocking if this was a locking transaction
      if (isLocking) setIsLocking(false);
      if (isEditing) setIsEditing(false);

      // Reset currentTxHash after processing
      setCurrentTxHash(null);
    }
  }, [txReceipt, currentTxHash, isLocking, isEditing]);

  // Function to check if a token is an LP token - OPTIMIZED WITH MULTICALL
  const checkIfLpToken = useCallback(
    async (tokenAddress) => {
      try {
        if (!tokenAddress || !chainId) {
          return false;
        }

        // Get LP factory addresses for the current chain
        const factories = LP_FACTORY_ADDRESSES[chainId] || [];

        // Step 1: Try to call common LP-specific methods
        const lpSpecificCalls = [
          // Try getReserves() - exists on most DEX LP tokens (Uniswap, PancakeSwap, etc.)
          {
            address: tokenAddress,
            abi: [
              {
                constant: true,
                inputs: [],
                name: "getReserves",
                outputs: [
                  { name: "_reserve0", type: "uint112" },
                  { name: "_reserve1", type: "uint112" },
                  { name: "_blockTimestampLast", type: "uint32" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "getReserves",
          },
          // Try token0() - another common LP token method
          {
            address: tokenAddress,
            abi: [
              {
                inputs: [],
                name: "token0",
                outputs: [
                  { internalType: "address", name: "", type: "address" },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "token0",
          },
          // Try token1() - another common LP token method
          {
            address: tokenAddress,
            abi: [
              {
                inputs: [],
                name: "token1",
                outputs: [
                  { internalType: "address", name: "", type: "address" },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "token1",
          },
        ];

        // Execute multicall for LP-specific methods
        const lpResults = await multicall(config, {
          contracts: lpSpecificCalls,
          chainId,
        });

        // Check if any LP-specific method call succeeded
        const hasLpMethods = lpResults.some((result) => !result.error);

        if (hasLpMethods) {
          console.log("Token is identified as LP token via method calls");
          return true;
        }

        // Step 2: Check token symbol and name for LP indicators
        const tokenDetailCalls = [
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "symbol",
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "name",
          },
        ];

        const tokenDetails = await multicall(config, {
          contracts: tokenDetailCalls,
          chainId,
        });

        // Handle potential errors
        const symbol = tokenDetails[0].error ? "" : tokenDetails[0].result;
        const name = tokenDetails[1].error ? "" : tokenDetails[1].result;

        // Check if symbol or name contains LP indicators
        const lpIndicators = [
          "lp",
          "pool",
          "pair",
          "liquidity",
          "uniswap",
          "pancake",
          "sushi",
        ];

        const isNameLpRelated = lpIndicators.some(
          (indicator) =>
            (typeof symbol === "string" &&
              symbol.toLowerCase().includes(indicator)) ||
            (typeof name === "string" && name.toLowerCase().includes(indicator))
        );

        if (isNameLpRelated) {
          console.log("Token is identified as LP token via name/symbol");
          return true;
        }

        // Step 3: Check if this token is from a known factory (if factories are provided)
        if (factories.length > 0) {
          try {
            // Just try to get a few pairs from each factory to see if any pairs exist
            const factoryCalls = factories.map((factory) => ({
              address: factory,
              abi: FACTORY_ABI,
              functionName: "allPairsLength",
            }));

            const factoryResults = await multicall(config, {
              contracts: factoryCalls,
              chainId,
            });

            // If any factory has pairs, check if our token is from there
            for (let i = 0; i < factoryResults.length; i++) {
              const result = factoryResults[i];
              if (!result.error && result.result > 0) {
                const pairsLength = Number(result.result);
                const factory = factories[i];

                // Only check a few pairs to avoid excessive calls
                const pairsToCheck = Math.min(5, pairsLength);

                for (let j = 0; j < pairsToCheck; j++) {
                  try {
                    const pairResult = await readContract(config, {
                      address: factory,
                      abi: FACTORY_ABI,
                      functionName: "allPairs",
                      args: [j],
                    });

                    if (
                      pairResult.toLowerCase() === tokenAddress.toLowerCase()
                    ) {
                      console.log(
                        "Token is identified as LP token via factory"
                      );
                      return true;
                    }
                  } catch (e) {
                    console.error("Error checking factory pair:", e);
                  }
                }
              }
            }
          } catch (e) {
            console.error("Error checking factories:", e);
          }
        }

        // Default to treating as not an LP token if we can't confirm it is one
        console.log("Token is NOT identified as LP token");
        return false;
      } catch (error) {
        console.error("Error determining if LP token:", error);
        // Safer to assume it's not an LP token if there's an error
        return false;
      }
    },
    [chainId]
  );

  // Function to check token allowance using multicall
  const checkTokenAllowance = useCallback(
    async (tokenAddress, amountInWei) => {
      try {
        if (!lockerContractAddress || !address) {
          throw new Error("Missing contract address or user address");
        }

        // Use multicall to fetch both token details and allowance in one request
        const calls = [
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "allowance",
            args: [address, lockerContractAddress],
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "decimals",
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "symbol",
          },
        ];

        const results = await multicall(config, {
          contracts: calls,
          chainId,
        });

        const allowance = results[0].result;
        const decimals = results[1].result;
        const symbol = results[2].result;

        return {
          allowance,
          decimals,
          symbol,
          needsApproval: allowance < amountInWei,
        };
      } catch (error) {
        console.error("Error checking allowance:", error);
        throw new Error("Failed to check token allowance");
      }
    },
    [lockerContractAddress, address, chainId]
  );

  // Function to approve token spending with toast.promise
  const approveToken = useCallback(
    async (tokenAddress, amountInWei) => {
      try {
        setIsApproving(true);

        const approvalPromise = async () => {
          const hash = await approveTokenAsync({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "approve",
            args: [lockerContractAddress, amountInWei],
          });

          setApprovalTxHash(hash);

          // Wait for transaction completion
          const receipt = await waitForTransaction(config, {
            hash,
          });

          if (receipt.status !== "success") {
            throw new Error("Approval transaction failed");
          }

          return receipt;
        };

        // Use toast.promise for the approval transaction
        await toast.promise(approvalPromise, {
          pending: "Approving token transfer...",
          success: "Token approved successfully",
          error: {
            render({ data }) {
              return `Error approving token: ${
                data?.message || "Transaction failed"
              }`;
            },
          },
        });

        return true;
      } catch (error) {
        console.error("Error approving token:", error);
        return false;
      } finally {
        setIsApproving(false);
        setApprovalTxHash(null);
      }
    },
    [lockerContractAddress, approveTokenAsync]
  );

  // Function to lock tokens with toast.promise
  const lockToken = useCallback(
    async (
      tokenAddress,
      amount,
      unlockDate,
      description = "",
      isLpToken = null
    ) => {
      try {
        if (!lockerContractAddress) {
          throw new Error("Unsupported chain");
        }

        if (!address) {
          throw new Error("Wallet not connected");
        }

        setIsLocking(true);
        setLockStatus({
          status: "pending",
          txHash: null,
          error: null,
          timestamp: Date.now(),
          lockId: null,
        });

        // If isLpToken is not provided, detect automatically
        if (isLpToken === null) {
          isLpToken = await checkIfLpToken(tokenAddress);
        }

        const lockPromise = async () => {
          // Call lock function
          const hash = await lockTokenAsync({
            address: lockerContractAddress,
            abi: TOKEN_LOCKER_ABI,
            functionName: "lock",
            args: [
              address, // owner
              tokenAddress,
              isLpToken,
              amount,
              unlockDate,
              description,
            ],
          });

          setCurrentTxHash(hash);
          setLockStatus((prev) => ({
            ...prev,
            txHash: hash,
          }));

          // Wait for transaction to complete
          const receipt = await waitForTransaction(config, {
            hash,
          });

          if (receipt.status !== "success") {
            throw new Error("Lock transaction failed");
          }

          // Extract lockId from event logs if needed
          return { hash, receipt };
        };

        // Use toast.promise for the locking transaction
        const result = await toast.promise(lockPromise, {
          pending: "Processing token lock...",
          success: "Tokens locked successfully!",
          error: {
            render({ data }) {
              return `Error locking tokens: ${
                data?.message || "Transaction failed"
              }`;
            },
          },
        });

        return result.hash;
      } catch (error) {
        console.error("Error locking tokens:", error);
        setLockStatus({
          status: "error",
          txHash: null,
          error: error.message || "Unknown error",
          timestamp: Date.now(),
          lockId: null,
        });
        return null;
      } finally {
        if (!currentTxHash) {
          setIsLocking(false);
        }
      }
    },
    [lockerContractAddress, lockTokenAsync, address, checkIfLpToken]
  );

  // Function to lock tokens with vesting using toast.promise
  const vestingLockToken = useCallback(
    async (
      tokenAddress,
      amount,
      tgeDate,
      tgeBps,
      cycle,
      cycleBps,
      description = "",
      isLpToken = null
    ) => {
      try {
        if (!lockerContractAddress) {
          throw new Error("Unsupported chain");
        }

        if (!address) {
          throw new Error("Wallet not connected");
        }

        setIsLocking(true);
        setLockStatus({
          status: "pending",
          txHash: null,
          error: null,
          timestamp: Date.now(),
          lockId: null,
        });

        // If isLpToken is not provided, detect automatically
        if (isLpToken === null) {
          isLpToken = await checkIfLpToken(tokenAddress);
        }

        const vestingLockPromise = async () => {
          // Call vestingLock function
          const hash = await vestingLockAsync({
            address: lockerContractAddress,
            abi: TOKEN_LOCKER_ABI,
            functionName: "vestingLock",
            args: [
              address, // owner
              tokenAddress,
              isLpToken,
              amount,
              tgeDate,
              tgeBps,
              cycle,
              cycleBps,
              description,
            ],
          });

          setCurrentTxHash(hash);
          setLockStatus((prev) => ({
            ...prev,
            txHash: hash,
          }));

          // Wait for transaction to complete
          const receipt = await waitForTransaction(config, {
            hash,
          });

          if (receipt.status !== "success") {
            throw new Error("Vesting lock transaction failed");
          }

          return { hash, receipt };
        };

        // Use toast.promise for the vesting lock transaction
        const result = await toast.promise(vestingLockPromise, {
          pending: "Processing vesting token lock...",
          success: "Tokens locked with vesting successfully!",
          error: {
            render({ data }) {
              return `Error locking tokens with vesting: ${
                data?.message || "Transaction failed"
              }`;
            },
          },
        });

        return result.hash;
      } catch (error) {
        console.error("Error locking tokens with vesting:", error);
        setLockStatus({
          status: "error",
          txHash: null,
          error: error.message || "Unknown error",
          timestamp: Date.now(),
          lockId: null,
        });
        return null;
      } finally {
        if (!currentTxHash) {
          setIsLocking(false);
        }
      }
    },
    [lockerContractAddress, vestingLockAsync, address, checkIfLpToken]
  );

  // Edit locked token with toast.promise
  const editLock = useCallback(
    async (lockId, newAmount = 0, newUnlockDate = 0) => {
      try {
        setIsEditing(true);

        let newUnlockTimestamp = 0;
        if (newUnlockDate) {
          newUnlockTimestamp = Math.floor(
            new Date(newUnlockDate).getTime() / 1000
          );
        }

        const editLockPromise = async () => {
          const hash = await writeContractAsync({
            address: lockerContractAddress,
            abi: TOKEN_LOCKER_ABI,
            functionName: "editLock",
            args: [lockId, newAmount, newUnlockTimestamp],
          });

          setCurrentTxHash(hash);

          // Wait for transaction to complete
          const receipt = await waitForTransaction(config, {
            hash,
          });

          if (receipt.status !== "success") {
            throw new Error("Edit lock transaction failed");
          }

          return { hash, receipt, lockId };
        };

        // Use toast.promise for the edit lock transaction
        const result = await toast.promise(editLockPromise, {
          pending: "Updating lock...",
          success: "Lock updated successfully!",
          error: {
            render({ data }) {
              return `Failed to edit lock: ${
                data?.message || "Transaction failed"
              }`;
            },
          },
        });

        return result.hash;
      } catch (error) {
        console.error("Error editing lock:", error);
        return null;
      } finally {
        if (!currentTxHash) setIsEditing(false);
      }
    },
    [lockerContractAddress, writeContractAsync]
  );

  // Update existing locked token description with toast.promise
  const editLockDescription = useCallback(
    async (lockId, description) => {
      try {
        const editDescriptionPromise = async () => {
          const hash = await writeContractAsync({
            address: lockerContractAddress,
            abi: TOKEN_LOCKER_ABI,
            functionName: "editLockDescription",
            args: [lockId, description],
          });

          // Wait for transaction to complete
          const receipt = await waitForTransaction(config, {
            hash,
          });

          if (receipt.status !== "success") {
            throw new Error("Edit description transaction failed");
          }

          return { hash, receipt, lockId, description };
        };

        // Use toast.promise for the edit description transaction
        const result = await toast.promise(editDescriptionPromise, {
          pending: "Updating lock description...",
          success: "Description updated successfully!",
          error: {
            render({ data }) {
              return `Failed to update description: ${
                data?.message || "Transaction failed"
              }`;
            },
          },
        });

        return result.hash;
      } catch (error) {
        console.error("Error updating description:", error);
        return null;
      }
    },
    [lockerContractAddress, writeContractAsync]
  );

  // Transfer locked token to another address-owner with toast.promise
  const transferLockOwnership = useCallback(
    async (lockId, newOwner) => {
      try {
        const transferOwnershipPromise = async () => {
          const hash = await writeContractAsync({
            address: lockerContractAddress,
            abi: TOKEN_LOCKER_ABI,
            functionName: "transferLockOwnership",
            args: [lockId, newOwner],
          });

          // Wait for transaction to complete
          const receipt = await waitForTransaction(config, {
            hash,
          });

          if (receipt.status !== "success") {
            throw new Error("Transfer ownership transaction failed");
          }

          return { hash, receipt, lockId, newOwner };
        };

        // Use toast.promise for the transfer ownership transaction
        const result = await toast.promise(transferOwnershipPromise, {
          pending: "Transferring lock ownership...",
          success: `Ownership transferred successfully to ${newOwner.substring(
            0,
            6
          )}...${newOwner.substring(newOwner.length - 4)}!`,
          error: {
            render({ data }) {
              return `Failed to transfer ownership: ${
                data?.message || "Transaction failed"
              }`;
            },
          },
        });

        return result.hash;
      } catch (error) {
        console.error("Error transferring ownership:", error);
        return null;
      }
    },
    [lockerContractAddress, writeContractAsync]
  );

  // A read function to check how many tokens can be withdrawn for a vesting lock
  const getWithdrawableTokens = useCallback(
    async (lockId) => {
      try {
        const withdrawable = await readContract(config, {
          address: lockerContractAddress,
          abi: TOKEN_LOCKER_ABI,
          functionName: "withdrawableTokens",
          args: [lockId],
        });

        return withdrawable;
      } catch (error) {
        console.error("Error checking withdrawable tokens:", error);
        return BigInt(0);
      }
    },
    [lockerContractAddress]
  );

  // For creating multiple vesting locks at once with toast.promise
  const multipleVestingLock = useCallback(
    async (
      owners,
      amounts,
      tokenAddress,
      tokenDecimals,
      tgeDate,
      tgeBps,
      cycle,
      cycleBps,
      description = "",
      isLpToken = null
    ) => {
      try {
        // Convert amounts to wei
        const amountsInWei = amounts.map((amount) =>
          parseUnits(amount.toString(), tokenDecimals)
        );

        // Check if LP token
        if (isLpToken === null) {
          isLpToken = await checkIfLpToken(tokenAddress);
        }

        // Convert TGE date
        const tgeTimestamp = Math.floor(new Date(tgeDate).getTime() / 1000);

        // Calculate total amount for approval
        const totalAmount = amountsInWei.reduce(
          (sum, amount) => sum + amount,
          BigInt(0)
        );

        // Approve tokens if needed
        const { needsApproval } = await checkTokenAllowance(
          tokenAddress,
          totalAmount
        );

        if (needsApproval) {
          const isApproved = await approveToken(tokenAddress, totalAmount);
          if (!isApproved) throw new Error("Token approval failed");
        }

        const multiLockPromise = async () => {
          // Call multiple vesting lock
          const hash = await writeContractAsync({
            address: lockerContractAddress,
            abi: TOKEN_LOCKER_ABI,
            functionName: "multipleVestingLock",
            args: [
              owners,
              amountsInWei,
              tokenAddress,
              isLpToken,
              tgeTimestamp,
              tgeBps,
              cycle,
              cycleBps,
              description,
            ],
          });

          setCurrentTxHash(hash);

          const receipt = await waitForTransaction(config, {
            hash: hash,
          });

          if (receipt.status !== "success") {
            throw new Error("Multiple vesting locks transaction failed");
          }

          return { hash, receipt, count: owners.length };
        };

        // Use toast.promise for the multiple vesting locks transaction
        const result = await toast.promise(multiLockPromise, {
          pending: "Creating multiple vesting locks...",
          success: {
            render({ data }) {
              return `Successfully created ${data.count} vesting locks!`;
            },
          },
          error: {
            render({ data }) {
              return `Failed to create locks: ${
                data?.message || "Transaction failed"
              }`;
            },
          },
        });

        return result.hash;
      } catch (error) {
        console.error("Error creating multiple vesting locks:", error);
        return null;
      }
    },
    [
      lockerContractAddress,
      writeContractAsync,
      checkIfLpToken,
      checkTokenAllowance,
      approveToken,
    ]
  );

  // Function to perform the full token locking process with toast.promise
  const performTokenLock = useCallback(
    async (
      tokenAddress,
      tokenDecimals,
      amount,
      unlockDate,
      description = "",
      vestingOptions = null
    ) => {
      try {
        // Validate inputs
        if (!tokenAddress) {
          throw new Error("Token address is required");
        }

        if (!amount || parseFloat(amount) <= 0) {
          throw new Error("Invalid amount");
        }

        if (!unlockDate || new Date(unlockDate).getTime() <= Date.now()) {
          throw new Error("Unlock date must be in the future");
        }

        // Reset lock status
        setLockStatus({
          status: null,
          txHash: null,
          error: null,
          timestamp: null,
          lockId: null,
        });

        // Convert amount to wei format
        const amountInWei = parseUnits(amount.toString(), tokenDecimals);

        // Full token locking process as a promise
        const lockProcessPromise = async () => {
          // Determine if token is LP token
          const isLpToken = await checkIfLpToken(tokenAddress);

          // Step 1: Check if approval is needed
          const { needsApproval } = await checkTokenAllowance(
            tokenAddress,
            amountInWei
          );

          // Step 2: Approve token transfer if needed
          if (needsApproval) {
            const isApproved = await approveToken(tokenAddress, amountInWei);
            if (!isApproved) {
              throw new Error("Token approval failed or was rejected");
            }
          }

          // Step 3: Lock tokens (with or without vesting)
          let hash;
          if (vestingOptions) {
            const { tgeDate, tgeBps, cycle, cycleBps } = vestingOptions;
            const tgeTimestamp = Math.floor(new Date(tgeDate).getTime() / 1000);

            hash = await vestingLockToken(
              tokenAddress,
              amountInWei,
              tgeTimestamp,
              tgeBps,
              cycle,
              cycleBps,
              description,
              isLpToken
            );
          } else {
            const unlockTimestamp = Math.floor(
              new Date(unlockDate).getTime() / 1000
            );
            hash = await lockToken(
              tokenAddress,
              amountInWei,
              unlockTimestamp,
              description,
              isLpToken
            );
          }

          if (!hash) {
            throw new Error("Token locking failed or was rejected");
          }

          const receipt = await waitForTransaction(config, {
            hash: hash,
          });

          if (receipt.status !== "success") {
            throw new Error("Transaction reverted");
          }

          return {
            hash,
            isLpToken,
            receipt,
            amount,
            tokenAddress,
          };
        };

        // Since we're handling individual steps with their own toast promises,
        // we don't need another toast.promise here
        const result = await lockProcessPromise();
         const receipt = await waitForTransaction(config, {
            hash: result.hash,
          });
        if (receipt.status === "success") {
          return {
          success: true,
          hash: result.hash,
          isLpToken: result.isLpToken,
        };
        }

        
      } catch (error) {
        console.error("Error in token lock process:", error);
        setLockStatus({
          status: "error",
          txHash: null,
          error: error.message || "Unknown error",
          timestamp: Date.now(),
          lockId: null,
        });

        toast.error(`Lock failed: ${error.message || "Unknown error"}`);
        return {
          success: false,
          error: error.message || "Unknown error",
        };
      }
    },
    [
      checkIfLpToken,
      checkTokenAllowance,
      approveToken,
      lockToken,
      vestingLockToken,
    ]
  );

  // Function to unlock tokens with toast.promise
  const unlockToken = useCallback(
    async (lockId) => {
      try {
        if (!lockerContractAddress) {
          throw new Error("Unsupported chain");
        }

        if (!address) {
          throw new Error("Wallet not connected");
        }

        setIsLocking(true);
        setLockStatus({
          status: "pending",
          txHash: null,
          error: null,
          timestamp: Date.now(),
          lockId,
        });

        const unlockPromise = async () => {
          // Call unlock function
          const hash = await lockTokenAsync({
            address: lockerContractAddress,
            abi: TOKEN_LOCKER_ABI,
            functionName: "unlock",
            args: [lockId],
          });

          setCurrentTxHash(hash);
          setLockStatus((prev) => ({
            ...prev,
            txHash: hash,
          }));

          // Wait for transaction to complete
          const receipt = await waitForTransaction(config, {
            hash,
          });

          if (receipt.status !== "success") {
            throw new Error("Unlock transaction failed");
          }

          return { hash, receipt, lockId };
        };

        // Use toast.promise for the unlock transaction
        const result = await toast.promise(unlockPromise, {
          pending: "Processing token unlock...",
          success: "Tokens unlocked successfully!",
          error: {
            render({ data }) {
              return `Error unlocking tokens: ${
                data?.message || "Transaction failed"
              }`;
            },
          },
        });

        return result.hash;
      } catch (error) {
        console.error("Error unlocking tokens:", error);
        setLockStatus({
          status: "error",
          txHash: null,
          error: error.message || "Unknown error",
          timestamp: Date.now(),
          lockId,
        });
        return null;
      } finally {
        if (!currentTxHash) {
          setIsLocking(false);
        }
      }
    },
    [lockerContractAddress, lockTokenAsync, address]
  );

  // Get user locks - OPTIMIZED WITH MULTICALL
  const getUserLocks = useCallback(async () => {
    try {
      if (!lockerContractAddress || !address) {
        return { normalLocks: [], lpLocks: [] };
      }

      const fetchLocksPromise = async () => {
        // Use multicall to fetch both normal and LP locks in a single call
        const calls = [
          {
            address: lockerContractAddress,
            abi: TOKEN_LOCKER_ABI,
            functionName: "normalLocksForUser",
            args: [address],
          },
          {
            address: lockerContractAddress,
            abi: TOKEN_LOCKER_ABI,
            functionName: "lpLocksForUser",
            args: [address],
          },
        ];

        const results = await multicall(config, {
          contracts: calls,
          chainId,
        });

        const normalLocks = results[0].result;
        const lpLocks = results[1].result;

        return {
          normalLocks,
          lpLocks,
          total: normalLocks.length + lpLocks.length,
        };
      };

      // Use toast.promise for fetching locks
      const result = await fetchLocksPromise({
        success: {
          render({ data }) {
            return `Successfully loaded ${data.total} locks`;
          },
        },
        error: "Failed to fetch your locks",
      });

      return result;
    } catch (error) {
      console.error("Error fetching user locks:", error);
      return { normalLocks: [], lpLocks: [] };
    }
  }, [lockerContractAddress, address, chainId]);

  // New function to fetch lock details across multiple chains
  const getMultiChainLocks = useCallback(
    async (targetChainIds = null) => {
      try {
        if (!address) {
          return { chains: {} };
        }

        // Get chains to query - use provided chains or all supported chains
        const chainsToQuery =
          targetChainIds ||
          Object.keys(TOKEN_LOCKER_ADDRESSES).map((id) => parseInt(id));

        // Prepare multicall configurations for each chain
        const chainConfigs = chainsToQuery
          .map((chainId) => {
            const contractAddress = TOKEN_LOCKER_ADDRESSES[chainId];
            if (!contractAddress) return null;

            return {
              chainId,
              calls: [
                {
                  address: contractAddress,
                  abi: TOKEN_LOCKER_ABI,
                  functionName: "normalLocksForUser",
                  args: [address],
                },
                {
                  address: contractAddress,
                  abi: TOKEN_LOCKER_ABI,
                  functionName: "lpLocksForUser",
                  args: [address],
                },
              ],
            };
          })
          .filter(Boolean);

        // Execute multicall across all chains
        const results = await multiChainMulticall(chainConfigs);

        // Process results into a more usable format
        const processedResults = {};

        for (const chainId in results) {
          const chainResults = results[chainId];
          if (chainResults.error) {
            processedResults[chainId] = {
              error: chainResults.error,
              normalLocks: [],
              lpLocks: [],
            };
          } else {
            processedResults[chainId] = {
              normalLocks: chainResults[0].result || [],
              lpLocks: chainResults[1].result || [],
              total:
                (chainResults[0].result?.length || 0) +
                (chainResults[1].result?.length || 0),
            };
          }
        }

        return { chains: processedResults };
      } catch (error) {
        console.error("Error fetching multi-chain locks:", error);
        return { chains: {} };
      }
    },
    [address]
  );

  // Get detailed info for multiple locks using multicall
  const getDetailedLockInfo = useCallback(
    async (lockIds) => {
      try {
        if (!lockerContractAddress || !lockIds || lockIds.length === 0) {
          return [];
        }

        // Prepare the calls for each lock ID
        const calls = lockIds.flatMap((lockId) => [
          {
            address: lockerContractAddress,
            abi: TOKEN_LOCKER_ABI,
            functionName: "getLockById",
            args: [lockId],
          },
          {
            address: lockerContractAddress,
            abi: TOKEN_LOCKER_ABI,
            functionName: "withdrawableTokens",
            args: [lockId],
          },
        ]);

        // Execute multicall
        const results = await multicall(config, {
          contracts: calls,
          chainId,
        });

        // Process results - for each lock we have getLockById and withdrawableTokens
        const detailedLocks = [];
        for (let i = 0; i < lockIds.length; i++) {
          const lockInfo = results[i * 2].result;
          const withdrawable = results[i * 2 + 1].result;

          if (lockInfo) {
            detailedLocks.push({
              ...lockInfo,
              withdrawable,
              lockId: lockIds[i],
            });
          }
        }

        return detailedLocks;
      } catch (error) {
        console.error("Error fetching detailed lock info:", error);
        return [];
      }
    },
    [lockerContractAddress, chainId]
  );

  // Clear lock status (useful for UI resets)
  const clearLockStatus = useCallback(() => {
    setLockStatus({
      status: null,
      txHash: null,
      error: null,
      timestamp: null,
      lockId: null,
    });
  }, []);

  return {
    performTokenLock,
    unlockToken,
    getUserLocks,
    getMultiChainLocks, // New function for multi-chain data
    getDetailedLockInfo, // New function using multicall for detailed lock info
    isApproving,
    editLock,
    editLockDescription,
    transferLockOwnership,
    getWithdrawableTokens,
    multipleVestingLock,
    isLocking,
    isProcessing: isApproving || isLocking || isWaitingForReceipt,
    currentTxHash,
    txReceipt,
    lockStatus,
    clearLockStatus,
    checkIfLpToken,
    checkTokenAllowance, // Optimized with multicall
  };
}
