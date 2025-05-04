"use client";

import { useState, useEffect } from "react";
import {
	Search,
	Grid3x3Icon as Grid3,
	List,
	Flame,
	SlidersHorizontal,
	ArrowDownAZ,
	ArrowUpAZ,
	TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LaunchCard } from "./components/LaunchCard";
import { LaunchListItem } from "./components/LaunchListItem";
import { LoadingCard } from "./components/LoadingCard";
import { LoadingListItem } from "./components/LoadingListItem";
import { EmptyState } from "./components/EmptyState";
import { PumpSaleCard } from "./components/PumpSaleCard";
import { PumpSaleListItem } from "./components/PumpSaleListItem";
import { AnimatePresence, motion } from "framer-motion";
// import { fairLaunchData, pumpSalesData } from "@/lib/fairLaunchData";
import { FilterDropdown } from "./components/FilterDropdown";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useLaunchPads } from "@/context/launchPadContext";

export default function Index() {
	const [launches, setLaunches] = useState([]);
	const [filteredLaunches, setFilteredLaunches] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilter, setActiveFilter] = useState("ALL");
	const [viewMode, setViewMode] = useState("grid");
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [sortOrder, setSortOrder] = useState("newest");
	const [launchType, setLaunchType] = useState("fairlaunch");
	const { isFetching, fairLaunchData, pumpSalesData } = useLaunchPads();
	const [isLoading, setIsLoading] = useState(true);
	console.log({ isFetching });
	// Simulate loading data from API/contract
	useEffect(() => {
		// const timer = setTimeout(() => {
		if (isFetching) return;
		setLaunches(launchType === "fairlaunch" ? fairLaunchData : pumpSalesData);
		setIsLoading(false);
		// }, 1500);

		// return () => clearTimeout(timer);
	}, [launchType, isFetching]);

	// Filter and sort launches
	useEffect(() => {
		// Filter launches based on search query and active filter
		let filtered = [...launches];

		// Apply status filter
		if (activeFilter !== "ALL") {
			filtered = filtered.filter((launch) => launch.status === activeFilter);
		}

		// Apply search filter
		if (searchQuery) {
			filtered = filtered.filter((launch) =>
				launch.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		// Apply sorting
		filtered = sortLaunches(filtered, sortOrder);

		setFilteredLaunches(filtered);
	}, [launches, searchQuery, activeFilter, sortOrder]);

	const sortLaunches = (launchesToSort, order) => {
		return [...launchesToSort].sort((a, b) => {
			switch (order) {
				case "newest":
					return new Date(b.startTimeRaw || 0) - new Date(a.startTimeRaw || 0);
				case "oldest":
					return new Date(a.startTimeRaw || 0) - new Date(b.startTimeRaw || 0);
				case "progress-high":
					return b.progress - a.progress;
				case "progress-low":
					return a.progress - b.progress;
				case "raised-high":
					return (
						Number.parseFloat(b.totalRaised || 0) -
						Number.parseFloat(a.totalRaised || 0)
					);
				case "raised-low":
					return (
						Number.parseFloat(a.totalRaised || 0) -
						Number.parseFloat(b.totalRaised || 0)
					);
				case "a-z":
					return a.name.localeCompare(b.name);
				case "z-a":
					return b.name.localeCompare(a.name);
				default:
					return 0;
			}
		});
	};

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleFilterChange = (filter) => {
		setActiveFilter(filter);
	};

	const handleSortChange = (order) => {
		setSortOrder(order);
	};

	const handleLaunchTypeChange = (type) => {
		setLaunchType(type);
		setIsLoading(true);
		setActiveFilter("ALL");
	};

	const handlePoolInfoSubmit = (data) => {
		console.log("Pool information updated:", data);
		// Here you would typically send the data to your API
	};

	const renderLoadingState = () => {
		if (viewMode === "grid") {
			return (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{[...Array(8)].map((_, idx) => (
						<LoadingCard key={idx} />
					))}
				</div>
			);
		} else {
			return (
				<div className="space-y-4">
					{[...Array(5)].map((_, idx) => (
						<LoadingListItem key={idx} />
					))}
				</div>
			);
		}
	};

	const renderEmptyState = () => {
		return <EmptyState searchQuery={searchQuery} activeFilter={activeFilter} />;
	};

	const renderContent = () => {
		if (isLoading) {
			return renderLoadingState();
		}

		if (filteredLaunches.length === 0) {
			return renderEmptyState();
		}

		if (viewMode === "grid") {
			return (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					<AnimatePresence mode="popLayout">
						{filteredLaunches.map((launch, idx) => (
							<motion.div
								key={launch.id}
								className="relative"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.3, delay: idx * 0.05 }}
								onMouseEnter={() => setHoveredIndex(idx)}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								<AnimatePresence>
									{hoveredIndex === idx && (
										<motion.span
											className="absolute inset-0 h-full w-full bg-[#004581]/10 block rounded-3xl z-0"
											layoutId="hoverBackground"
											initial={{ opacity: 0 }}
											animate={{
												opacity: 1,
												transition: { duration: 0.15 },
											}}
											exit={{
												opacity: 0,
												transition: { duration: 0.15, delay: 0.2 },
											}}
										/>
									)}
								</AnimatePresence>
								{launchType === "fairlaunch" ? (
									<LaunchCard
										launch={launch}
										isHovered={hoveredIndex === idx}
									/>
								) : (
									<PumpSaleCard
										launch={launch}
										isHovered={hoveredIndex === idx}
									/>
								)}
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			);
		} else {
			return (
				<div className="space-y-4">
					<AnimatePresence mode="popLayout">
						{filteredLaunches.map((launch, idx) => (
							<motion.div
								key={launch.id}
								className="relative"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.3, delay: idx * 0.05 }}
								onMouseEnter={() => setHoveredIndex(idx)}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								<AnimatePresence>
									{hoveredIndex === idx && (
										<motion.span
											className="absolute inset-0 h-full w-full bg-[#004581]/10 block rounded-xl z-0"
											layoutId="hoverBackground"
											initial={{ opacity: 0 }}
											animate={{
												opacity: 1,
												transition: { duration: 0.15 },
											}}
											exit={{
												opacity: 0,
												transition: { duration: 0.15, delay: 0.2 },
											}}
										/>
									)}
								</AnimatePresence>
								{launchType === "fairlaunch" ? (
									<LaunchListItem
										launch={launch}
										isHovered={hoveredIndex === idx}
									/>
								) : (
									<PumpSaleListItem
										launch={launch}
										isHovered={hoveredIndex === idx}
									/>
								)}
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			);
		}
	};

	return (
		<div className="min-h-screen text-white">
			<div className="container mx-auto px-4 py-6 space-y-8">
				{/* Header */}
				<motion.header
					className="flex flex-col md:flex-row items-center justify-between gap-4"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className="flex items-center gap-2">
						<div className="relative">
							<div className="absolute -inset-1 bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-full blur opacity-70"></div>
							<div className="relative bg-[#0a0f1a] rounded-full p-2">
								<Flame className="h-6 w-6 text-[#018ABD]" />
							</div>
						</div>
						<div className="flex flex-col">
							<h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#97CBDC]">
								{launchType === "fairlaunch" ? "Fair Launch" : "Pump Sales"}
							</h1>
							<div className="flex items-center gap-2">
								<span className="text-[#97CBDC] text-sm">
									{launchType === "fairlaunch"
										? "Fair token launches with transparent distribution"
										: "High-performance pump sales with maximum returns"}
								</span>
							</div>
						</div>
					</div>

					<div className="flex gap-2 w-full md:w-auto">
						<Button className="bg-gradient-to-r from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl shadow-lg shadow-[#004581]/20 transition-all duration-200 flex-1 md:flex-none">
							CREATE MEME
						</Button>
						<Button className="bg-gradient-to-r from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl shadow-lg shadow-[#004581]/20 transition-all duration-200 flex-1 md:flex-none">
							LAUNCH IT
						</Button>
						{/* <EditPoolModal onSubmit={handlePoolInfoSubmit} /> */}
					</div>
				</motion.header>

				{/* Mode Tabs */}
				<motion.div
					className="flex justify-center"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					<div className="bg-[#1D2538]/80 border border-[#475B74] p-1 rounded-xl inline-flex">
						<Button
							variant="ghost"
							className={cn(
								"rounded-lg px-4 py-2 h-auto",
								launchType === "fairlaunch"
									? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white shadow-lg shadow-[#004581]/20"
									: "bg-transparent text-[#97CBDC] hover:text-white hover:bg-[#1D2538]"
							)}
							onClick={() => handleLaunchTypeChange("fairlaunch")}
						>
							Fair Launch
						</Button>
						<Button
							variant="ghost"
							className={cn(
								"rounded-lg px-4 py-2 h-auto",
								launchType === "pumpsales"
									? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white shadow-lg shadow-[#004581]/20"
									: "bg-transparent text-[#97CBDC] hover:text-white hover:bg-[#1D2538]"
							)}
							onClick={() => handleLaunchTypeChange("pumpsales")}
						>
							Pump Sales
						</Button>
					</div>
				</motion.div>

				{/* Filter Controls */}
				<motion.div
					className="flex flex-col gap-4"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
						<div className="relative w-full sm:w-64">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<Search className="text-[#97CBDC] h-4 w-4" />
							</div>
							<Input
								placeholder="Search by name"
								className="pl-10 bg-[#1D2538]/80 border-[#475B74] h-full rounded-lg w-full text-sm focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
								value={searchQuery}
								onChange={handleSearch}
							/>
						</div>

						<div className="flex items-center gap-2 w-full sm:w-auto">
							<FilterDropdown />

							<div className="flex rounded-xl overflow-hidden border border-[#475B74] p-1 bg-[#1D2538]/80">
								<Button
									variant="ghost"
									className={cn(
										"rounded-lg p-2 h-10 cursor-pointer transition-all duration-200",
										viewMode === "grid"
											? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white shadow-lg shadow-[#004581]/20"
											: "bg-transparent text-[#97CBDC] hover:text-white hover:bg-[#1D2538]"
									)}
									onClick={() => setViewMode("grid")}
								>
									<Grid3 className="h-5 w-5" />
								</Button>
								<Button
									variant="ghost"
									className={cn(
										"rounded-lg p-2 h-10 cursor-pointer transition-all duration-200",
										viewMode === "list"
											? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white shadow-lg shadow-[#004581]/20"
											: "bg-transparent text-[#97CBDC] hover:text-white hover:bg-[#1D2538]"
									)}
									onClick={() => setViewMode("list")}
								>
									<List className="h-5 w-5" />
								</Button>
							</div>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
						<Tabs defaultValue="ALL" className="w-full sm:w-auto">
							<TabsList className="bg-[#1D2538]/80 border border-[#475B74] p-1 rounded-xl w-full sm:w-auto grid grid-cols-5 sm:flex">
								<TabsTrigger
									value="ALL"
									onClick={() => handleFilterChange("ALL")}
									className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004581] data-[state=active]:to-[#018ABD] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#004581]/20 rounded-lg text-[#97CBDC] hover:text-white"
								>
									All
								</TabsTrigger>
								<TabsTrigger
									value="LIVE"
									onClick={() => handleFilterChange("LIVE")}
									className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004581] data-[state=active]:to-[#018ABD] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#004581]/20 rounded-lg text-[#97CBDC] hover:text-white"
								>
									Live
								</TabsTrigger>
								{launchType === "fairlaunch" && (
									<TabsTrigger
										value="UPCOMING"
										onClick={() => handleFilterChange("UPCOMING")}
										className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004581] data-[state=active]:to-[#018ABD] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#004581]/20 rounded-lg text-[#97CBDC] hover:text-white"
									>
										Upcoming
									</TabsTrigger>
								)}
								<TabsTrigger
									value="COMPLETED"
									onClick={() => handleFilterChange("COMPLETED")}
									className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004581] data-[state=active]:to-[#018ABD] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#004581]/20 rounded-lg text-[#97CBDC] hover:text-white"
								>
									Completed
								</TabsTrigger>
								{launchType === "fairlaunch" && (
									<TabsTrigger
										value="ENDED"
										onClick={() => handleFilterChange("ENDED")}
										className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004581] data-[state=active]:to-[#018ABD] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#004581]/20 rounded-lg text-[#97CBDC] hover:text-white"
									>
										Ended
									</TabsTrigger>
								)}
							</TabsList>
						</Tabs>

						<div className="flex items-center gap-2 w-full sm:w-auto">
							<div className="flex rounded-xl overflow-hidden border border-[#475B74] p-1 bg-[#1D2538]/80 w-full sm:w-auto">
								{launchType === "fairlaunch" && (
									<Button
										variant="ghost"
										className={cn(
											"rounded-lg p-2 h-10 cursor-pointer transition-all duration-200 flex items-center gap-1",
											sortOrder === "newest" || sortOrder === "oldest"
												? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white shadow-lg shadow-[#004581]/20"
												: "bg-transparent text-[#97CBDC] hover:text-white hover:bg-[#1D2538]"
										)}
										onClick={() =>
											handleSortChange(
												sortOrder === "newest" ? "oldest" : "newest"
											)
										}
									>
										{sortOrder === "newest" ? (
											<>
												<span className="hidden sm:inline">Newest</span>
												<ArrowDownAZ className="h-4 w-4" />
											</>
										) : (
											<>
												<span className="hidden sm:inline">Oldest</span>
												<ArrowUpAZ className="h-4 w-4" />
											</>
										)}
									</Button>
								)}
								<Button
									variant="ghost"
									className={cn(
										"rounded-lg p-2 h-10 cursor-pointer transition-all duration-200 flex items-center gap-1",
										sortOrder === "progress-high" ||
											sortOrder === "progress-low"
											? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white shadow-lg shadow-[#004581]/20"
											: "bg-transparent text-[#97CBDC] hover:text-white hover:bg-[#1D2538]"
									)}
									onClick={() =>
										handleSortChange(
											sortOrder === "progress-high"
												? "progress-low"
												: "progress-high"
										)
									}
								>
									<span className="hidden sm:inline">Progress</span>
									<TrendingUp
										className={`h-4 w-4 ${
											sortOrder === "progress-low" ? "rotate-180" : ""
										}`}
									/>
								</Button>
								<Button
									variant="ghost"
									className={cn(
										"rounded-lg p-2 h-10 cursor-pointer transition-all duration-200 flex items-center gap-1",
										sortOrder === "a-z" || sortOrder === "z-a"
											? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white shadow-lg shadow-[#004581]/20"
											: "bg-transparent text-[#97CBDC] hover:text-white hover:bg-[#1D2538]"
									)}
									onClick={() =>
										handleSortChange(sortOrder === "a-z" ? "z-a" : "a-z")
									}
								>
									{sortOrder === "a-z" ? (
										<>
											<span className="hidden sm:inline">A-Z</span>
											<ArrowDownAZ className="h-4 w-4" />
										</>
									) : (
										<>
											<span className="hidden sm:inline">Z-A</span>
											<ArrowUpAZ className="h-4 w-4" />
										</>
									)}
								</Button>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Launch Cards/List */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{renderContent()}
				</motion.div>
			</div>
		</div>
	);
}
