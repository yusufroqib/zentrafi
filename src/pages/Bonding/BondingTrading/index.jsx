import { useState, useEffect } from "react";
import { BondingTradingChart } from "../components/BondingChart";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Info, Share, X, Twitter, Globe } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useBondingContract } from "@/hooks/useBondingContract";
import { useAccount } from "wagmi";

export default function BondingChartPage() {
	const { bondingAddress } = useParams();
	const { contractInfo, isLoading, error, fetchContractInfo } =
		useBondingContract(bondingAddress);
	const account = useAccount();
	const [isFavorite, setIsFavorite] = useState(false);
	const [showFullDescription, setShowFullDescription] = useState(false);

	// Fetch contract data when component mounts
	useEffect(() => {
		if (bondingAddress) {
			fetchContractInfo();
		}
	}, [bondingAddress, fetchContractInfo]);

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};

	const shareChart = () => {
		try {
			navigator.clipboard.writeText(window.location.href);
			alert("Link copied to clipboard!");
		} catch (error) {
			console.error("Failed to copy link:", error);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen text-white flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-t-[#018ABD] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-[#97CBDC]">Loading chart data...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen text-white flex items-center justify-center">
				<div className="text-center">
					<div className="bg-red-500/20 p-4 rounded-lg mb-4">
						<p className="text-red-400">Error loading contract data</p>
					</div>
					<p className="text-[#97CBDC]">{error}</p>
					<Button
						className="mt-4 bg-[#018ABD] hover:bg-[#004581] text-white"
						onClick={() => fetchContractInfo()}
					>
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	if (!contractInfo) {
		return (
			<div className="min-h-screen text-white flex items-center justify-center">
				<div className="text-center">
					<p className="text-[#97CBDC]">No contract data available</p>
					<Button
						className="mt-4 bg-[#018ABD] hover:bg-[#004581] text-white"
						onClick={() => fetchContractInfo()}
					>
						Load Contract Data
					</Button>
				</div>
			</div>
		);
	}

	const tokenSymbol = contractInfo.poolInfo?.symbol || "???";
	const tokenName = contractInfo.poolInfo?.name || "Unknown Token";
	const Icon = contractInfo.poolDetails?.icon || null;
	const marketCap = parseFloat(contractInfo.marketCap || "0");
	const holders = contractInfo.holdersCount || 0;
	const progress = contractInfo.progress || 0;

	const website = contractInfo.poolDetails?.website;
	const twitter = contractInfo.poolDetails?.twitter;
	const telegram = contractInfo.poolDetails?.telegram;
	const discord = contractInfo.poolDetails?.discord;

	const tokenDescription =
		contractInfo.poolDetails?.description || "No description available";

	const shortenedAddress = bondingAddress
		? `${bondingAddress.substring(0, 6)}...${bondingAddress.substring(
				bondingAddress.length - 4
		  )}`
		: "";

	return (
		<div className="min-h-screen text-white">
			<div className="container mx-auto px-4 py-6 space-y-6">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
				>
					<div className="flex items-center gap-3">
						<Link to="/" className="cursor-pointer">
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full bg-[#1D2538]/60 hover:bg-[#1D2538]"
							>
								<ArrowLeft className="h-5 cursor-pointer w-5 text-[#97CBDC]" />
							</Button>
						</Link>
						<div>
							<h1 className="text-2xl font-bold text-white flex items-center gap-2">
								{tokenName}{" "}
								<span className="text-[#97CBDC]">({tokenSymbol})</span>
							</h1>
							<div className="flex items-center gap-2 mt-1">
								<span className="text-[#97CBDC] text-sm">
									{shortenedAddress}
								</span>
								<a
									href={`${account?.chain?.blockExplorers?.default?.url}/address/${bondingAddress}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-[#018ABD] hover:text-[#004581] text-sm flex items-center"
								>
									<Info className="h-3 w-3 mr-1" />
									View on Explorer
								</a>
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							className={cn(
								"rounded-full h-10 w-10",
								isFavorite
									? "bg-[#018ABD]/20 text-[#018ABD] hover:bg-[#018ABD]/30"
									: "bg-[#1D2538]/60 text-[#97CBDC] hover:bg-[#1D2538]"
							)}
							onClick={toggleFavorite}
						>
							<Star className={cn("h-5 w-5", isFavorite && "fill-[#018ABD]")} />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="rounded-full h-10 w-10 bg-[#1D2538]/60 text-[#97CBDC] hover:bg-[#1D2538]"
							onClick={shareChart}
						>
							<Share className="h-5 w-5" />
						</Button>
					</div>
				</motion.div>

				{/* Token Info Cards */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}
					className="bg-gradient-to-r from-[#1D2538]/90 to-[#1D2538] rounded-2xl overflow-hidden border border-[#475B74]/50 shadow-xl backdrop-blur-sm p-6"
				>
					<div className="flex flex-col md:flex-row items-center justify-between gap-6">
						<div className="flex items-center gap-4">
							<div className="h-16 w-16 bg-[#1D2538]/60 rounded-full flex items-center justify-center border border-[#475B74]/50">
								{Icon ? (
									<img
										src={Icon}
										alt={tokenName}
										className="rounded-full h-14 w-14 object-cover"
									/>
								) : (
									<div className="text-[#97CBDC] text-2xl font-bold">
										{tokenSymbol?.charAt(0) || "?"}
									</div>
								)}
							</div>
							<div>
								<h2 className="text-xl font-bold text-white">
									{tokenName}{" "}
									<span className="text-[#97CBDC]">({tokenSymbol})</span>
								</h2>
								<div className="text-[#97CBDC] text-sm">
									{!showFullDescription && tokenDescription.length > 50
										? `${tokenDescription.substring(0, 50)}... `
										: tokenDescription}
									{tokenDescription.length > 50 && (
										<span
											className="text-[#018ABD] cursor-pointer hover:underline ml-1"
											onClick={() =>
												setShowFullDescription(!showFullDescription)
											}
										>
											{showFullDescription ? "show less" : "see more"}
										</span>
									)}
								</div>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-6 w-full md:w-auto">
							<div className="flex flex-col">
								<span className="text-[#97CBDC] text-sm mb-1">Progress</span>
								<div className="relative h-2 w-full bg-[#1D2538] rounded-full overflow-hidden mb-1">
									<motion.div
										className="h-full bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-full"
										initial={{ width: 0 }}
										animate={{ width: `${Math.max(progress, 0.5)}%` }}
										transition={{ duration: 0.8, ease: "easeOut" }}
									></motion.div>
								</div>
								<span className="text-[#4ade80] font-medium">{progress}%</span>
							</div>

							<div className="flex flex-col">
								<span className="text-[#97CBDC] text-sm mb-1">Market Cap</span>
								<span className="text-white font-medium">
									${marketCap.toLocaleString()}
								</span>
							</div>

							<div className="flex flex-col">
								<span className="text-[#97CBDC] text-sm mb-1">Holders</span>
								<span className="text-white font-medium">{holders}</span>
							</div>
						</div>
					</div>

					{/* Social Links */}
					{(website || twitter || telegram || discord) && (
						<div className="mt-6 pt-4 border-t border-[#475B74]/30">
							<h3 className="text-[#97CBDC] text-sm mb-3">Links</h3>
							<div className="flex flex-wrap gap-3">
								{website && (
									<a
										href={website}
										target="_blank"
										rel="noopener noreferrer"
										className="px-4 py-2 bg-[#1D2538]/60 hover:bg-[#1D2538] text-white rounded-lg text-sm flex items-center"
									>
										<Globe className="h-4 w-4 mr-2" />
										Website
									</a>
								)}
								{twitter && (
									<a
										href={twitter}
										target="_blank"
										rel="noopener noreferrer"
										className="px-4 py-2 cursor-pointer bg-[#1D2538]/60 hover:bg-[#1D2538] text-white rounded-lg text-sm flex items-center"
									>
										<Twitter className="h-4 w-4 mr-2" />X
									</a>
								)}
								{telegram && (
									<a
										href={telegram}
										target="_blank"
										rel="noopener noreferrer"
										className="px-4 py-2 cursor-pointer bg-[#1D2538]/60 hover:bg-[#1D2538] text-white rounded-lg text-sm flex items-center"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4 mr-2"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
										</svg>
										Telegram
									</a>
								)}
								{discord && (
									<a
										href={discord}
										target="_blank"
										rel="noopener noreferrer"
										className="px-4 py-2 bg-[#1D2538]/60 hover:bg-[#1D2538] text-white rounded-lg text-sm flex items-center"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4 mr-2"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
										</svg>
										Discord
									</a>
								)}
							</div>
						</div>
					)}
				</motion.div>

				{/* Full Description Modal */}
				{showFullDescription && tokenDescription.length > 50 && (
					<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							className="bg-[#1D2538] rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
						>
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-xl font-bold text-white">
									About {tokenName}
								</h3>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-full cursor-pointer h-8 w-8 bg-[#1D2538]/60 text-[#97CBDC]"
									onClick={() => setShowFullDescription(false)}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
							<p className="text-[#97CBDC] whitespace-pre-wrap">
								{tokenDescription}
							</p>
						</motion.div>
					</div>
				)}

				{/* Chart with Trading Interface */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.2 }}
				>
					<BondingTradingChart
						tokenAddress={bondingAddress}
						pairAddress={contractInfo.poolInfo?.v3Pair}
						initialData={contractInfo}
					/>
				</motion.div>
			</div>
		</div>
	);
}
