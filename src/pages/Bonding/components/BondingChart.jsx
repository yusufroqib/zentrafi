"use client";

import { useState, useEffect, useRef } from "react";
import {
	ArrowUp,
	ArrowDown,
	RefreshCw,
	Clock,
	Calendar,
	ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Chart from "chart.js/auto";
import { useAccount } from "wagmi";
import { useBondingContract } from "@/hooks/useBondingContract";
import { parseUnits } from "viem";
import { toast } from "react-toastify";
import axios from "axios";
import { config } from "@/providers/wagmi";
import { getBalance } from "@wagmi/core";
import useEthersProvider from "@/hooks/useEthersProvider";
import {
	BONDING_POOL_ABI,
	PHAROS_BONDING_CONTRACT_ADDRESS,
} from "@/utils/ABI/BondingPool";
import { Contract, formatUnits, parseEther } from "ethers";
// Helper function to format numbers
function formatNumber(num) {
	console.log({ num });
	const realNumber = isNaN(num) ? parseFloat(num?.replace(/,/g, "")) : num;

	console.log({ realNumber });
	if (realNumber >= 1000000000000) {
		return (realNumber / 1000000000000).toFixed(5) + "T";
	} else if (realNumber >= 1000000000) {
		return (realNumber / 1000000000).toFixed(5) + "B";
	} else if (realNumber >= 1000000) {
		return (realNumber / 1000000).toFixed(2) + "M";
	} else if (realNumber >= 1000) {
		return (realNumber / 1000).toFixed(2) + "K";
	} else {
		return realNumber.toFixed(2);
	}
}

const defaultOptions = {
	responsive: true,
	maintainAspectRatio: false,
	interaction: {
		mode: "index",
		intersect: false,
	},
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			backgroundColor: "rgba(29, 37, 56, 0.9)",
			titleColor: "#fff",
			bodyColor: "#97CBDC",
			borderColor: "rgba(71, 91, 116, 0.5)",
			borderWidth: 1,
			padding: 10,
			cornerRadius: 8,
			displayColors: false,
			callbacks: {
				title: (context) => {
					return format(new Date(context[0].parsed.x), "PPp");
				},
				label: (context) => {
					return `Price: $${formatCryptoPrice(context.parsed.y)}`;
				},
			},
		},
	},
	scales: {
		x: {
			type: "time",
			time: {
				unit: "hour",
			},
			grid: {
				display: true,
				color: "rgba(71, 91, 116, 0.1)",
			},
			border: {
				display: false,
			},
			ticks: {
				color: "rgba(151, 203, 220, 0.7)",
				maxRotation: 0,
				autoSkip: true,
				maxTicksLimit: 6,
			},
		},
		y: {
			position: "right",
			grid: {
				display: true,
				color: "rgba(71, 91, 116, 0.1)",
			},
			border: {
				display: false,
			},
			ticks: {
				color: "rgba(151, 203, 220, 0.7)",
				callback: (value) => "$" + formatCryptoPrice(value),
			},
		},
	},
};

// Helper function to format crypto prices with appropriate precision
function formatCryptoPrice(price) {
	console.log({ price: price });
	if (price === 0) return "0.00";

	// For very small numbers (less than 0.00001), use scientific notation
	if (price < 0.00001) {
		return price.toExponential(4);
	}

	// For other numbers, show 8 decimal places
	return price.toFixed(8);
}

