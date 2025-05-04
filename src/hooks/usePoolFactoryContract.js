import { useMemo } from "react";
import { Contract } from "ethers";
// import ABI from "../ABI/proposal.json";
import useEthersProvider from "./useEthersProvider";
import {
    POOL_FACTORY_ABI,
    PAHROS_POOL_FACTORY_ADDRESS,
} from "@/utils/ABI/PoolFactory";

const usePoolFactoryContract = (withSigner = false) => {
    const { readOnlyProvider, signer } = useEthersProvider();
// console.log({signer})
    return useMemo(() => {
        if (withSigner) {
            console.log("Returning...")
            if (!signer) return null;
            return new Contract(
                PAHROS_POOL_FACTORY_ADDRESS,
                POOL_FACTORY_ABI, 
                signer
            );
        }

        return new Contract(
            PAHROS_POOL_FACTORY_ADDRESS,
            POOL_FACTORY_ABI,
            readOnlyProvider
        );
    }, [readOnlyProvider, signer, withSigner]);
};

export default usePoolFactoryContract;
