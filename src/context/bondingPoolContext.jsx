import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { Contract } from "ethers";
// import ABI from "../ABI/proposal.json";
import usePoolFactoryContract from "@/hooks/usePoolFactoryContract";
import useEthersProvider from "@/hooks/useEthersProvider";
import {
	POOL_FACTORY_ABI,
	PAHROS_POOL_FACTORY_ADDRESS,
} from "@/utils/ABI/PoolFactory";
import { useAccount } from "wagmi";

export const BondingPoolContext = createContext({
	bondingTokenCreated: false,
});

export const BondingPoolContextProvider = ({ children }) => {
	const { address } = useAccount();
	const poolFactoryContract = usePoolFactoryContract(true);
	const readOnlyPoolFactoryContract = usePoolFactoryContract(false);
	const { readOnlyProvider, signer } = useEthersProvider();
	const [bondingTokenCreated, setBondingTokenCreated] = useState(false);


	const bondingTokenCreatedHandler = useCallback(
		(creator, poolAddress, token) => {
			console.log({ creator, poolAddress, token });
			if (creator === address) {
				console.log("Trueeeeeeeeeeeeeeeeeeeeeeeee")
				setBondingTokenCreated(true);
			}
		},
		[]
	);

	useEffect(() => {
		// // const filter = readOnlyProposalContract.filter.ProposalCreated()
		const contract = new Contract(
			PAHROS_POOL_FACTORY_ADDRESS,
			POOL_FACTORY_ABI,
			readOnlyProvider
			// signer
		);

		const check = async () => {
			const bondingTokenCreationFee =
				await contract.bondingTokenCreationFee.staticCall();
			console.log({ bondingTokenCreationFee });
		};
		check();
		// contract.on("BondingTokenCreated", bondingTokenCreatedHandler);
		console.log("created listener added");
		return () => {
			// contract.off("BondingTokenCreated", bondingTokenCreatedHandler);
			console.log("created listener removed");
		};
	}, [bondingTokenCreatedHandler, readOnlyProvider]);

	console.log("Loading");

	return (
		<BondingPoolContext.Provider
			value={{
				bondingTokenCreated,
			}}
		>
			{children}
		</BondingPoolContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBondingPools = () => {
	const context = useContext(BondingPoolContext);
	if (!context)
		return console.error(
			"useBondingPools should be used within BondingPoolContextProvider"
		);
	return context;
};