export function BondingTradingChart({
	tokenAddress,
	pairAddress,
	initialData = null,
}) {
	console.log("Token Address: ", tokenAddress);
	console.log("Pair Address: ", pairAddress);
	console.log("Initial Data: ", initialData);

	const account = useAccount();
	const { address } = useAccount();
	const chainSymbol = account?.chain?.nativeCurrency.symbol || "PTT";
	const userAddress = account?.address;
	const [chartData, setChartData] = useState(initialData || []);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [timeframe, setTimeframe] = useState("24h");
	const [chartInstance, setChartInstance] = useState(null);
	const [priceData, setPriceData] = useState({
		current: 0,
		change: 0,
		changePercentage: 0,
	});
	const [volumeData, setVolumeData] = useState({
		current: 0,
		change: 0,
		changePercentage: 0,
	});
	const [liquidityData, setLiquidityData] = useState({
		current: 0,
		change: 0,
		changePercentage: 0,
	});
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
	const [indicators, setIndicators] = useState({
		ma: false,
		ema: false,
		rsi: false,
	});
	const [tokenBalance, setTokenBalance] = useState("0");
	const [holderAddresses, setHolderAddresses] = useState([]);

	const [tradeTab, setTradeTab] = useState("buy");
	const [amount, setAmount] = useState("");
	const [slippage, setSlippage] = useState("0.5");
	const [transactionTab, setTransactionTab] = useState("holders");
	const { contractInfo, decimals } = useBondingContract(tokenAddress);
	const [transactionsData, setTransactionsData] = useState([]);
	const [nativeBalance, setNativeBalance] = useState(null);
	const { readOnlyProvider, signer } = useEthersProvider();

	const chartRef = useRef(null);
	const chartContainerRef = useRef(null);

	useEffect(() => {
		const fetchBalance = async () => {
			if (!address) return;
			try {
				const balanceData = await getBalance(config, { address });
				setNativeBalance(Number(balanceData?.formatted).toFixed(4)); 
			} catch (err) {
				console.error("Failed to fetch balance:", err);
				setNativeBalance("0");
			}
		};
		fetchBalance();
	}, [address]);

	console.log("Native: ", nativeBalance);
	const fetchChartData = async (tf = timeframe) => {
		setIsLoading(true);
		setError(null);

		try {
			if (!contractInfo && !initialData) {
				throw new Error("Contract information not available");
			}

			const contractData = initialData || contractInfo;

			const tokenPrice =
				Number.parseFloat(contractData?.tokenPrice) || 0.0000024;
			const marketCap = Number.parseFloat(contractData?.marketCap) || 0;
			const ethAmount = Number.parseFloat(contractData?.ethAmount) || 0;
			const circulatingSupply =
				Number.parseFloat(contractData?.circulatingSupply) || 0;

			const addresses =
				contractData?.holdersAddresses ||
				contractData?.poolInfo?.holdersAddresses ||
				[];
			setHolderAddresses(addresses);

			let ethPrice = 0;
			try {
				const priceResponse = await axios.get(
					`${import.meta.env.VITE_SERVER_URL}/api/get-price`
				);
				const { pairPrice, pairDecimal } = priceResponse.data;

				ethPrice = Number(pairPrice) / Math.pow(10, Number(pairDecimal));
				console.log("Fetched ETH price:", ethPrice);
			} catch (error) {
				console.error("Error fetching ETH price:", error);
				ethPrice = 1800; // Default ETH price in USD
			}

			console.log("Using token price:", tokenPrice);
			console.log("Using market cap:", marketCap);

			const now = new Date();
			const data = [];
			let timeIncrement;

			const basePrice = tokenPrice;

			switch (tf) {
				case "1h":
					timeIncrement = 60 * 1000; // 1 minute
					for (let i = 60; i >= 0; i--) {
						const time = new Date(now.getTime() - i * timeIncrement);
						const randomFactor = 1 + (Math.random() - 0.5) * 0.0002;
						const price = basePrice * randomFactor;
						const volume =
							Math.random() * 10000 * (1 + Math.abs(randomFactor - 1) * 10);
						data.push({ time, price, volume });
					}
					break;
				case "24h":
					timeIncrement = 30 * 60 * 1000; // 30 minutes
					for (let i = 48; i >= 0; i--) {
						const time = new Date(now.getTime() - i * timeIncrement);
						const randomFactor = 1 + (Math.random() - 0.5) * 0.001;
						const price = basePrice * randomFactor;
						const volume =
							Math.random() * 50000 * (1 + Math.abs(randomFactor - 1) * 10);
						data.push({ time, price, volume });
					}
					break;
				case "7d":
					timeIncrement = 4 * 60 * 60 * 1000; // 4 hours
					for (let i = 42; i >= 0; i--) {
						const time = new Date(now.getTime() - i * timeIncrement);
						const randomFactor = 1 + (Math.random() - 0.5) * 0.003;
						const price = basePrice * randomFactor;
						const volume =
							Math.random() * 200000 * (1 + Math.abs(randomFactor - 1) * 10);
						data.push({ time, price, volume });
					}
					break;
				case "30d":
					timeIncrement = 24 * 60 * 60 * 1000; // 1 day
					for (let i = 30; i >= 0; i--) {
						const time = new Date(now.getTime() - i * timeIncrement);
						const randomFactor = 1 + (Math.random() - 0.5) * 0.01;
						const price = basePrice * randomFactor;
						const volume =
							Math.random() * 500000 * (1 + Math.abs(randomFactor - 1) * 10);
						data.push({ time, price, volume });
					}
					break;
				case "all":
					timeIncrement = 7 * 24 * 60 * 60 * 1000; // 1 week
					for (let i = 12; i >= 0; i--) {
						const time = new Date(now.getTime() - i * timeIncrement);
						const randomFactor = 1 + (Math.random() - 0.5) * 0.03;
						const price = basePrice * randomFactor;
						const volume =
							Math.random() * 1000000 * (1 + Math.abs(randomFactor - 1) * 10);
						data.push({ time, price, volume });
					}
					break;
				default:
					timeIncrement = 30 * 60 * 1000; // 30 minutes
					for (let i = 48; i >= 0; i--) {
						const time = new Date(now.getTime() - i * timeIncrement);
						const randomFactor = 1 + (Math.random() - 0.5) * 0.001;
						const price = basePrice * randomFactor;
						const volume =
							Math.random() * 50000 * (1 + Math.abs(randomFactor - 1) * 10);
						data.push({ time, price, volume });
					}
			}

			// Calculate price change
			const firstPrice = data[0].price;
			const lastPrice = data[data.length - 1].price;
			const priceChange = lastPrice - firstPrice;
			const priceChangePercentage = (priceChange / firstPrice) * 100;

			const marketCapValue = Number.parseFloat(contractData?.marketCap || 0);
			const marketCapUSD = marketCapValue * ethPrice;
			const estimatedVolume = marketCapUSD * 0.05;

			setChartData(data);
			setPriceData({
				current: lastPrice,
				change: priceChange,
				changePercentage: priceChangePercentage,
			});

			// Use real volume data if available
			setVolumeData({
				current: estimatedVolume.toLocaleString(),
				change: 0,
				changePercentage: contractData?.progress
					? contractData.progress - 100
					: Math.random() * 20 - 10,
			});

			const ethAmountInEth = ethAmount / 1e18; // Convert wei to ETH
			setLiquidityData({
				current: ethAmountInEth * ethPrice,
				change: 0,
				changePercentage: contractData?.progress
					? contractData.progress - 100
					: Math.random() * 15 - 7.5,
			});
		} catch (err) {
			console.error("Error fetching chart data:", err);
			setError("Failed to load chart data. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	// Initialize price chart
	useEffect(() => {
		if (!chartRef.current || chartData.length === 0) return;

		// Destroy existing chart if it exists
		if (chartInstance) {
			chartInstance.destroy();
		}

		const ctx = chartRef.current.getContext("2d");

		// Prepare data for price chart
		let datasets = [];
		const options = { ...defaultOptions };

		// Price chart
		datasets = [
			{
				label: "Price",
				data: chartData.map((item) => ({
					x: item.time,
					y: item.price,
				})),
				borderColor: "#018ABD",
				backgroundColor: createGradient(ctx, "#018ABD"),
				borderWidth: 2,
				pointRadius: 0,
				pointHoverRadius: 4,
				pointBackgroundColor: "#018ABD",
				pointHoverBackgroundColor: "#ffffff",
				pointHoverBorderColor: "#018ABD",
				pointHoverBorderWidth: 2,
				tension: 0.4,
				fill: true,
			},
		];

		// Add Moving Average if enabled
		if (indicators.ma) {
			const maData = calculateMA(chartData, 20);
			datasets.push({
				label: "MA (20)",
				data: maData.map((item) => ({
					x: item.time,
					y: item.value,
				})),
				borderColor: "#f59e0b",
				borderWidth: 1.5,
				pointRadius: 0,
				pointHoverRadius: 0,
				tension: 0.4,
				fill: false,
			});
		}

		// Add EMA if enabled
		if (indicators.ema) {
			const emaData = calculateEMA(chartData, 20);
			datasets.push({
				label: "EMA (20)",
				data: emaData.map((item) => ({
					x: item.time,
					y: item.value,
				})),
				borderColor: "#ec4899",
				borderWidth: 1.5,
				pointRadius: 0,
				pointHoverRadius: 0,
				tension: 0.4,
				fill: false,
			});
		}

		// Create price chart
		const newChartInstance = new Chart(ctx, {
			type: "line",
			data: {
				datasets,
			},
			options,
		});

		setChartInstance(newChartInstance);

		// Cleanup
		return () => {
			if (newChartInstance) {
				newChartInstance.destroy();
			}
		};
	}, [chartData, timeframe, indicators]);

	// Fetch data on mount and when timeframe changes
	useEffect(() => {
		if (tokenAddress || pairAddress) {
			fetchChartData(timeframe);
		}
	}, [timeframe, tokenAddress, pairAddress]);

	// Helper function to create gradient
	function createGradient(ctx, color) {
		const gradient = ctx.createLinearGradient(0, 0, 0, 400);
		gradient.addColorStop(0, `${color}30`); // 30% opacity
		gradient.addColorStop(1, `${color}00`); // 0% opacity
		return gradient;
	}

	// Helper function to calculate Moving Average
	function calculateMA(data, period) {
		const result = [];
		for (let i = period - 1; i < data.length; i++) {
			let sum = 0;
			for (let j = 0; j < period; j++) {
				sum += data[i - j].price;
			}
			result.push({
				time: data[i].time,
				value: sum / period,
			});
		}
		return result;
	}

	// Helper function to calculate Exponential Moving Average
	function calculateEMA(data, period) {
		const result = [];
		const k = 2 / (period + 1);
		let ema = data[0].price;

		for (let i = 0; i < data.length; i++) {
			ema = data[i].price * k + ema * (1 - k);
			result.push({
				time: data[i].time,
				value: ema,
			});
		}
		return result;
	}

	// Handle refresh
	const handleRefresh = () => {
		fetchChartData();
	};

	// Toggle fullscreen
	const toggleFullscreen = () => {
		if (chartContainerRef.current) {
			if (!isFullscreen) {
				if (chartContainerRef.current.requestFullscreen) {
					chartContainerRef.current.requestFullscreen();
				} else if (chartContainerRef.current.webkitRequestFullscreen) {
					chartContainerRef.current.webkitRequestFullscreen();
				} else if (chartContainerRef.current.msRequestFullscreen) {
					chartContainerRef.current.msRequestFullscreen();
				}
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			}
		}
	};

	// Listen for fullscreen change
	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(
				document.fullscreenElement ||
					document.webkitFullscreenElement ||
					document.mozFullScreenElement ||
					document.msFullscreenElement
			);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);
		document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
		document.addEventListener("mozfullscreenchange", handleFullscreenChange);
		document.addEventListener("MSFullscreenChange", handleFullscreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
			document.removeEventListener(
				"webkitfullscreenchange",
				handleFullscreenChange
			);
			document.removeEventListener(
				"mozfullscreenchange",
				handleFullscreenChange
			);
			document.removeEventListener(
				"MSFullscreenChange",
				handleFullscreenChange
			);
		};
	}, []);

	// Toggle indicators
	const toggleIndicator = (indicator) => {
		setIndicators((prev) => ({
			...prev,
			[indicator]: !prev[indicator],
		}));
	};

	// Handle amount change
	const handleAmountChange = (e) => {
		const value = e.target.value;
		if (value === "" || /^\d*\.?\d*$/.test(value)) {
			setAmount(value);
		}
	};

	// Handle percentage click
	const handlePercentageClick = (percentage) => {
		if (percentage === "MAX") {
			setAmount("1.0"); // Example max amount
		} else {
			const value = Number.parseFloat(percentage) / 100;
			setAmount((1.0 * value).toString());
		}
	};
	const { swap } = useBondingContract(tokenAddress);

	// Handle reset
	const handleReset = () => {
		setAmount("");
	};

	// Handle place order
	const handlePlaceOrder = async () => {
		if (!amount || Number.parseFloat(amount) <= 0) {
			toast.error("Please enter a valid amount");
			return;
		}

		try {
			console.log("before")
			const bondingPoolContract = new Contract(
				PHAROS_BONDING_CONTRACT_ADDRESS,
				BONDING_POOL_ABI,
				signer
			);
			const supraResponse = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}/api/bytes-proof`
			);
			const proofHex = supraResponse.data;
			console.log({ proofHex });
			const amountValue = Number.parseFloat(amount);
			
			const swapType = tradeTab === "buy" ? 1 : 2;
			
			const valueToSend = tradeTab === "buy" ? parseEther(amountValue.toString()) : 0;
			
			const contractData = initialData || contractInfo;
			const tokenDecimals =
			contractData?.decimal || contractData?.poolInfo?.decimals || 18;
			
			const tokenAmount =
				tradeTab === "sell"
					? parseUnits(amount.toString(), tokenDecimals).toString()
					: "0";
					// const res=    await bondingPool.swap()
					//--------------------------------------
					const txData = bondingPoolContract.interface.encodeFunctionData("swap", [
						tradeTab === "buy" ? 0 : tokenAmount,
						swapType,
						proofHex,
					]);
					console.log("after")
			//     // // Estimate gas
			// const gasEstimate = await readOnlyProvider.estimateGas({
			// 	from: address,
			// 	to: tokenAddress,
			// 	data: txData,
			// });

			// // Get current gas price
			const gasPrice = await readOnlyProvider.send("eth_gasPrice", []);
		
			const tx = {
				to: tokenAddress,
				data: txData,
				gasLimit: BigInt(8000000),
				gasPrice: gasPrice,
				value: valueToSend,
			};
			const sentTx = await signer.sendTransaction(tx);
			const receipt = await sentTx.wait(1);

			console.log("Transaction receipt:", receipt);
			//--------------------------------------
			// await swap(
			// 	tradeTab === "buy" ? "0" : tokenAmount,
			// 	swapType,
			// 	"0x",
			// 	valueToSend
			// );

			// Reset amount after successful transaction
			setAmount("");

			// Refresh chart data
			fetchChartData();
		} catch (error) {
			console.error("Error placing order:", error);
			toast.error(
				"Failed to place order: " + (error.message || "Unknown error")
			);
		}
	};

	useEffect(() => {
		const fetchTokenBalance = async () => {
			const contractData = initialData || contractInfo;

			if (contractData && userAddress) {
				try {
					// This would be replaced with your actual token balance fetching logic
					// For now, we'll use a simulated balance based on circulating supply
					// const bal
					const balanceData = await getBalance(config, { address, token: initialData.poolInfo.tokenAddress });
					console.log({ tokenAddress: initialData.poolInfo.tokenAddress})
					console.log({ balanceData })
					const formattedBalance = Number(balanceData?.formatted).toFixed(5);
					setTokenBalance(formattedBalance)

					// const circulatingSupply =
					// 	Number.parseFloat(contractData.circulatingSupply) || 0;
					// const simulatedBalance = circulatingSupply * 0.001;
					// setTokenBalance(simulatedBalance.toFixed(5));
				} catch (error) {
					console.error("Error fetching token balance:", error);
					setTokenBalance("0");
				}
			}
		};

		fetchTokenBalance();
	}, [contractInfo, initialData, userAddress]);

	useEffect(() => {
		if (contractInfo || initialData) {
			const contractData = initialData || contractInfo;

			// Get holders addresses from contract data
			const addresses =
				contractData?.holdersAddresses ||
				contractData?.poolInfo?.holdersAddresses ||
				[];

			// Map addresses to transaction data if available
			const holders =
				addresses.length > 0
					? addresses.slice(0, 8).map((address, index) => {
							return {
								address: address, // Store the full address
								displayAddress: `${address.substring(
									0,
									6
								)}...${address.substring(address.length - 4)}`,
								type: Math.random() > 0.3 ? "Buy" : "Sell", // Simulate more buys than sells
								amount: (Math.random() * 0.001).toFixed(6),
								currency: chainSymbol,
								percentage: (Math.random() * 2 + 0.1).toFixed(4) + "%",
								tag: index === 0 ? "DEV" : undefined, // Mark first address as DEV for demonstration
							};
					  })
					: [];

			setTransactionsData(holders);
		}
	}, [contractInfo, initialData, chainSymbol]);

	// Function to copy address to clipboard
	const copyToClipboard = (address) => {
		navigator.clipboard
			.writeText(address)
			.then(() => {
				toast.success("Address copied to clipboard");
			})
			.catch((err) => {
				console.error("Failed to copy address: ", err);
				toast.error("Failed to copy address");
			});
	};

	if (isLoading) {
		return;
		<div className="absolute inset-0 flex items-center justify-center bg-[#1D2538]/30 backdrop-blur-sm">
			<div className="flex flex-col items-center">
				<div className="w-10 h-10 border-4 border-t-[#018ABD] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-3"></div>
				<span className="text-[#97CBDC] text-sm">Loading chart data...</span>
			</div>
		</div>;
	}

	return (
		<div className="space-y-6">
			<div
				ref={chartContainerRef}
				className={cn(
					"bg-gradient-to-r from-[#1D2538]/90 to-[#1D2538] rounded-2xl overflow-hidden border border-[#475B74]/50 shadow-xl backdrop-blur-sm",
					isFullscreen && "fixed inset-0 z-50 rounded-none border-0"
				)}
			>
				{/* Chart Header */}
				<div className="p-4 border-b border-[#475B74]/50">
					<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
						<div className="flex flex-col">
							<div className="flex items-center gap-2">
								<h2 className="text-xl font-bold text-white">Price Chart</h2>
								<span className="bg-[#1D2538]/60 text-[#97CBDC] px-2 py-0.5 rounded text-xs">
									{tokenAddress?.substring(0, 6)}...
									{tokenAddress?.substring(tokenAddress.length - 4)}
								</span>
							</div>
							<div className="flex items-center gap-3 mt-1">
								<div className="flex flex-col">
									<span className="text-[#97CBDC] text-xs">Price</span>
									<div className="flex items-center gap-2">
										<span className="text-white font-medium">
											$
											{priceData.current < 0.00001
												? priceData.current.toExponential(4)
												: priceData.current.toFixed(8)}
										</span>
										<span
											className={cn(
												"flex items-center text-xs",
												priceData.changePercentage >= 0
													? "text-[#4ade80]"
													: "text-[#f87171]"
											)}
										>
											{priceData.changePercentage >= 0 ? (
												<ArrowUp className="h-3 w-3 mr-0.5" />
											) : (
												<ArrowDown className="h-3 w-3 mr-0.5" />
											)}
											{Math.abs(priceData.changePercentage).toFixed(2)}%
										</span>
									</div>
								</div>

								<div className="flex flex-col">
									<span className="text-[#97CBDC] text-xs">Volume (24h)</span>
									<div className="flex items-center gap-2">
										<span className="text-white font-medium">
											${formatNumber(volumeData.current)}
										</span>
										<span
											className={cn(
												"flex items-center text-xs",
												volumeData.changePercentage >= 0
													? "text-[#4ade80]"
													: "text-[#f87171]"
											)}
										>
											{volumeData.changePercentage >= 0 ? (
												<ArrowUp className="h-3 w-3 mr-0.5" />
											) : (
												<ArrowDown className="h-3 w-3 mr-0.5" />
											)}
											{Math.abs(volumeData.changePercentage).toFixed(2)}%
										</span>
									</div>
								</div>

								<div className="flex flex-col">
									<span className="text-[#97CBDC] text-xs">Liquidity</span>
									<div className="flex items-center gap-2">
										<span className="text-white font-medium">
											${formatNumber(liquidityData.current)}
										</span>
										<span
											className={cn(
												"flex items-center text-xs",
												liquidityData.changePercentage >= 0
													? "text-[#4ade80]"
													: "text-[#f87171]"
											)}
										>
											{liquidityData.changePercentage >= 0 ? (
												<ArrowUp className="h-3 w-3 mr-0.5" />
											) : (
												<ArrowDown className="h-3 w-3 mr-0.5" />
											)}
											{Math.abs(liquidityData.changePercentage).toFixed(2)}%
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-2 flex-wrap">
							<div className="flex items-center gap-1">
								<Button
									variant="ghost"
									size="sm"
									className={cn(
										"px-3 py-1 h-9 rounded-lg cursor-pointer",
										timeframe === "1h"
											? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white"
											: "bg-[#1D2538]/60 text-[#97CBDC] hover:bg-[#1D2538] hover:text-white"
									)}
									onClick={() => {
										setTimeframe("1h");
										fetchChartData("1h");
									}}
								>
									1H
								</Button>
								<Button
									variant="ghost"
									size="sm"
									className={cn(
										"px-3 py-1 h-9 rounded-lg cursor-pointer",
										timeframe === "24h"
											? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white"
											: "bg-[#1D2538]/60 text-[#97CBDC] hover:bg-[#1D2538] hover:text-white"
									)}
									onClick={() => {
										setTimeframe("24h");
										fetchChartData("24h");
									}}
								>
									24H
								</Button>
								<Button
									variant="ghost"
									size="sm"
									className={cn(
										"px-3 py-1 h-9 rounded-lg cursor-pointer",
										timeframe === "7d"
											? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white"
											: "bg-[#1D2538]/60 text-[#97CBDC] hover:bg-[#1D2538] hover:text-white"
									)}
									onClick={() => {
										setTimeframe("7d");
										fetchChartData("7d");
									}}
								>
									7D
								</Button>
								<Button
									variant="ghost"
									size="sm"
									className={cn(
										"px-3 py-1 h-9 rounded-lg cursor-pointer",
										timeframe === "30d"
											? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white"
											: "bg-[#1D2538]/60 text-[#97CBDC] hover:bg-[#1D2538] hover:text-white"
									)}
									onClick={() => {
										setTimeframe("30d");
										fetchChartData("30d");
									}}
								>
									30D
								</Button>
								<Button
									variant="ghost"
									size="sm"
									className={cn(
										"px-3 py-1 h-9 rounded-lg cursor-pointer",
										timeframe === "all"
											? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white"
											: "bg-[#1D2538]/60 text-[#97CBDC] hover:bg-[#1D2538] hover:text-white"
									)}
									onClick={() => {
										setTimeframe("all");
										fetchChartData("all");
									}}
								>
									ALL
								</Button>
							</div>

							<div className="flex items-center gap-1">
								<Button
									variant="ghost"
									size="icon"
									className="bg-[#1D2538]/60 text-[#97CBDC] cursor-pointer hover:bg-[#1D2538] hover:text-white h-9 w-9 rounded-lg"
									onClick={handleRefresh}
								>
									<RefreshCw className="h-4 w-4" />
								</Button>

								<Popover
									open={showAdvancedOptions}
									onOpenChange={setShowAdvancedOptions}
								>
									<PopoverTrigger asChild>
										<Button
											variant="ghost"
											size="sm"
											className="bg-[#1D2538]/60 cursor-pointer text-[#97CBDC] hover:bg-[#1D2538] hover:text-white h-9 rounded-lg flex items-center gap-1"
										>
											Indicators
											<ChevronDown className="h-4 w-4" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-48 p-2 bg-[#1D2538] border-[#475B74]">
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-[#97CBDC] text-sm">
													Moving Average (20)
												</span>
												<button
													className={cn(
														"w-8 h-4 rounded-full relative cursor-pointer",
														indicators.ma ? "bg-[#018ABD]" : "bg-[#475B74]/50"
													)}
													onClick={() => toggleIndicator("ma")}
												>
													<span
														className={cn(
															"absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform",
															indicators.ma ? "translate-x-4" : "translate-x-0"
														)}
													></span>
												</button>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-[#97CBDC] text-sm">EMA (20)</span>
												<button
													className={cn(
														"w-8 h-4 rounded-full relative cursor-pointer",
														indicators.ema ? "bg-[#018ABD]" : "bg-[#475B74]/50"
													)}
													onClick={() => toggleIndicator("ema")}
												>
													<span
														className={cn(
															"absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform",
															indicators.ema ? "translate-x-4" : "translate-x-0"
														)}
													></span>
												</button>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-[#97CBDC] text-sm">RSI (14)</span>
												<button
													className={cn(
														"w-8 h-4 rounded-full relative cursor-pointer",
														indicators.rsi ? "bg-[#018ABD]" : "bg-[#475B74]/50"
													)}
													onClick={() => toggleIndicator("rsi")}
												>
													<span
														className={cn(
															"absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform",
															indicators.rsi ? "translate-x-4" : "translate-x-0"
														)}
													></span>
												</button>
											</div>
										</div>
									</PopoverContent>
								</Popover>

								<Button
									variant="ghost"
									size="icon"
									className="bg-[#1D2538]/60 cursor-pointer text-[#97CBDC] hover:bg-[#1D2538] hover:text-white h-9 w-9 rounded-lg"
									onClick={toggleFullscreen}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										{isFullscreen ? (
											<>
												<path d="M8 3v4a1 1 0 0 1-1 1H3" />
												<path d="M21 8h-4a1 1 0 0 1-1-1V3" />
												<path d="M3 16h4a1 1 0 0 1 1 1v4" />
												<path d="M16 21v-4a1 1 0 0 1 1-1h4" />
											</>
										) : (
											<>
												<path d="M8 3H5a2 2 0 0 0-2 2v3" />
												<path d="M21 8V5a2 2 0 0 0-2-2h-3" />
												<path d="M3 16v3a2 2 0 0 0 2 2h3" />
												<path d="M16 21h3a2 2 0 0 0 2-2v-3" />
											</>
										)}
									</svg>
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Chart Content */}
				<div
					className={cn(
						"relative",
						isFullscreen ? "h-[calc(100vh-120px)]" : "h-[400px]"
					)}
				>
					{error ? (
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="flex flex-col items-center text-center p-6">
								<div className="bg-[#1D2538]/60 p-3 rounded-full mb-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#f87171"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle cx="12" cy="12" r="10" />
										<line x1="12" y1="8" x2="12" y2="12" />
										<line x1="12" y1="16" x2="12.01" y2="16" />
									</svg>
								</div>
								<h3 className="text-lg font-medium text-white mb-1">
									Failed to load chart
								</h3>
								<p className="text-[#97CBDC] mb-4">{error}</p>
								<Button
									variant="outline"
									className="bg-[#1D2538]/60 border-[#475B74] text-white hover:bg-[#1D2538] hover:text-white"
									onClick={handleRefresh}
								>
									<RefreshCw className="h-4 w-4 mr-2" />
									Try Again
								</Button>
							</div>
						</div>
					) : (
						<canvas ref={chartRef} className="w-full h-full"></canvas>
					)}
				</div>

				{/* Chart Footer */}
				<div className="p-4 border-t border-[#475B74]/50 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Clock className="h-4 w-4 text-[#97CBDC]" />
						<span className="text-[#97CBDC] text-sm">
							Last updated: {format(new Date(), "PPp")}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Calendar className="h-4 w-4 text-[#97CBDC]" />
						<span className="text-[#97CBDC] text-sm">
							{format(chartData[0]?.time || new Date(), "PP")} -{" "}
							{format(
								chartData[chartData.length - 1]?.time || new Date(),
								"PP"
							)}
						</span>
					</div>
				</div>
			</div>

			{/* Trading Interface */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Buy/Sell Panel */}
				<div className="bg-gradient-to-r from-[#1D2538]/90 to-[#1D2538] rounded-2xl overflow-hidden border border-[#475B74]/50 shadow-xl backdrop-blur-sm">
					<Tabs
						defaultValue="buy"
						value={tradeTab}
						onValueChange={setTradeTab}
						className="w-full"
					>
						<TabsList className="w-full grid grid-cols-2 bg-transparent p-0 h-auto">
							<TabsTrigger
								value="buy"
								className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004581] data-[state=active]:to-[#018ABD] data-[state=active]:text-white data-[state=active]:shadow-none bg-transparent text-[#97CBDC] hover:text-white rounded-none py-4 border-b-2 border-transparent data-[state=active]:border-[#018ABD]"
							>
								BUY
							</TabsTrigger>
							<TabsTrigger
								value="sell"
								className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ef4444] data-[state=active]:to-[#f87171] data-[state=active]:text-white data-[state=active]:shadow-none bg-transparent text-[#97CBDC] hover:text-white rounded-none py-4 border-b-2 border-transparent data-[state=active]:border-[#f87171]"
							>
								SELL
							</TabsTrigger>
						</TabsList>

						<div className="p-6">
							<div className="space-y-6">
								<div className="flex items-center justify-between">
									<span className="text-[#97CBDC] text-sm">MAX SLIPPAGE</span>
									<div className="relative">
										<button className="flex cursor-pointer items-center gap-1 bg-[#1D2538]/60 text-white px-3 py-1 rounded-lg hover:bg-[#1D2538]">
											{slippage}%
											<ChevronDown className="h-4 w-4 text-[#97CBDC]" />
										</button>
									</div>
								</div>

								<div className="space-y-2">
									<div className="relative">
										<Input
											type="text"
											value={amount}
											onChange={handleAmountChange}
											className="bg-[#1D2538]/60 border-[#475B74] text-white h-14 rounded-xl focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD] pr-20 text-lg"
											placeholder="0"
										/>
										<div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
											<span className="text-white font-medium">
												{tradeTab === "buy" ? chainSymbol : initialData?.poolInfo?.symbol}
											</span>
										</div>
									</div>

									<div className="flex items-center justify-between gap-2">
										<button
											className="bg-[#1D2538]/60 cursor-pointer text-[#97CBDC] hover:bg-[#1D2538] hover:text-white px-3 py-1 rounded-md text-sm flex-1"
											onClick={() => handlePercentageClick("25")}
										>
											25%
										</button>
										<button
											className="bg-[#1D2538]/60 cursor-pointer text-[#97CBDC] hover:bg-[#1D2538] hover:text-white px-3 py-1 rounded-md text-sm flex-1"
											onClick={() => handlePercentageClick("50")}
										>
											50%
										</button>
										<button
											className="bg-[#1D2538]/60 cursor-pointer text-[#97CBDC] hover:bg-[#1D2538] hover:text-white px-3 py-1 rounded-md text-sm flex-1"
											onClick={() => handlePercentageClick("75")}
										>
											75%
										</button>
										<button
											className="bg-[#1D2538]/60 text-[#97CBDC] hover:bg-[#1D2538] hover:text-white px-3 py-1 rounded-md text-sm flex-1"
											onClick={() => handlePercentageClick("MAX")}
										>
											MAX
										</button>
										<button
											className="bg-[#1D2538]/60 cursor-pointer text-[#018ABD] hover:bg-[#1D2538] hover:text-[#018ABD] px-3 py-1 rounded-md text-sm"
											onClick={handleReset}
										>
											RESET
										</button>
									</div>
								</div>

								<div className="flex items-center justify-between text-sm">
									<span className="text-[#97CBDC]">Balance:</span>
									<span className="text-white">
										{tradeTab === "sell"
											? `${tokenBalance} ${
													initialData?.poolInfo?.symbol || "ZTR"
											  }`
											: `${nativeBalance || 0} ${
													account?.chain?.nativeCurrency?.symbol || "PTT"
											  }`}
									</span>
								</div>

								<Button
									onClick={handlePlaceOrder}
									className={cn(
										"w-full h-14 cursor-pointer rounded-xl shadow-lg transition-all duration-200 font-medium text-lg",
										tradeTab === "buy"
											? "bg-gradient-to-r from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white shadow-[#004581]/20"
											: "bg-gradient-to-r from-[#ef4444] to-[#f87171] hover:from-[#dc2626] hover:to-[#ef4444] text-white shadow-[#ef4444]/20"
									)}
								>
									PLACE ORDER
								</Button>
							</div>
						</div>
					</Tabs>
				</div>

				{/* Transactions/Holders Panel */}
				<div className="bg-gradient-to-r from-[#1D2538]/90 to-[#1D2538] rounded-2xl overflow-hidden border border-[#475B74]/50 shadow-xl backdrop-blur-sm">
					<Tabs
						defaultValue="holders"
						value={transactionTab}
						onValueChange={setTransactionTab}
						className="w-full"
					>
						<TabsList className="w-full grid grid-cols-2 bg-transparent p-0 h-auto">
							<TabsTrigger
								value="holders"
								className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004581] data-[state=active]:to-[#018ABD] data-[state=active]:text-white data-[state=active]:shadow-none bg-transparent text-[#97CBDC] hover:text-white rounded-none py-4 border-b-2 border-transparent data-[state=active]:border-[#018ABD]"
							>
								Holders
							</TabsTrigger>
							<TabsTrigger
								value="transaction"
								className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004581] data-[state=active]:to-[#018ABD] data-[state=active]:text-white data-[state=active]:shadow-none bg-transparent text-[#97CBDC] hover:text-white rounded-none py-4 border-b-2 border-transparent data-[state=active]:border-[#018ABD]"
							>
								Transaction
							</TabsTrigger>
						</TabsList>

						<TabsContent value="holders" className="p-6">
							{transactionsData.length > 0 ? (
								<div className="space-y-3">
									{transactionsData.map((tx, index) => (
										<div
											key={index}
											className="bg-[#1D2538]/60 border border-[#475B74]/50 rounded-xl p-4 hover:bg-[#1D2538]/80 transition-colors"
										>
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<button
														onClick={() => copyToClipboard(tx.address)}
														className="text-[#97CBDC] hover:text-white transition-colors flex items-center"
														title="Click to copy full address"
													>
														{tx.displayAddress || tx.address}
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-3.5 w-3.5 ml-1 opacity-70"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
															/>
														</svg>
													</button>
													{tx.tag && (
														<span className="bg-[#018ABD]/20 text-[#018ABD] px-2 py-0.5 rounded text-xs font-medium">
															{tx.tag}
														</span>
													)}
												</div>
												<span className="text-white font-medium">
													{tx.percentage}
												</span>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="flex flex-col items-center justify-center py-10 text-center">
									<div className="bg-[#1D2538]/60 p-3 rounded-full mb-3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="#97CBDC"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
											<circle cx="9" cy="7" r="4"></circle>
											<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
											<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
										</svg>
									</div>
									<h3 className="text-lg font-medium text-white mb-1">
										No Holders Found
									</h3>
									<p className="text-[#97CBDC] max-w-xs">
										There are currently no holders for this token.
									</p>
								</div>
							)}
						</TabsContent>

						<TabsContent value="transaction" className="p-6">
							{transactionsData.length > 0 ? (
								<div className="space-y-3">
									{transactionsData.map((tx, index) => (
										<div
											key={index}
											className="bg-[#1D2538]/60 border border-[#475B74]/50 rounded-xl p-4 hover:bg-[#1D2538]/80 transition-colors"
										>
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<button
														onClick={() => copyToClipboard(tx.address)}
														className="text-[#97CBDC] hover:text-white transition-colors flex items-center"
														title="Click to copy full address"
													>
														{tx.displayAddress || tx.address}
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-3.5 w-3.5 ml-1 opacity-70"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
															/>
														</svg>
													</button>
													<span
														className={cn(
															"px-2 py-0.5 rounded text-xs font-medium",
															tx.type === "Buy"
																? "bg-[#4ade80]/20 text-[#4ade80]"
																: "bg-[#f87171]/20 text-[#f87171]"
														)}
													>
														{tx.type}
													</span>
												</div>
												<span className="text-white font-medium">
													{tx.amount} {chainSymbol}
												</span>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="flex flex-col items-center justify-center py-10 text-center">
									<div className="bg-[#1D2538]/60 p-3 rounded-full mb-3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="#97CBDC"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
											<path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
										</svg>
									</div>
									<h3 className="text-lg font-medium text-white mb-1">
										No Transactions Found
									</h3>
									<p className="text-[#97CBDC] max-w-xs">
										There are currently no transactions for this token.
									</p>
								</div>
							)}
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
