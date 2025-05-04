import { useState, useRef, useCallback } from "react";
import { AlertCircle, Upload, Info, Check, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
// import { useCreateToken } from "@/hooks/use-contract";
import { cn } from "@/lib/utils";
import LaunchHeader from "./Header";
import { useAccount } from "wagmi";
import ConnectWallet from "../../components/ui/ConnectButton";
import axios from "axios";
import usePoolFactoryContract from "@/hooks/usePoolFactoryContract";
import { parseEther } from "ethers";
import { toast } from "react-toastify";

export default function Bonding() {
	const { isConnected } = useAccount();
	const account = useAccount();
	const [formState, setFormState] = useState({
		name: "",
		symbol: "",
		logoImage: null,
		bannerImage: null,
		website: "",
		addSocials: false,
		twitter: "",
		discord: "",
		telegram: "",
		youtube: "",
		description: "",
	});
	// const [txnHash, setTxnHash] = useState("")
	const [errors, setErrors] = useState({});
	const [activeSection, setActiveSection] = useState("basic"); // basic, socials, description
	const [hoveredField, setHoveredField] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const logoInputRef = useRef(null);
	const bannerInputRef = useRef(null);
	const poolFactoryContract = usePoolFactoryContract(true);

	const [isUploadingLogo, setIsUploadingLogo] = useState(false);
	const [isUploadingBanner, setIsUploadingBanner] = useState(false);
	const [url, setUrl] = useState("");
	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	function uploadSingleImage(name, base64) {
		name == "logoImage" ? setIsUploadingLogo(true) : setIsUploadingBanner(true);
		axios
			.post(`${import.meta.env.VITE_SERVER_URL}/uploadImage`, { image: base64 })
			.then((res) => {
				setUrl(res.data);
				setFormState((prev) => ({ ...prev, [name]: res.data }));
				setErrors((prev) => {
					const newErrors = { ...prev };
					delete newErrors[name];
					return newErrors;
				});
				console.log("Uploaded image", res.data);
				// alert("Image uploaded Succesfully");
			})
			.then(() =>
				name == "logoImage"
					? setIsUploadingLogo(false)
					: setIsUploadingBanner(false)
			)
			.catch(console.log);
	}

	// ########################################################################

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormState((prev) => {
			const newState = { ...prev, [name]: value };
			validateField(name, value);
			return newState;
		});
	};

	const handleFileChange = async (e) => {
		const { name, files } = e.target;
		try {
			if (files && files[0]) {
				const file = files[0];
				// Check file size (max 2MB)
				if (file.size > 2 * 1024 * 1024) {
					setErrors((prev) => ({
						...prev,
						[name]: "File size must be less than 2MB",
					}));
					return;
				}

				if (files.length === 1) {
					const base64 = await convertBase64(files[0]);
					uploadSingleImage(name, base64);
					return;
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleCheckboxChange = (checked) => {
		setFormState((prev) => ({ ...prev, addSocials: checked }));
		if (checked) {
			setActiveSection("socials");
		} else {
			setActiveSection("basic");
		}
	};

	const validateField = (name, value) => {
		setErrors((prev) => {
			const newErrors = { ...prev };

			switch (name) {
				case "name":
					if (!value) newErrors.name = "Name is required";
					else delete newErrors.name;
					break;
				case "symbol":
					if (!value) newErrors.symbol = "Symbol is required";
					else delete newErrors.symbol;
					break;
				case "website":
					if (!value) newErrors.website = "Website is required";
					else if (!/^https?:\/\/.+/.test(value)) {
						newErrors.website = "Website must start with http:// or https://";
					} else delete newErrors.website;
					break;
				default:
					break;
			}

			return newErrors;
		});
	};

	const validateForm = useCallback(() => {
		const newErrors = {};

		if (!formState.name) newErrors.name = "Name is required";
		if (!formState.symbol) newErrors.symbol = "Symbol is required";
		if (!formState.logoImage) newErrors.logoImage = "Logo image is required";
		if (!formState.bannerImage)
			newErrors.bannerImage = "Banner image is required";
		if (!formState.website) {
			newErrors.website = "Website is required";
		} else if (!/^https?:\/\/.+/.test(formState.website)) {
			newErrors.website = "Website must start with http:// or https://";
		}

		// Validate logo and banner if uploaded
		if (formState.logoImage && formState.logoImage.size > 2 * 1024 * 1024) {
			newErrors.logoImage = "Logo image must be less than 2MB";
		}

		if (formState.bannerImage && formState.bannerImage.size > 2 * 1024 * 1024) {
			newErrors.bannerImage = "Banner image must be less than 2MB";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formState]);

	const handleSubmit = async (e) => {
		setIsSubmitting(true);

		console.log("RUNNING");
		e.preventDefault();

		if (!isConnected) {
			alert("Please connect your wallet first");
			return;
		}

		try {
			if (validateForm()) {
				// Prepare data for contract interaction
				const tokenData = {
					name: formState.name,
					symbol: formState.symbol,
					website: formState.website,
					logo: formState.logoImage,
					banner: formState.bannerImage,
					description: formState.description,
					socials: formState.addSocials
						? {
								twitter: formState.twitter,
								discord: formState.discord,
								telegram: formState.telegram,
								youtube: formState.youtube,
						  }
						: null,
				};
				const tokenInfo = [tokenData.name, tokenData.symbol];
				const preparedTokendata = [
					tokenData.logo,
					tokenData.banner,
					tokenData.website,
					tokenData.description,
					tokenData.socials?.twitter || "",
					tokenData.socials?.discord || "",
					tokenData.socials?.telegram || "",
					tokenData.socials?.youtube || "",
				];
				const encodedPoolDetails = preparedTokendata.join("$#$");
				console.log(encodedPoolDetails);
				console.log({ poolFactoryContract });

				const response = await poolFactoryContract.createBondingToken(
					account.address,
					encodedPoolDetails,
					tokenInfo,
					{ value: parseEther("0.15"), gasLimit: BigInt(3_000_000) }
				);
				const receipt = await response.wait();
				console.log(receipt);
				toast.success("Bonding token created successfully");
			}
		} catch (error) {
			console.error("Error creating Bonding sale:", error);
			setError(error.message || "Failed to create Bonding sale");
			toast.error("Failed to create Bonding sale");
			setIsSubmitting(false);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleNextSection = () => {
		if (validateForm()) {
			setActiveSection("description");
		}
	};

	const sections = [
		{ id: "basic", label: "Basic Info" },
		{ id: "socials", label: "Social Media", disabled: !formState.addSocials },
		{ id: "description", label: "Description" },
	];

	return (
		<div className="min-h-screen overflow-x-hidden text-white p-4 md:p-8">
			<div className="max-w-4xl mx-auto">
				<LaunchHeader />

				<form onSubmit={handleSubmit} className="mt-8">
					<motion.div
						className="bg-gradient-to-b from-[#1D2538]/90 to-[#1D2538] backdrop-blur-sm border border-[#475B74]/50 rounded-3xl shadow-xl overflow-hidden"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						{/* Section Tabs */}
						<div className="flex border-b border-[#475B74]/50 overflow-x-auto">
							{sections.map((section) => (
								<motion.button
									key={section.id}
									type="button"
									disabled={section.disabled}
									onClick={() =>
										!section.disabled && setActiveSection(section.id)
									}
									className={cn(
										"px-4 md:px-6 py-4 text-sm cursor-pointer font-medium transition-all relative flex-1 md:flex-none",
										activeSection === section.id
											? "text-[#018ABD]"
											: "text-[#97CBDC] hover:text-white",
										section.disabled && "opacity-50 cursor-not-allowed"
									)}
									whileHover={!section.disabled ? { scale: 1.05 } : {}}
									whileTap={!section.disabled ? { scale: 0.95 } : {}}
								>
									{section.label}
									{activeSection === section.id && (
										<motion.div
											className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#018ABD]"
											layoutId="activeTab"
										/>
									)}
								</motion.button>
							))}
						</div>

						<div className="p-4 md:p-8">
							<AnimatePresence mode="wait">
								{activeSection === "basic" && (
									<motion.div
										key="basic"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 20 }}
										transition={{ duration: 0.3 }}
										className="space-y-8"
									>
										{/* Basic Information */}
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<div className="flex items-center justify-between mb-2">
													<label className="block text-sm font-medium text-[#97CBDC]">
														Name<span className="text-red-500">*</span>
													</label>
													{errors.name && (
														<span className="text-xs text-red-400 flex items-center">
															<AlertCircle className="h-3 w-3 mr-1" />
															{errors.name}
														</span>
													)}
												</div>
												<motion.div
													className="relative"
													onMouseEnter={() => setHoveredField("name")}
													onMouseLeave={() => setHoveredField(null)}
												>
													<AnimatePresence>
														{hoveredField === "name" && (
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
														name="name"
														value={formState.name}
														onChange={handleInputChange}
														placeholder="Eg: Degen Coin"
														className={cn(
															"bg-[#0a0a20]/80 border-[#475B74] rounded-xl placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200 relative z-10",
															errors.name &&
																"border-red-500 focus:border-red-500"
														)}
													/>
												</motion.div>
											</div>
											<div>
												<div className="flex items-center justify-between mb-2">
													<label className="block text-sm font-medium text-[#97CBDC]">
														Symbol<span className="text-red-500">*</span>
													</label>
													{errors.symbol && (
														<span className="text-xs text-red-400 flex items-center">
															<AlertCircle className="h-3 w-3 mr-1" />
															{errors.symbol}
														</span>
													)}
												</div>
												<motion.div
													className="relative"
													onMouseEnter={() => setHoveredField("symbol")}
													onMouseLeave={() => setHoveredField(null)}
												>
													<AnimatePresence>
														{hoveredField === "symbol" && (
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
														name="symbol"
														value={formState.symbol}
														onChange={handleInputChange}
														placeholder="Eg: DGN"
														className={cn(
															"bg-[#0a0a20]/80 border-[#475B74] rounded-xl placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200 relative z-10",
															errors.symbol &&
																"border-red-500 focus:border-red-500"
														)}
													/>
												</motion.div>
											</div>
										</div>

										{/* Logo and Banner Images */}
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<div className="flex items-center justify-between mb-2">
													<div className="flex items-center">
														<label className="block text-sm font-medium text-[#97CBDC] mr-1">
															Logo Image<span className="text-red-500">*</span>
														</label>
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger>
																	<Info className="h-4 w-4 text-[#97CBDC]" />
																</TooltipTrigger>
																<TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
																	<p className="text-xs max-w-xs">
																		Recommended size: 200x200px
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													{errors.logoImage && (
														<span className="text-xs text-red-400 flex items-center">
															<AlertCircle className="h-3 w-3 mr-1" />
															{errors.logoImage}
														</span>
													)}
												</div>
												<motion.div
													className={cn(
														"bg-[#0a0a20]/80 border-2 border-dashed border-[#475B74] rounded-xl h-24 flex items-center justify-center cursor-pointer overflow-hidden",
														formState.logoImage &&
															"border-solid border-[#018ABD]"
													)}
													whileHover={{ scale: 1.02, borderColor: "#018ABD" }}
													whileTap={{ scale: 0.98 }}
													onClick={() => logoInputRef.current.click()}
												>
													{formState.logoImage ? (
														<div className="relative w-full h-full">
															<img
																src={formState.logoImage || "/placeholder.svg"}
																alt="Logo preview"
																className="w-full h-full object-contain p-2"
															/>
															<motion.button
																className="absolute cursor-pointer top-1 right-1 bg-red-500/80 text-white rounded-full p-1"
																onClick={(e) => {
																	e.stopPropagation();
																	setFormState((prev) => ({
																		...prev,
																		logoImage: null,
																	}));
																}}
																whileHover={{ scale: 1.1 }}
																whileTap={{ scale: 0.9 }}
															>
																<X className="h-3 w-3" />
															</motion.button>
														</div>
													) : (
														<div className="text-center p-6 rounded-md">
															{isUploadingLogo ? (
																<div className="flex flex-col items-center">
																	<Loader2 className="h-6 w-6 text-[#97CBDC] mx-auto mb-1 animate-spin" />
																	<span className="text-sm text-[#97CBDC]">
																		Uploading...
																	</span>
																</div>
															) : (
																<div className="text-center">
																	<Upload className="h-6 w-6 text-[#97CBDC] mx-auto mb-1" />
																	<span className="text-sm text-[#97CBDC]">
																		Upload Logo
																	</span>
																</div>
															)}
														</div>
													)}
													<input
														ref={logoInputRef}
														type="file"
														name="logoImage"
														onChange={handleFileChange}
														accept="image/*"
														className="hidden"
													/>
												</motion.div>
											</div>
											<div>
												<div className="flex items-center justify-between mb-2">
													<div className="flex items-center">
														<label className="block text-sm font-medium text-[#97CBDC] mr-1">
															Banner Image
															<span className="text-red-500">*</span>
														</label>
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger>
																	<Info className="h-4 w-4 text-[#97CBDC]" />
																</TooltipTrigger>
																<TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
																	<p className="text-xs max-w-xs">
																		Recommended size: 1200x400px
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													{errors.bannerImage && (
														<span className="text-xs text-red-400 flex items-center">
															<AlertCircle className="h-3 w-3 mr-1" />
															{errors.bannerImage}
														</span>
													)}
												</div>
												<motion.div
													className={cn(
														"bg-[#0a0a20]/80 border-2 border-dashed border-[#475B74] rounded-xl h-24 flex items-center justify-center cursor-pointer overflow-hidden",
														formState.bannerImage &&
															"border-solid border-[#018ABD]"
													)}
													whileHover={{ scale: 1.02, borderColor: "#018ABD" }}
													whileTap={{ scale: 0.98 }}
													onClick={() => bannerInputRef.current.click()}
												>
													{formState.bannerImage ? (
														<div className="relative w-full h-full">
															<img
																src={
																	formState.bannerImage || "/placeholder.svg"
																}
																alt="Banner preview"
																className="w-full h-full object-cover"
															/>
															<motion.button
																className="absolute cursor-pointer top-1 right-1 bg-red-500/80 text-white rounded-full p-1"
																onClick={(e) => {
																	e.stopPropagation();
																	setFormState((prev) => ({
																		...prev,
																		bannerImage: null,
																	}));
																}}
																whileHover={{ scale: 1.1 }}
																whileTap={{ scale: 0.9 }}
															>
																<X className="h-3 w-3" />
															</motion.button>
														</div>
													) : (
														<div className="text-center p-6 rounded-md">
															{isUploadingBanner ? (
																<div className="flex flex-col items-center">
																	<Loader2 className="h-6 w-6 text-[#97CBDC] mx-auto mb-1 animate-spin" />
																	<span className="text-sm text-[#97CBDC]">
																		Uploading...
																	</span>
																</div>
															) : (
																<div className="text-center">
																	<Upload className="h-6 w-6 text-[#97CBDC] mx-auto mb-1" />
																	<span className="text-sm text-[#97CBDC]">
																		Upload Banner
																	</span>
																</div>
															)}
														</div>
													)}
													<input
														ref={bannerInputRef}
														type="file"
														name="bannerImage"
														onChange={handleFileChange}
														accept="image/*"
														className="hidden"
													/>
												</motion.div>
											</div>
										</div>

										{/* Website */}
										<div>
											<div className="flex items-center justify-between mb-2">
												<label className="block text-sm font-medium text-[#97CBDC]">
													Website<span className="text-red-500">*</span>
												</label>
												{errors.website && (
													<span className="text-xs text-red-400 flex items-center">
														<AlertCircle className="h-3 w-3 mr-1" />
														{errors.website}
													</span>
												)}
											</div>
											<motion.div
												className="relative"
												onMouseEnter={() => setHoveredField("website")}
												onMouseLeave={() => setHoveredField(null)}
											>
												<AnimatePresence>
													{hoveredField === "website" && (
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
													name="website"
													value={formState.website}
													onChange={handleInputChange}
													placeholder="e.g. https://example.com"
													className={cn(
														"bg-[#0a0a20]/80 border-[#475B74] rounded-xl placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200 relative z-10",
														errors.website &&
															"border-red-500 focus:border-red-500"
													)}
												/>
											</motion.div>
										</div>

										{/* Add Socials Checkbox */}
										<div className="flex items-center space-x-2">
											<Checkbox
												id="addSocials"
												checked={formState.addSocials}
												onCheckedChange={handleCheckboxChange}
												className="data-[state=checked]:bg-[#018ABD] cursor-pointer data-[state=checked]:border-[#018ABD]"
											/>
											<label
												htmlFor="addSocials"
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#97CBDC]"
											>
												Add Social Media Links
											</label>
										</div>

										<div className="flex justify-between pt-4">
											<div></div>
											<motion.button
												type="button"
												onClick={handleNextSection}
												className="flex items-center cursor-pointer text-[#018ABD] hover:text-white transition-colors"
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												Next: Description
												<Check className="ml-2 h-4 w-4" />
											</motion.button>
										</div>
									</motion.div>
								)}

								{activeSection === "socials" && (
									<motion.div
										key="socials"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 20 }}
										transition={{ duration: 0.3 }}
										className="space-y-8"
									>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<div className="flex items-center justify-between mb-2">
													<label className="block text-sm font-medium text-[#97CBDC]">
														X/Twitter
													</label>
												</div>
												<motion.div
													className="relative"
													onMouseEnter={() => setHoveredField("twitter")}
													onMouseLeave={() => setHoveredField(null)}
												>
													<AnimatePresence>
														{hoveredField === "twitter" && (
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
														name="twitter"
														value={formState.twitter}
														onChange={handleInputChange}
														placeholder="e.g. https://twitter.com/"
														className="bg-[#0a0a20]/80 border-[#475B74] rounded-xl placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200 relative z-10"
													/>
												</motion.div>
											</div>
											<div>
												<div className="flex items-center justify-between mb-2">
													<label className="block text-sm font-medium text-[#97CBDC]">
														Telegram
													</label>
												</div>
												<motion.div
													className="relative"
													onMouseEnter={() => setHoveredField("telegram")}
													onMouseLeave={() => setHoveredField(null)}
												>
													<AnimatePresence>
														{hoveredField === "telegram" && (
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
														name="telegram"
														value={formState.telegram}
														onChange={handleInputChange}
														placeholder="e.g. https://t.me/zentra"
														className="bg-[#0a0a20]/80 border-[#475B74] rounded-xl placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200 relative z-10"
													/>
												</motion.div>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<div className="flex items-center justify-between mb-2">
													<label className="block text-sm font-medium text-[#97CBDC]">
														Discord
													</label>
												</div>
												<motion.div
													className="relative"
													onMouseEnter={() => setHoveredField("discord")}
													onMouseLeave={() => setHoveredField(null)}
												>
													<AnimatePresence>
														{hoveredField === "discord" && (
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
														name="discord"
														value={formState.discord}
														onChange={handleInputChange}
														placeholder="e.g. https://discord.com/"
														className="bg-[#0a0a20]/80 border-[#475B74] rounded-xl placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200 relative z-10"
													/>
												</motion.div>
											</div>
											<div>
												<div className="flex items-center justify-between mb-2">
													<label className="block text-sm font-medium text-[#97CBDC]">
														Youtube Video
													</label>
												</div>
												<motion.div
													className="relative"
													onMouseEnter={() => setHoveredField("youtube")}
													onMouseLeave={() => setHoveredField(null)}
												>
													<AnimatePresence>
														{hoveredField === "youtube" && (
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
														name="youtube"
														value={formState.youtube}
														onChange={handleInputChange}
														placeholder="e.g. https://youtube.com/watch"
														className="bg-[#0a0a20]/80 border-[#475B74] rounded-xl placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200 relative z-10"
													/>
												</motion.div>
											</div>
										</div>

										<div className="flex justify-between pt-4">
											<motion.button
												type="button"
												onClick={() => setActiveSection("basic")}
												className="flex items-center cursor-pointer text-[#97CBDC] hover:text-white transition-colors"
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												Back
											</motion.button>
											<motion.button
												type="button"
												onClick={() => setActiveSection("description")}
												className="flex items-center cursor-pointer text-[#018ABD] hover:text-white transition-colors"
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												Next: Description
												<Check className="ml-2 h-4 w-4" />
											</motion.button>
										</div>
									</motion.div>
								)}

								{activeSection === "description" && (
									<motion.div
										key="description"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 20 }}
										transition={{ duration: 0.3 }}
										className="space-y-8"
									>
										<div>
											<div className="flex items-center justify-between mb-2">
												<label className="block text-sm font-medium text-[#97CBDC]">
													Description
												</label>
											</div>
											<motion.div
												className="relative"
												onMouseEnter={() => setHoveredField("description")}
												onMouseLeave={() => setHoveredField(null)}
											>
												<AnimatePresence>
													{hoveredField === "description" && (
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
												<textarea
													name="description"
													value={formState.description}
													onChange={handleInputChange}
													placeholder="Eg: The new Degenerate meme coin. Etc.."
													rows={5}
													required
													className="w-full bg-[#0a0a20]/80 border border-[#475B74] rounded-xl placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200 p-3 text-white relative z-10"
												/>
											</motion.div>
										</div>

										{/* Transaction Status */}
										{/* {tokenStatus !== "idle" && (
                      <div className="mb-4">
                        <TransactionStatus
                          status={tokenStatus}
                          txHash={contractAddress}
                          errorMessage={tokenError?.message}
                          onReset={resetTokenStatus}
                        />
                      </div>
                    )} */}

										{/* Total Cost and Submit Button */}
										<div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-[#475B74]/50">
											<motion.button
												type="button"
												onClick={() =>
													formState.addSocials
														? setActiveSection("socials")
														: setActiveSection("basic")
												}
												className="flex items-center cursor-pointer text-[#97CBDC] hover:text-white transition-colors mb-4 md:mb-0"
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												Back
											</motion.button>
											<div className="flex items-center mb-4 md:mb-0">
												<span className="text-[#97CBDC]">Total cost:</span>
												<span className="text-xl font-bold bg-gradient-to-r from-[#018ABD] to-[#97CBDC] bg-clip-text text-transparent ml-2">
													0.15 {account.chain.nativeCurrency.symbol}
												</span>
											</div>
											<Button
												type="submit"
												disabled={
													!isConnected
													// isCreatingToken ||
													// tokenStatus === "pending"
												}
												className="bg-gradient-to-r cursor-pointer from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl px-12 py-6 h-auto text-lg font-bold shadow-lg shadow-[#004581]/20 transition-all duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{
													// isCreatingToken ? (
													// <>
													//   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
													//   CREATING TOKEN...
													// </>
													// ) :
													!isConnected ? (
														<ConnectWallet />
													) : isSubmitting ? (
														"Creating token..."
													) : (
														"CREATE TOKEN"
													)
												}
											</Button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				</form>
			</div>
		</div>
	);
}
