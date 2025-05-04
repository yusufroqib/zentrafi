import { useMemo } from "react";
import { Contract } from "ethers";
import useEthersProvider from "./useEthersProvider";
import {
    POOL_MANAGER_ABI,
    PHAROS_POOL_MANAGER_ADDRESS,
} from "@/utils/ABI/PoolManager";

const usePoolFactoryContract = (withSigner = false) => {
    const { readOnlyProvider, signer } = useEthersProvider();
    return useMemo(() => {
        if (withSigner) {
            // console.log("Returning...")
            if (!signer) return null;
            return new Contract(
                PHAROS_POOL_MANAGER_ADDRESS,
                POOL_MANAGER_ABI, 
                signer
            );
        }

        return new Contract(
            PHAROS_POOL_MANAGER_ADDRESS,
            POOL_MANAGER_ABI,
            readOnlyProvider
        );
    }, [readOnlyProvider, signer, withSigner]);
};

export default usePoolFactoryContract;
