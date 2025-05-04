import { useState, useEffect } from "react";
import { CoinsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Header from "./components/Header";
import TokenTypeSelector from "./components/TokenTypeSelector";
import BasicInfoForm from "./components/forms/BasicInfoForm";
import TaxSettingsForm from "./components/forms/TaxSettingsForm";
import AdvancedSettingsForm from "./components/forms/AdvancedSettingsForm";
import LiquidityRewardsForm from "./components/forms/LiquidityRewardsForm";
import FairLaunchBanner from "./components/FairLaunchBanner";
import SuccessModal from "./components/SuccessModal";
import { useAccount, useDeployContract, usePublicClient } from "wagmi";
import { parseEther } from "viem";
import {
	BASIC_TOKEN_ABI,
	BASIC_TOKEN_BYTECODE,
	TAX_TOKEN_ABI,
	TAX_TOKEN_BYTECODE,
	ADVANCED_TOKEN_ABI,
	ADVANCED_TOKEN_BYTECODE,
	ZENTRA_ROUTER_ADDRESS,
	ZENTRA_V3_ROUTER_ADDRESS,
} from "@/utils/AdvanceToken";
import { toast } from "react-toastify";
import { set } from "date-fns";

const initialFormState = {
	name: "",
	symbol: "",
	supply: "",
	decimals: "18",
	serviceFeeReceiver: "0x690C65EB2e2dd321ACe41a9865Aea3fAa98be2A5",
	serviceFee: "",
	buyTax: "0",
	sellTax: "0",
	taxReceiver: "",
	maxTransaction: "0",
	maxWallet: "0",
	buyBurnFee: "0",
	sellBurnFee: "0",
	dexRouter: "ZENTRA-v2",
	liquidityBuyFee: "0",
	liquiditySellFee: "0",
	rewardsToken: "project-token",
	buyRewards: "0",
	sellRewards: "0",
};

// Helper function to convert percentage to basis points for the contract (e.g. 5% -> 50000 for tax contract)
const toContractBasisPoints = (percentage) => {
	// Convert percentage to a value out of 1,000,000 (100% * 10^6)
	return Math.floor(parseFloat(percentage) * 10000);
};

export default function TokenCreator() {
	const account = useAccount();
	const { deployContract, deployContractAsync } = useDeployContract();
	const publicClient = usePublicClient();

	// State for token type and form data
	const [tokenType, setTokenType] = useState("basic");
	const [formState, setFormState] = useState(initialFormState);
	const [errors, setErrors] = useState({});
	const [isFormValid, setIsFormValid] = useState(true);
	const [isDeploying, setIsDeploying] = useState(false);

	// Transaction and modal state
	const [txHash, setTxHash] = useState("");
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [contractAddress, setContractAddress] = useState("");

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	// Handle select changes
	const handleSelectChange = (name, value) => {
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	// Effect to fetch contract address after transaction is confirmed
	useEffect(() => {
		const getContractAddress = async () => {
			if (!txHash) return;

			try {
				// Wait for transaction to be mined
				const receipt = await publicClient.waitForTransactionReceipt({
					hash: txHash,
				});

				// Contract address will be in the receipt
				if (receipt.status === "success" && receipt.contractAddress) {
					setContractAddress(receipt.contractAddress);
					setShowSuccessModal(true);

					// Success toast
					toast.success(`Successfully deployed ${formState.symbol} Token`);
				} else {
					toast.error("Token creation failed");
				}
			} catch (error) {
				console.error("Error fetching contract address:", error);
				toast.error(`Error fetching contract address: ${error.message}`);
			} finally {
				setIsDeploying(false);
			}
		};

		if (txHash) {
			getContractAddress();
		}
	}, [txHash, publicClient, formState.symbol]);

	// Get cost based on token type
	const getCost = () => {
		switch (tokenType) {
			case "basic":
				return "0.002";
			case "tax":
				return "0.004";
			case "advanced":
				return "0.008";
			default:
				return "0.002";
		}
	};

	// Validate form
	// useEffect(() => {}, [formState, tokenType]);
	const validateForm = () => {
		const newErrors = {};

		// Basic validation
		if (!formState.name) newErrors.name = "Name is required";
		if (!formState.symbol) newErrors.symbol = "Symbol is required";
		if (!formState.supply) newErrors.supply = "Supply is required";
		if (!formState.decimals) newErrors.decimals = "Decimals is required";

		// Tax token validation
		if (tokenType === "tax" || tokenType === "advanced") {
			if (!formState.taxReceiver)
				newErrors.taxReceiver = "Tax receiver address is required";
		}

		setErrors(newErrors);
		setIsFormValid(Object.keys(newErrors).length === 0);
		return Object.keys(newErrors).length === 0;
	};

	// Get router address based on selected DEX
	const getRouterAddress = () => {
		switch (formState.dexRouter) {
			case "ZENTRA-v2":
				return ZENTRA_ROUTER_ADDRESS;
			case "ZENTRA-v3":
				return ZENTRA_V3_ROUTER_ADDRESS;
			default:
				return ZENTRA_ROUTER_ADDRESS;
		}
	};

	// Get DEX type based on selected DEX
	const getDexType = () => {
		switch (formState.dexRouter) {
			case "ZENTRA-v2":
				return 2; // v2
			case "ZENTRA-v3":
				return 3; // v3
			default:
				return 2;
		}
	};

	// Handle form submission
	const handleSubmit = async () => {
		if (!validateForm() || isDeploying) {
			setTimeout(() => {
        setErrors({});
        setIsFormValid(true);
      }, 3000);
			return;
		}

		setIsDeploying(true);

		// Show loading toast
		toast.info(`Deploying ${formState.symbol} Token`);

		try {
			// Common parameters
			const decimals = parseInt(formState.decimals);
			const totalSupply = parseEther(formState.supply);
			const serviceFee = parseEther(getCost());

			let hash;

			if (tokenType === "basic") {
				// Deploy basic token
				hash = await deployContractAsync({
					abi: BASIC_TOKEN_ABI,
					args: [formState.name, formState.symbol, decimals, totalSupply],
					bytecode: BASIC_TOKEN_BYTECODE,
					value: serviceFee,
				});
			} else if (tokenType === "tax") {
				// Convert tax percentages to basis points (e.g., 5% -> 50000)
				// Multiply by 10000 to match contract's expectation of values out of 1000000
				const buyTaxBasisPoints = toContractBasisPoints(formState.buyTax);
				const sellTaxBasisPoints = toContractBasisPoints(formState.sellTax);

				console.log("Deploying tax token with params:", {
					name: formState.name,
					symbol: formState.symbol,
					decimals,
					totalSupply: totalSupply.toString(),
					buyTax: buyTaxBasisPoints,
					sellTax: sellTaxBasisPoints,
					taxReceiver: formState.taxReceiver,
					router: ZENTRA_ROUTER_ADDRESS,
					value: serviceFee.toString(),
				});

				// Deploy tax token
				hash = await deployContractAsync({
					abi: TAX_TOKEN_ABI,
					args: [
						formState.name,
						formState.symbol,
						decimals,
						totalSupply,
						buyTaxBasisPoints,
						sellTaxBasisPoints,
						formState.taxReceiver,
						ZENTRA_ROUTER_ADDRESS,
						formState.serviceFeeReceiver,
						serviceFee,
					],
					bytecode: TAX_TOKEN_BYTECODE,
					value: serviceFee,
				});
			} else if (tokenType === "advanced") {
				// Prepare advanced token arguments structure
				const rewardTokenValue =
					formState.rewardsToken === "project-token"
						? 1 // project token
						: formState.rewardsToken === "ptt"
						? 2 // ptt
						: 1; // default to project token

				// Create max values properly or set to 0 if not provided
				const maxTransaction =
					formState.maxTransaction === "0"
						? "0"
						: parseEther(formState.maxTransaction).toString();

				const maxWallet =
					formState.maxWallet === "0"
						? "0"
						: parseEther(formState.maxWallet).toString();

				// Prepare the advanced token args object - THIS IS THE KEY CHANGE
				const advancedArgs = {
					name: formState.name,
					symbol: formState.symbol,
					_decimals: BigInt(decimals),
					_totalSupply: BigInt(totalSupply),
					_serviceFeeReceiver: formState.serviceFeeReceiver,
					_taxReceiver: formState.taxReceiver,
					maxTransaction: BigInt(maxTransaction),
					maxWallet: BigInt(maxWallet),
					buyFee: BigInt(toContractBasisPoints(formState.buyTax)),
					sellFee: BigInt(toContractBasisPoints(formState.sellTax)),
					dexType: BigInt(getDexType()),
					dexRouter: getRouterAddress(),
					rewardToken: BigInt(rewardTokenValue),
					buyReward: BigInt(toContractBasisPoints(formState.buyRewards)),
					sellReward: BigInt(toContractBasisPoints(formState.sellRewards)),
					lpBuyFee: BigInt(toContractBasisPoints(formState.liquidityBuyFee)),
					lpSellFee: BigInt(toContractBasisPoints(formState.liquiditySellFee)),
					buyBurnPercent: BigInt(toContractBasisPoints(formState.buyBurnFee)),
					sellBurnPercent: BigInt(toContractBasisPoints(formState.sellBurnFee)),
					serviceFee: BigInt(parseEther(getCost())),
				};

				console.log("Deploying advanced token with params:", advancedArgs);

				// Deploy advanced token - notice how we pass the actual Args struct
				hash = await deployContractAsync({
					abi: ADVANCED_TOKEN_ABI,
					args: [advancedArgs],
					bytecode: ADVANCED_TOKEN_BYTECODE,
					value: parseEther(getCost()),
          gasLimit: BigInt(5_000_000)
				});
			}

			console.log("Transaction hash:", hash);

			// Store transaction hash to fetch contract address later
			setTxHash(hash);

			// Update toast to show transaction is processing
			toast.info(`Transaction submitted! Waiting for confirmation...`);
		} catch (error) {
			console.error("Deployment failed:", error);
			toast.error(`Failed to deploy: ${error.message}`);
			setIsDeploying(false);
		}
	};

	// Close modal and reset form for new token creation
	const handleCloseModal = () => {
		setShowSuccessModal(false);
		// Optional: Reset form if you want to allow creating another token
		// setFormState(initialFormState);
		// setTxHash("");
		// setContractAddress("");
	};

	return (
		<div className="container mx-auto py-8 px-4">
			<Header />

			{/* Main Form */}
			<div className="bg-gradient-to-b from-[#1D2538]/90 to-[#1D2538] backdrop-blur-sm border border-[#475B74]/50 rounded-3xl shadow-2xl mb-8 overflow-hidden">
				<TokenTypeSelector tokenType={tokenType} setTokenType={setTokenType} />

				{/* Form Sections */}
				<div className="p-6 space-y-8">
					<BasicInfoForm
						formState={formState}
						handleInputChange={handleInputChange}
						errors={errors}
					/>

					{(tokenType === "tax" || tokenType === "advanced") && (
						<TaxSettingsForm
							formState={formState}
							handleInputChange={handleInputChange}
							errors={errors}
						/>
					)}

					{tokenType === "advanced" && (
						<>
							<AdvancedSettingsForm
								formState={formState}
								handleInputChange={handleInputChange}
							/>
							<LiquidityRewardsForm
								formState={formState}
								handleInputChange={handleInputChange}
								handleSelectChange={handleSelectChange}
							/>
						</>
					)}
				</div>

				{/* Cost and Create Button */}
				<div className="bg-gradient-to-r from-[#1D2538] to-[#1D2538] p-6 border-t border-[#475B74]/50 flex flex-col md:flex-row justify-between items-center">
					<div className="flex items-center gap-3 mb-4 md:mb-0">
						<div className="bg-[#018ABD]/20 p-2 rounded-lg">
							<CoinsIcon className="h-5 w-5 text-[#018ABD]" />
						</div>
						<div>
							<span className="text-[#97CBDC] text-sm">Total cost:</span>
							<span className="text-xl font-bold bg-gradient-to-r from-[#018ABD] to-[#97CBDC] bg-clip-text text-transparent ml-2">
								{getCost()}{" "}
								{account ? account?.chain?.nativeCurrency?.symbol : ""}
							</span>
						</div>
					</div>
					<Button
						onClick={handleSubmit}
						disabled={!isFormValid || isDeploying}
						className={cn(
							"px-12 py-6 h-auto cursor-pointer text-lg font-bold rounded-xl w-full md:w-auto transition-all duration-300 shadow-lg",
							isFormValid && !isDeploying
								? "bg-gradient-to-r from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white shadow-[#004581]/20 transform hover:scale-105"
								: "bg-[#475B74]/50 text-[#97CBDC] cursor-not-allowed"
						)}
					>
						{isDeploying ? "DEPLOYING..." : "CREATE TOKEN"}
					</Button>
				</div>
			</div>

			<FairLaunchBanner />

			{/* Success Modal */}
			<SuccessModal
				contractAddress={contractAddress}
				tokenName={formState.name}
				tokenSymbol={formState.symbol}
				tokenDecimals={parseInt(formState.decimals)}
				txHash={txHash}
				isOpen={showSuccessModal}
				onClose={handleCloseModal}
			/>
		</div>
	);
}
