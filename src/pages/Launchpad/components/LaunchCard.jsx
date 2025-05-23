import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Diamond,
	Clock,
	TrendingUp,
	Wallet,
	Star,
	Users,
	ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccount } from "wagmi";
import { Link, useNavigate } from "react-router-dom";

export function LaunchCard({ launch, isHovered }) {
	const account = useAccount();
	const symbol = account?.chain?.nativeCurrency?.symbol || "PTT";
	const navigate = useNavigate();
	const getStatusColor = () => {
		switch (launch?.status) {
			case "LIVE":
				return "bg-gradient-to-r from-green-500 to-green-400 text-green-100";
			case "UPCOMING":
				return "bg-gradient-to-r from-blue-500 to-blue-400 text-blue-100";
			case "COMPLETED":
				return "bg-gradient-to-r from-purple-500 to-purple-400 text-purple-100";
			case "BONDING":
				return "bg-gradient-to-r from-purple-600 to-purple-500 text-purple-100";
			case "ENDED":
				return "bg-gradient-to-r from-gray-500 to-gray-400 text-gray-100";
			default:
				return "bg-gradient-to-r from-gray-500 to-gray-400 text-gray-100";
		}
	};

	const getProgressBarColor = () => {
		switch (launch?.status) {
			case "UPCOMING":
				return "bg-gradient-to-r from-blue-600 to-blue-400";
			case "BONDING":
				return "bg-gradient-to-r from-purple-600 to-purple-400";
			case "LIVE":
				return "bg-gradient-to-r from-green-500 to-green-400";
			case "COMPLETED":
				return "bg-gradient-to-r from-green-500 to-green-400";
			default:
				return "bg-gradient-to-r from-gray-500 to-gray-400";
		}
	};

	return (
		<motion.div
			className={cn(
				"bg-gradient-to-b from-[#1D2538]/90 to-[#1D2538] rounded-3xl overflow-hidden border border-[#475B74]/50 shadow-xl backdrop-blur-sm transition-all duration-300 relative z-10 group",
				isHovered && "border-[#018ABD]/70 shadow-[#018ABD]/5"
			)}
			animate={{
				y: isHovered ? -5 : 0,
				transition: { duration: 0.2 },
			}}
		>
			{/* Glow effect on hover */}
			<div className="absolute -inset-0.5 bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

			<div className="relative">
				<div className="relative h-48 overflow-hidden">
					<img
						src={
							launch?.backgroundImage || "/placeholder.svg?height=200&width=400"
						}
						alt={launch?.name}
						fill
						className={cn(
							"object-cover transition-transform duration-700 w-full",
							isHovered && "scale-105"
						)}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#1D2538] to-transparent opacity-70"></div>

					{/* Status Badge */}
					<div className="absolute top-3 left-3 z-10">
						<Badge
							className={`${getStatusColor()} text-xs font-medium px-3 py-1 rounded-full shadow-lg`}
						>
							{launch?.status === "LIVE" && (
								<span className="w-2 h-2 rounded-full bg-white mr-1.5 animate-pulse"></span>
							)}
							{launch?.status}
						</Badge>
					</div>

					{/* Featured Badge */}
					{/* {launch?.featured && (
            <div className="absolute top-3 right-3 z-10">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-yellow-500 to-amber-300 p-1.5 rounded-full shadow-lg">
                  <Star className="h-4 w-4 text-white fill-white" />
                </div>
              </motion.div>
            </div>
          )} */}

					<div className="absolute bottom-4 left-4 flex items-center gap-3">
						<motion.div
							className="h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-lg"
							animate={{
								scale: isHovered ? 1.05 : 1,
								transition: { duration: 0.2 },
							}}
						>
							<img
								src={launch?.icon || "/placeholder.svg?height=60&width=60"}
								alt={`${launch?.name} icon`}
								width={64}
								height={64}
								className="object-cover"
							/>
						</motion.div>
						<div>
							<h3 className="text-xl font-bold text-white drop-shadow-md">
								{launch?.name}
							</h3>
							{launch?.participants && (
								<div className="flex items-center gap-1 text-xs text-[#97CBDC]">
									<Users className="h-3 w-3" />
									<span>{launch?.participants} participants</span>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="p-5 space-y-5">
					<div className="grid grid-cols-2 gap-4">
						<motion.div
							className="bg-[#1D2538]/60 rounded-xl p-3 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-colors duration-300"
							animate={{
								y: isHovered ? -3 : 0,
								transition: { duration: 0.2, delay: 0.1 },
							}}
						>
							<div className="flex items-center gap-2 mb-1">
								<Wallet className="h-4 w-4 text-[#018ABD]" />
								<span className="text-xs text-[#97CBDC]">Progress</span>
							</div>
							<p className="text-lg font-semibold text-[#DDEEFF]">
								{launch?.progress.toFixed(2)}%
							</p>
						</motion.div>

						<motion.div
							className="bg-[#1D2538]/60 rounded-xl p-3 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-colors duration-300"
							animate={{
								y: isHovered ? -3 : 0,
								transition: { duration: 0.2, delay: 0.15 },
							}}
						>
							<div className="flex items-center gap-2 mb-1">
								<TrendingUp className="h-4 w-4 text-[#018ABD]" />
								<span className="text-xs text-[#97CBDC]">Total Raised</span>
							</div>
							<p className="text-lg font-semibold text-[#DDEEFF]">
								{launch?.totalRaised || "0"} {symbol}
							</p>
						</motion.div>
					</div>

					<div className="relative h-2 w-full bg-[#1D2538] rounded-full overflow-hidden">
						<motion.div
							className={`h-full ${getProgressBarColor()} rounded-full`}
							initial={{ width: 0 }}
							animate={{ width: `${Math.min(launch?.progress, 100)}%` }}
							transition={{ duration: 0.8, ease: "easeOut" }}
						></motion.div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Clock className="h-4 w-4 text-[#97CBDC]" />
							<span className="text-sm text-[#97CBDC]">Start Time:</span>
						</div>
						<span className="text-sm font-medium bg-[#1D2538] px-3 py-1 rounded-full text-[#DDEEFF]">
							{launch?.startTime}
						</span>
					</div>

					<motion.div
						animate={{
							scale: isHovered ? 1.03 : 1,
							transition: { duration: 0.2 },
						}}
					>
						<Link to={`/fairlaunch-details/${launch?.id}`}>
							<Button className="w-full bg-gradient-to-r from-[#004581] cursor-pointer to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl h-12 shadow-lg shadow-[#004581]/20 transition-all duration-200 font-medium group">
								<span
									// onClick={() => navigate(`/fairlaunch-details/${launch?.id}`)}
								>
									VIEW SALE
								</span>
								<ArrowUpRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</Button>
						</Link>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}
