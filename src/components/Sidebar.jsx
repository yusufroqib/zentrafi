import * as React from "react";
import { useState, useEffect } from "react";
import {
	Wallet,
	Rocket,
	BarChart3,
	Layers,
	Coins,
	Users,
	FlagIcon,
	Lock,
	HelpCircle,
	ChevronRight,
	ChevronLeft,
	Zap,
	Sparkles,
	Menu,
	X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ConnectWallet from "./ui/ConnectButton";
import { Link } from "react-router-dom";
import { ZentraLogo } from "./ZentraLogo";

// Navigation items with icons
const viewItems = [
	{ id: "launchpad", name: "Launchpad", href: "/launchpad", icon: Rocket },
	// { id: "defi", name: "$ZTR 🔥", href: "/defi", icon: BarChart3 },
	{ id: "staking", name: "Staking", href: "/staking", icon: Coins },
	{ id: "portfolio", name: "Portfolio", href: "/portfolio", icon: Wallet },
];

const createItems = [
	{ id: "meme-coin", name: "Create Token", href: "/token", icon: Coins },
	{ id: "fair-launch", name: "Fair Launch", href: "/fair-launch", icon: Users },
	{
		id: "pump-launch",
		name: "Pump Launch",
		href: "/bonding-token-sale",
		icon: BarChart3,
	},
	{ id: "airdrop", name: "Airdrop", href: "/airdrop", icon: FlagIcon },
	{
		id: "lock",
		name: "Lock",
		href: "/lock" || "/token-lock" || "/lp-lock",
		icon: Lock,
	},
];

const helpItems = [{ id: "help", name: "HELP", href: "#", icon: HelpCircle }];

// Header component
function Header() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-[#97CBDC]/30 bg-[#004581] bg-opacity-95 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
				<div className="flex justify-between space-x-6">
					<Link to="/">
						<ZentraLogo showTagline={false} size="xs" />
					</Link>

					<nav className="hidden md:block">
						<ul className="flex space-x-1">
							{["Dashboard", "Markets", "Trade", "Earn"].map((item) => (
								<li key={item}>
									<a
										href="#"
										className="rounded-md px-3 py-2 text-sm font-medium text-[#DDE8F0] transition-colors hover:bg-[#018ABD]/40 hover:text-white"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<div className="flex items-center space-x-4">
					<div className="hidden items-center rounded-lg border border-[#97CBDC]/30 bg-[#004581]/80 px-3 py-1.5 md:flex">
						<span className="text-xs font-medium text-[#97CBDC]">
							MARKET CAP
						</span>
						<span className="ml-1.5 text-xs font-semibold text-white">
							$24,055
						</span>
					</div>
					<a
						href={`https://swap-swap-liart.vercel.app/`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<button className="hidden p-2 text-center rounded-lg bg-gradient-to-r from-[#018ABD] to-[#97CBDC] text-sm font-medium text-white hover:opacity-90 md:flex">
							<Sparkles className="mr-1.5 h-3.5 w-3.5" />
							BUY $ZTR
						</button>
					</a>

					<ConnectWallet />

					<button
						className="text-white md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className="border-t border-[#97CBDC]/30 bg-[#004581] px-4 py-3 md:hidden">
					<nav>
						<ul className="space-y-2">
							{["Dashboard", "Markets", "Trade", "Earn"].map((item) => (
								<li key={item}>
									<a
										href="#"
										className="block rounded-md px-3 py-2 text-base font-medium text-[#DDE8F0] hover:bg-[#018ABD]/40 hover:text-white"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
						<div className="mt-4 flex items-center justify-between rounded-lg border border-[#97CBDC]/30 bg-[#004581]/80 px-3 py-2">
							<span className="text-sm font-medium text-[#97CBDC]">
								MARKET CAP
							</span>
							<span className="text-sm font-semibold text-white">$24,055</span>
						</div>
						<a
							href={`https://swap-swap-liart.vercel.app/`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<button className="mt-3 w-full rounded-lg bg-gradient-to-r from-[#018ABD] to-[#97CBDC] py-2 text-sm font-medium text-white hover:opacity-90">
								<Sparkles className="mr-1.5 h-4 w-4" />
								BUY $ZTR
							</button>
						</a>
					</nav>
				</div>
			)}
		</header>
	);
}

export function ZentraSidebar({ collapsed, setCollapsed }) {
	const [activeItem, setActiveItem] = useState("launchpad");

	// Check current route and set active item on component mount and when location changes
	useEffect(() => {
		const updateActiveItemFromPath = () => {
			// Get current path
			const path = window.location.pathname;

			// Find matching item from all navigation items
			const allItems = [...viewItems, ...createItems, ...helpItems];
			const matchingItem = allItems.find((item) => item.href === path);

			if (matchingItem) {
				setActiveItem(matchingItem.id);
			} else {
				// If no exact match, check for path prefix
				const matchingPrefix = allItems.find(
					(item) => item.href !== "/" && path.startsWith(item.href)
				);

				if (matchingPrefix) {
					setActiveItem(matchingPrefix.id);
				} else if (path === "/") {
					// Default to launchpad for home route
					setActiveItem("launchpad");
				}
			}
		};

		// Run once on mount
		updateActiveItemFromPath();

		// Listen for route changes
		// Note: This is a simplified approach. For frameworks like Next.js or React Router,
		// you'd use their specific hooks for route detection.
		const handleRouteChange = () => {
			updateActiveItemFromPath();
		};

		window.addEventListener("popstate", handleRouteChange);

		// Cleanup
		return () => {
			window.removeEventListener("popstate", handleRouteChange);
		};
	}, []);

	// Function to handle navigation
	const handleNavigation = (e, item) => {
		if (item.href === "#") {
			e.preventDefault();
		}
		setActiveItem(item.id);
	};

	return (
		<div
			className={cn(
				"fixed top-16 bottom-0 flex flex-col transition-all duration-300 ease-in-out border-r border-[#97CBDC]/30 bg-[#004581] text-white z-40",
				collapsed ? "w-[70px]" : "w-[280px]"
			)}
		>
			{/* Toggle button when collapsed */}
			{collapsed && (
				<button
					onClick={() => setCollapsed(false)}
					className="absolute top-4 left-[58px] cursor-pointer w-6 h-6 rounded-full flex items-center justify-center z-10 bg-[#018ABD] text-white shadow-md"
				>
					<ChevronRight className="h-3 w-3" />
				</button>
			)}

			{/* Main content */}
			<div className="flex-1 px-3 py-4">
				{/* VIEW SECTION */}
				<div className="mb-6">
					<div className="mb-3 flex items-center justify-between px-2">
						<span className="text-xs font-bold uppercase tracking-wider text-[#97CBDC]">
							View
						</span>
						<div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#97CBDC]/30 to-transparent ml-2"></div>
					</div>
					<div className="space-y-1">
						{viewItems.map((item) => (
							<Link
								key={item.id}
								to={item.href}
								onClick={(e) => handleNavigation(e, item)}
								className={cn(
									"block w-full rounded-lg text-sm font-medium transition-all",
									collapsed
										? "flex justify-center py-3 px-2"
										: "flex items-center px-3 py-2.5",
									activeItem === item.id
										? "bg-gradient-to-r from-[#018ABD]/50 to-transparent border-l-2 border-[#97CBDC]"
										: "hover:bg-gradient-to-r hover:from-[#018ABD]/30 hover:to-[#018ABD]/10"
								)}
							>
								<div className="flex h-5 w-5 items-center justify-center">
									<item.icon className="h-5 w-5 text-[#97CBDC]" />
								</div>
								{!collapsed && (
									<span className="ml-3 transition-all">{item.name}</span>
								)}
							</Link>
						))}
					</div>
				</div>

				{/* CREATE SECTION */}
				<div className="mb-6">
					<div className="mb-3 flex items-center justify-between px-2">
						<span className="text-xs font-bold uppercase tracking-wider text-[#97CBDC]">
							Create
						</span>
						<div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#97CBDC]/30 to-transparent ml-2"></div>
					</div>
					<div className="space-y-1">
						{createItems.map((item) =>
							item.icon ? (
								<Link
									key={item.id}
									to={item.href}
									onClick={(e) => handleNavigation(e, item)}
									className={cn(
										"block w-full rounded-lg text-sm font-medium transition-all",
										collapsed
											? "flex justify-center py-3 px-2"
											: "flex items-center px-3 py-2.5",
										activeItem === item.id
											? "bg-gradient-to-r from-[#018ABD]/50 to-transparent border-l-2 border-[#97CBDC]"
											: "hover:bg-gradient-to-r hover:from-[#018ABD]/30 hover:to-[#018ABD]/10"
									)}
								>
									<div className="flex h-5 w-5 items-center justify-center">
										<item.icon
											className={cn(
												"h-5 w-5",
												item.name.includes("Meme")
													? "text-[#018ABD]"
													: "text-[#97CBDC]"
											)}
										/>
									</div>
									{!collapsed && (
										<span className="ml-3 transition-all">{item.name}</span>
									)}
								</Link>
							) : (
								!collapsed && (
									<a
										key={item.id}
										href={item.href}
										onClick={(e) => handleNavigation(e, item)}
										className={cn(
											"block w-full rounded-lg pl-11 pr-3 py-2 text-sm font-medium text-[#DDE8F0] transition-all hover:bg-[#018ABD]/30 hover:text-white",
											activeItem === item.id ? "text-white bg-[#018ABD]/40" : ""
										)}
									>
										<span>{item.name}</span>
									</a>
								)
							)
						)}
					</div>
				</div>

				{/* HELP SECTION */}
				<div className="mt-auto">
					<div className="mb-3 flex items-center justify-between px-2">
						<span className="text-xs font-bold uppercase tracking-wider text-[#97CBDC]">
							Support
						</span>
						<div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#97CBDC]/30 to-transparent ml-2"></div>
					</div>
					<div className="space-y-1">
						{helpItems.map((item) => (
							<a
								key={item.id}
								href={item.href}
								onClick={(e) => handleNavigation(e, item)}
								className={cn(
									"block w-full rounded-lg bg-gradient-to-r from-[#018ABD]/30 to-transparent transition-all hover:from-[#018ABD]/50 hover:to-[#97CBDC]/20",
									collapsed
										? "flex justify-center py-3 px-2"
										: "flex items-center px-3 py-2.5",
									activeItem === item.id
										? "from-[#018ABD]/60 to-[#97CBDC]/20"
										: ""
								)}
							>
								<div className="flex h-5 w-5 items-center justify-center">
									<item.icon className="h-5 w-5 text-[#018ABD]" />
								</div>
								{!collapsed && <span className="ml-3">{item.name}</span>}
							</a>
						))}
					</div>
				</div>

				{/* Promotional banner */}
				{!collapsed && (
					<div className="mx-2 my-6 p-4 rounded-xl bg-[#018ABD]/30 text-center">
						<div className="mb-2 flex justify-center">
							<Sparkles className="h-8 w-8 text-[#97CBDC]" />
						</div>
						<p className="text-sm mb-3 text-[#DDE8F0]">
							Boost your token launch
						</p>
						<a
							href={`https://swap-swap-liart.vercel.app/`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<button className="w-full py-2 px-4 bg-gradient-to-r from-[#018ABD] to-[#97CBDC] text-white rounded-lg text-sm font-medium hover:opacity-90">
								Buy $ZTR
							</button>
						</a>
					</div>
				)}
			</div>

			{/* Footer */}
			<div className="border-t border-[#97CBDC]/30 p-4">
				<div className="flex items-center">
					<h4 className="text-sm text-[#97CBDC]">
						{collapsed ? "Z" : "Zentra"}
					</h4>
				</div>
			</div>

			{/* Toggle button when expanded */}
			{!collapsed && (
				<button
					onClick={() => setCollapsed(true)}
					className="absolute top-4 right-3 flex h-8 w-8 items-center cursor-pointer justify-center rounded-md bg-[#018ABD]/40 text-[#DDE8F0] hover:bg-[#018ABD]/60 hover:text-white transition-colors"
				>
					<ChevronLeft className="h-5 w-5" />
				</button>
			)}
		</div>
	);
}

// Updated layout to accommodate fixed sidebar
export function ZentraLayout({ children }) {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<div className="flex min-h-screen flex-col bg-[#142029] w-full">
			<Header />
			<div className="flex flex-1">
				<div className={collapsed ? "w-[50px] sm:w-[80px]" : "w-[280px]"} />
				<ZentraSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
				<div className="flex-1 p-8 sm:p-6 w-full">{children}</div>
			</div>
		</div>
	);
}
