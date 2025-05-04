import { useMemo } from "react";
import { Contract } from "ethers";
import useEthersProvider from "./useEthersProvider";
import {
    FAIR_POOL_ABI,
} from "@/utils/ABI/FairPool";
// import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';


const useFairPoolContract = (withSigner = false) => {
    // const {id} = location.state
    const { contractAddress } = useParams();

    const { readOnlyProvider, signer } = useEthersProvider();
    return useMemo(() => {
        if (withSigner) {
            // console.log("Returning...")
            if (!signer) return null;
            return new Contract(
                contractAddress,
                FAIR_POOL_ABI, 
                signer
            );
        }

        return new Contract(
            contractAddress,
            FAIR_POOL_ABI,
            readOnlyProvider
        );
    }, [readOnlyProvider, signer, withSigner]);
};

export default useFairPoolContract;
