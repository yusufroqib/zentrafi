import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { Contract, ethers, Interface } from "ethers";
// import ABI from "../ABI/pool.json";
import usePoolManagerContract from "@/hooks/usePoolManagerContract";
import useEthersProvider from "@/hooks/useEthersProvider";
import {
	POOL_MANAGER_ABI,
	PHAROS_POOL_MANAGER_ADDRESS,
} from "@/utils/ABI/PoolManager/zindex";

import { useAccount } from "wagmi";
import { BONDING_POOL_ABI } from "@/utils/ABI/BondingPool";
import { FAIR_POOL_ABI } from "@/utils/ABI/FairPool";
import axios from "axios";
const multicall3Addr = "0x3308CC3B0b2fCD4E9994E210A8290649d61360D7";
const multicallAbi = [
	"function tryAggregate(bool requireSuccess, (address target, bytes callData)[] calls) returns ((bool success, bytes returnData)[] returnData)",
];

export const LaunchPadContext = createContext({
	bondingTokenCreated: false,
	isFetching: true,
	fairLaunchData: [],
	pumpSalesData: [],
});

export const LaunchPadContextProvider = ({ children }) => {
	const { address } = useAccount();
	const poolManagerContract = usePoolManagerContract(true);
	const readOnlyPoolManagerContract = usePoolManagerContract(false);
	const { readOnlyProvider, signer } = useEthersProvider();
	const [bondingTokenCreated, setBondingTokenCreated] = useState(false);
	const [isFetching, setIsFetching] = useState(true);
	const [fairLaunchData, setFairLaunchData] = useState([]);
	const [pumpSalesData, setPumpSalesData] = useState([]);

	const fetchPools = useCallback(async () => {
		if (!readOnlyPoolManagerContract) return;
		if (!isFetching) return;

		const multicallContract = new Contract(
			multicall3Addr,
			multicallAbi,
			readOnlyProvider
		);

		const itf = new Interface(POOL_MANAGER_ABI);
		const fairPoolItf = new Interface(FAIR_POOL_ABI);
		const bondingPoolItf = new Interface(BONDING_POOL_ABI);

		try {
			
			const allFairPools = await readOnlyPoolManagerContract.getAllFairPools();
			// console.log({allFairPools})
			const allBondingPools =
				await readOnlyPoolManagerContract.getAllBondingPools();

			const fairPoolItfCalls = allFairPools.map((_address) => ({
				target: _address,
				callData: fairPoolItf.encodeFunctionData("getPoolInfo"),
			}));
			const bondingPoolItfCalls = allBondingPools.map((_address) => ({
				target: _address,
				callData: bondingPoolItf.encodeFunctionData("getPoolInfo"),
			}));

			// console.log({fairPoolItfCalls, bondingPoolItfCalls})

			/**
 *   returns (
            address, //Token
            address, //Currency
            uint8[3] memory state,
                    state[0] = uint8(poolState);
                    state[1] = uint8(poolType);
                    state[2] = IERC20Metadata(token).decimals();
            uint256[11] memory info,
                    info[0] = startTime;
                    info[1] = endTime;
                    info[2] = totalRaised;
                    info[3] = kycStatus == true ? 1 : 0;
                    info[4] = softCap;
                    info[5] = kyc == true ? 1 : 0;
                    info[6] = audit == true ? 1 : 0;
                    info[7] = rate;
                    info[8] = auditStatus == true ? 1 : 0;
                    info[9] = liquidityPercent;
                    info[10] = liquidityUnlockTime;
            string memory name,
            string memory symbol,
            string memory pooldetails,
            uint256 routerVersion,
            uint256 tokenId,
            address v3pair
        )

 */

			const allFairPoolsResponses =
				await multicallContract.tryAggregate.staticCall(true, fairPoolItfCalls);
			const allBondingPoolsResponses =
				await multicallContract.tryAggregate.staticCall(
					true,
					bondingPoolItfCalls
				);

			const decodedFairPoolsResults = allFairPoolsResponses.map((res) =>
				fairPoolItf.decodeFunctionResult("getPoolInfo", res.returnData)
			);
			const decodedBondingPoolsResults = allBondingPoolsResponses.map((res) =>
				bondingPoolItf.decodeFunctionResult("getPoolInfo", res.returnData)
			);

			// const decodedResults = [
			// 	...decodedFairPoolsResults,
			// 	...decodedBondingPoolsResults,
			// ];

			// console.log("decoded Results:", [...decodedResults]);

			const fairPoolsData = decodedFairPoolsResults.map((fairPools, index) => {
				const startTimestamp = fairPools[3][0];
				const endTimestamp = fairPools[3][1];
				const totalRaised = fairPools[3][2];
				// const kycStatus = fairPools[3][3];
				const softCap = fairPools[3][4];
				const poolState = fairPools[2][0];

				console.log({ poolState });

				const date = new Date(Number(startTimestamp) * 1000);

				// Format to "YY-MM-DD HH:mm"
				const startTime = date
					.toISOString()
					.slice(2, 16)
					.replace("T", " ")
					.replace(/-/g, "-");

				const startTimeRaw = date.toISOString().slice(0, 16); // "2025-05-02T16:04"
				const now = Math.floor(Date.now() / 1000); // current time in seconds
				const status =
					Number(totalRaised) >= Number(softCap)
						? "COMPLETED"
						: now < Number(startTimestamp)
						? "UPCOMING"
						: now < Number(endTimestamp)
						? "LIVE"
						: "ENDED";

				return {
					id: allFairPools[index],
					name: fairPools[4],
					status: status,
					icon: "/Pharos-chain.jpg",
					backgroundImage: "vite.svg",
					progress: (Number(totalRaised) / Number(softCap)) * 100,
					startTime: startTime,
					startTimeRaw: startTimeRaw,
					featured: false,
					participants: '',
				};
			});
			/**
         *     id: "p1",
    name: "RocketMoon",
    status: "UPCOMING",
    icon: "/Pharos-chain.jpg",
    backgroundImage: "/vite.svg",
    progress: 0,
    startTime: "25-05-10 12:00",
    startTimeRaw: "2025-05-10T12:00:00",
    featured: true,
    participants: 0,
    marketCap: 0,
    holders: 0,
         */

			/**
     *  enum PoolState {
        inUse,
        completed,
        cancelled
    }
     *      address, //Token
            uint8[3] memory, //state
                    state[0] = uint8(poolState);
                    state[1] = uint8(poolType);
                    state[2] = IERC20Metadata(token).decimals();
            uint256[] memory, // info
                    info[0] = ethAmount;
                    info[1] = tokenAAmount;
                    info[2] = kycStatus == true ? 1 : 0;
                    info[3] = auditStatus == true ? 1 : 0;
                    info[4] = marketCap;
                    info[5] = circulatingSupply;
            string memory, //name
            string memory, //symbol
            string memory, //poolDetails
            uint256, //tokenId
            address, //v3Pair
            address[] memory, //holders
            uint256 //tokenTotalSupply
     */
			const priceResponse = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}/api/get-price`
			);
			// const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/price`)
			const { pairId, pairPrice, pairDecimal, pairTimestamp } =
				priceResponse.data;
			console.log({ pairPrice, pairDecimal });
			const bondingPoolsData = decodedBondingPoolsResults.map(
				(bondingPools, index) => {
					// uint256 currentRate = (ethAmount * ethPrice) / (tokenAAmount * (10 ** (18 - getDecimal())));
					const ethAmount = bondingPools[2][0];
					const tokenAAmount = bondingPools[2][1];
					const circulatingSupply = bondingPools[2][5];
					const tokenDecimals = Number(bondingPools[1][2]);

					const currentRate =
						(Number(ethAmount) * Number(pairPrice)) /
						Number(10 ** pairDecimal) /
						(Number(tokenAAmount) * Number(10 ** (18 - tokenDecimals)));
					console.log({ currentRate });
					console.log(
						"circulatingSupply",
						Number(circulatingSupply),
						"tokenDecimals",
						tokenDecimals
					);
					const currentMarketCap =
						currentRate * (Number(circulatingSupply) / 10 ** tokenDecimals);
					// console.log({ currentMarketCap });
					const poolState = bondingPools[1][0];
					const status = Number(poolState) === 0 ? "LIVE" : "COMPLETED";
					// console.log({ poolState });

					const poolDetails = bondingPools[5].split("$#$");
					// console.log({ poolDetails });
					return {
						id: allBondingPools[index],
						name: bondingPools[3],
						status,
						icon: poolDetails[0],
						backgroundImage: poolDetails[1],
						progress: Math.floor((currentMarketCap / 6900) * 100),
						startTime: "TBA",
						startTimeRaw: "TBA",
						featured: false,
						participants: 0,
						marketCap: currentMarketCap.toFixed(2),
						holders: bondingPools[8].length ? bondingPools[8].length : 1,
						tokenTotalSupply: bondingPools[9],
					};
				}
			);

			// console.log({ fairPoolsData });
			// console.log({ bondingPoolsData });
			setFairLaunchData(fairPoolsData);
			setPumpSalesData(bondingPoolsData);

			// setPools(data);
		} catch (error) {
			console.log("error fetching pools: ", error);
		} finally {
			setIsFetching(false);
		}
	}, [readOnlyPoolManagerContract, readOnlyProvider]);

	useEffect(() => {
		fetchPools();
	}, [fetchPools]);

	console.log("Loading");

	return (
		<LaunchPadContext.Provider
			value={{
				bondingTokenCreated,
				isFetching,
				fairLaunchData,
				pumpSalesData,
			}}
		>
			{children}
		</LaunchPadContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLaunchPads = () => {
	const context = useContext(LaunchPadContext);
	if (!context)
		return console.error(
			"useLaunchPads should be used within LaunchPadContextProvider"
		);
	return context;
};
