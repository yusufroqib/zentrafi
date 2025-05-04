import { useEffect, useState } from "react";
import {
	Loader2,
	AlertCircle,
	Twitter,
	MessageCircle,
	MessageSquare,
	Github,
	Rocket,
} from "lucide-react";
import { toast } from "react-toastify";
import { useLaunch } from "@/providers/FairLaunchProvider";
import { useLaunchPool } from "@/hooks/useLaunchPool";
import truncateWalletAddress from "@/lib/truncateWalletAddress";
import { useAccount } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { config } from "@/providers/Wagmi";

export default function FairLaunchReviewStep() {
	const { address } = useAccount();
	const { formData, isSubmitting, setIsSubmitting, setIsSuccess } = useLaunch();

	const { createFairSale, getFairFees, isCreatingFairSale, transactionStatus } =
		useLaunchPool();

	const [fee, setFee] = useState("0");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Fetch pool creation fee on component mount
	useEffect(() => {
		const fetchFees = async () => {
			try {
				setIsLoading(true);
				// Get KYC and audit settings from form data (default to 0 if not set)
				const kyc = formData.kyc ? 1 : 0;
				const audit = formData.audit ? 1 : 0;

				const fairFees = await getFairFees(kyc, audit);
				setFee(fairFees.toString());
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching fees:", error);
				setError("Failed to fetch creation fees");
				setIsLoading(false);
			}
		};

		fetchFees();
	}, [getFairFees, formData.kyc, formData.audit]);

	// Handle successful transaction
	useEffect(() => {
		if (transactionStatus.status === "success") {
			setIsSuccess(true);
			setIsSubmitting(false);
		} else if (transactionStatus.status === "error") {
			setError(transactionStatus.error || "Transaction failed");
			setIsSubmitting(false);
		}
	}, [transactionStatus, setIsSuccess, setIsSubmitting]);

	// handleSubmit function in FairLaunchReviewStep.jsx
	const handleSubmit = async () => {
		setIsSubmitting(true);
		setError("");

		try {
			// Validate required fields
			if (!formData.tokenAddress) throw new Error("Token address is required");
			if (!formData.totalSaleAmount)
				throw new Error("Total sale amount is required");
			if (!formData.softcap) throw new Error("Softcap is required");
			if (!formData.startTime) throw new Error("Start time is required");
			if (!formData.endTime) throw new Error("End time is required");
			if (!formData.liquidityLockDuration)
				throw new Error("Liquidity lock duration is required");
			if (!formData.liquidityPercentage)
				throw new Error("Liquidity percentage is required");

			// Parse dates
			const startTime = new Date(formData.startTime);
			const endTime = new Date(formData.endTime);

			// Ensure start time is in the future
			if (startTime <= new Date()) {
				throw new Error("Start time must be in the future");
			}

			// Ensure end time is after start time
			if (endTime <= startTime) {
				throw new Error("End time must be after start time");
			}

			// Get router address based on DEX choice
			const router = getRouterAddress();

			// Prepare parameters according to the contract expectation
			// Format according to PDF documentation
			// [0] = token, [1] = router, [2] = governance, [3] = currency
			const _addrs = [
				formData.tokenAddress,
				router,
				address, // governance (current connected wallet)
				"0x0000000000000000000000000000000000000000", // Zero address for native token
			];

			// [0] = softCap, [1] = totalToken
			const _capSettings = [
				formData.softcap.toString(),
				formData.totalSaleAmount.toString(),
			];

			// [0] = startTime, [1] = endTime, [2] = liquidityLockDays
			const _timeSettings = [
				Math.floor(startTime.getTime() / 1000).toString(),
				Math.floor(endTime.getTime() / 1000).toString(),
				formData.liquidityLockDuration.toString(),
			];

			// [0] = audit, [1] = kyc, [2] = routerVersion
			const _auditKRVTokenId = [
				formData.audit ? "1" : "0",
				formData.kyc ? "1" : "0",
				formData.dex === "Zentra V2" ? "2" : "3",
			];

			// [0] = liquidityPercent, [1] = refundType
			const _liquidityPercent = [
				formData.liquidityPercentage.toString(),
				formData.refundType === "Burn" ? "0" : "1",
			];

			// Pool details
			const _poolDetails =
				formData.description || `${formData.tokenName || "Token"} Fair Launch`;

			// Other info
			const _otherInfo = [
				formData.website || "",
				formData.socials?.telegram || "",
				formData.socials?.twitter || "",
			];

			// Get the fee required for fair launch creation
			const kyc = formData.kyc ? 1 : 0;
			const audit = formData.audit ? 1 : 0;
			const fairFees = await getFairFees(1, 1);

			// Call the createFairSale function with the properly formatted parameters
			const saleParams = {
				tokenAddress: formData.tokenAddress,
				routerAddress: router,
				governance: address,
				currencyAddress: "0x0000000000000000000000000000000000000000",
				softCap: formData.softcap.toString(),
				totalTokens: formData.totalSaleAmount.toString(),
				startTime: startTime,
				endTime: endTime,
				liquidityLockDays: (
					formData.liquidityLockDuration *
					3600 *
					24
				).toString(),
				audit: 2, //  formData.audit == 0 ? 0 :
				kyc: 2, //  formData.kyc == 0 ? 0 :
				routerVersion: formData.dex === "Zentra V2" ? 2 : 3,
				liquidityPercent: formData.liquidityPercentage,
				refundType: formData.refundType === "Burn" ? 1 : 0,
				poolDetails: _poolDetails,
				otherInfo: _otherInfo,
			};

			const txHash = await createFairSale(saleParams, BigInt(fairFees));

			const receipt = waitForTransaction(config, {
				hash: txHash,
			});

			console.log(receipt);
			if (receipt.status === "error") {
				toast.error("Failed to create fair sale");
				setIsSubmitting(false);
			}
		} catch (error) {
			console.error("Error creating fair sale:", error);
			setError(error.message || "Failed to create fair sale");
			setIsSubmitting(false);
		} finally {
			setIsSubmitting(false);
			setIsLoading(false);
		}
	};

	// console.log(`Audit: ${formData.audit}`);
	// console.log(`Kyc: ${formData.kyc}`);
	// console.log("Refund type: ",formData.refundType)

	// Helper function to get router address based on DEX selection
	const getRouterAddress = () => {
		// Get the router address based on the selected DEX from PDF documentation
		const routers = {
			"Zentra V2": "0xe1CB270f0C7C82dA9E819A4cC2bd43861F550C4F",
			"Zentra V3": "0xD0AAe88AF22dAE89CCF46D9033C2dB6eBf4B87F0", // This is NonfungiblePositionManager for V3
		};

		return routers[formData.dex] || routers["Zentra V2"];
	};

	const getPoolDescription = () => {
		return (
			formData.description || `${formData.tokenName || "Token"} Fair Launch`
		);
	};

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-6">
					<div>
						<h3 className="text-lg font-medium text-[#97CBDC] mb-3">
							Token Information
						</h3>
						<div className="bg-[#0a0a20]/80 rounded-xl border border-[#475B74]/50 overflow-hidden">
							<div className="grid grid-cols-2 divide-x divide-[#475B74]/30 border-b border-[#475B74]/30">
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">Name</div>
									<div className="font-medium text-[#97CBDC]">
										{formData.tokenName}
									</div>
								</div>
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">Symbol</div>
									<div className="font-medium text-[#97CBDC]">
										{formData.tokenSymbol}
									</div>
								</div>
							</div>
							<div className="grid grid-cols-2 divide-x divide-[#475B74]/30 border-b border-[#475B74]/30">
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">Decimals</div>
									<div className="font-medium text-[#97CBDC]">
										{formData.tokenDecimals}
									</div>
								</div>
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">Total Supply</div>
									<div className="font-medium text-[#97CBDC]">
										{Number(formData.tokenSupply).toLocaleString()}
									</div>
								</div>
							</div>
							<div className="p-3">
								<div className="text-xs text-[#97CBDC]/50">Token Address</div>
								<div className="font-medium text-[#97CBDC] text-sm truncate">
									{truncateWalletAddress(formData.tokenAddress)}
								</div>
							</div>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-medium text-[#97CBDC] mb-3">
							Launch Configuration
						</h3>
						<div className="bg-[#0a0a20]/80 rounded-xl border border-[#475B74]/50 overflow-hidden">
							<div className="grid grid-cols-2 divide-x divide-[#475B74]/30 border-b border-[#475B74]/30">
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">Launch Type</div>
									<div className="font-medium text-[#97CBDC] capitalize">
										{formData.launchType} Launch
									</div>
								</div>
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">DEX</div>
									<div className="font-medium text-[#97CBDC]">
										{formData.dex}
									</div>
								</div>
							</div>
							<div className="grid grid-cols-2 divide-x divide-[#475B74]/30 border-b border-[#475B74]/30">
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">Sale Amount</div>
									<div className="font-medium text-[#97CBDC]">
										{Number(formData.totalSaleAmount).toLocaleString()}{" "}
										{formData.tokenSymbol}
									</div>
								</div>
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">Currency</div>
									<div className="font-medium text-[#97CBDC]">
										{formData.currency}
									</div>
								</div>
							</div>
							<div className="grid grid-cols-2 divide-x divide-[#475B74]/30 border-b border-[#475B74]/30">
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">Softcap</div>
									<div className="font-medium text-[#97CBDC]">
										{formData.softcap} {formData.currency}
									</div>
								</div>
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">Liquidity</div>
									<div className="font-medium text-[#97CBDC]">
										{formData.liquidityPercentage}%
									</div>
								</div>
							</div>
							{formData.launchType === "presale" && (
								<div className="grid grid-cols-2 divide-x divide-[#475B74]/30 border-b border-[#475B74]/30">
									<div className="p-3">
										<div className="text-xs text-[#97CBDC]/50">Hardcap</div>
										<div className="font-medium text-[#97CBDC]">
											{formData.hardcap} {formData.currency}
										</div>
									</div>
									<div className="p-3">
										<div className="text-xs text-[#97CBDC]/50">
											Unsold Tokens
										</div>
										<div className="font-medium text-[#97CBDC]">
											{formData.refundType}
										</div>
									</div>
								</div>
							)}
							{formData.enableVesting && (
								<div className="p-3 border-b border-[#475B74]/30">
									<div className="text-xs text-[#97CBDC]/50">Vesting</div>
									<div className="font-medium text-[#97CBDC]">
										{formData.vestingFirstRelease}% at TGE, then{" "}
										{formData.vestingRelease}% every {formData.vestingPeriod}{" "}
										days
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="space-y-6">
					<div>
						<h3 className="text-lg font-medium text-[#97CBDC] mb-3">
							Schedule
						</h3>
						<div className="bg-[#0a0a20]/80 rounded-xl border border-[#475B74]/50 overflow-hidden">
							<div className="grid grid-cols-2 divide-x divide-[#475B74]/30 border-b border-[#475B74]/30">
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">Start Time</div>
									<div className="font-medium text-[#97CBDC]">
										{formData.startTime
											? new Date(formData.startTime).toLocaleString()
											: "Not set"}
									</div>
								</div>
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">End Time</div>
									<div className="font-medium text-[#97CBDC]">
										{formData.endTime
											? new Date(formData.endTime).toLocaleString()
											: "Not set"}
									</div>
								</div>
							</div>
							<div className="p-3">
								<div className="text-xs text-[#97CBDC]/50">Liquidity Lock</div>
								<div className="font-medium text-[#97CBDC]">
									{formData.liquidityLockDuration} days
								</div>
							</div>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-medium text-[#97CBDC] mb-3">
							Project Information
						</h3>
						<div className="bg-[#0a0a20]/80 rounded-xl border border-[#475B74]/50 overflow-hidden">
							<div className="p-3 border-b border-[#475B74]/30">
								<div className="text-xs text-[#97CBDC]/50">Website</div>
								<div className="font-medium text-[#97CBDC]">
									{formData.website}
								</div>
							</div>
							<div className="p-3 border-b border-[#475B74]/30">
								<div className="text-xs text-[#97CBDC]/50">Social Media</div>
								<div className="grid grid-cols-2 gap-2 mt-1">
									{formData.socials.twitter && (
										<div className="flex items-center gap-1 text-sm text-[#97CBDC]">
											<Twitter className="h-3.5 w-3.5 text-[#97CBDC]/70" />
											<span className="truncate">Twitter</span>
										</div>
									)}
									{formData.socials.telegram && (
										<div className="flex items-center gap-1 text-sm text-[#97CBDC]">
											<MessageCircle className="h-3.5 w-3.5 text-[#97CBDC]/70" />
											<span className="truncate">Telegram</span>
										</div>
									)}
									{formData.socials.discord && (
										<div className="flex items-center gap-1 text-sm text-[#97CBDC]">
											<MessageSquare className="h-3.5 w-3.5 text-[#97CBDC]/70" />
											<span className="truncate">Discord</span>
										</div>
									)}
									{formData.socials.github && (
										<div className="flex items-center gap-1 text-sm text-[#97CBDC]">
											<Github className="h-3.5 w-3.5 text-[#97CBDC]/70" />
											<span className="truncate">GitHub</span>
										</div>
									)}
								</div>
							</div>
							{formData.description && (
								<div className="p-3">
									<div className="text-xs text-[#97CBDC]/50">Description</div>
									<div className="text-sm mt-1 text-[#97CBDC]">
										{formData.description}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{error && (
				<div className="bg-[#0a0a20]/60 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
					<AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
					<div>
						<h3 className="font-medium text-red-400">Error</h3>
						<p className="text-sm text-red-300">{error}</p>
					</div>
				</div>
			)}

			<div className="flex justify-center pt-4">
				<button
					onClick={handleSubmit}
					disabled={isSubmitting}
					className="px-6 cursor-pointer py-3 rounded-xl bg-gradient-to-r from-[#004581] to-[#018ABD] text-white hover:from-[#003b6e] hover:to-[#0179a3] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[180px] justify-center shadow-lg shadow-[#004581]/20"
				>
					{isSubmitting ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							<span>Creating Launch...</span>
						</>
					) : (
						<>
							<Rocket className="h-4 w-4" />
							<span>Create Token Launch</span>
						</>
					)}
				</button>
			</div>
		</div>
	);
}
