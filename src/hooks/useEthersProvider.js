// import { jsonRpcProvider } from "@/lib/provider";
import { getEthersProvider, getEthersSigner } from "@/providers/ethers";
import { config } from "@/providers/xWagmi";
import { JsonRpcProvider } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const readOnlyProvider = new JsonRpcProvider(import.meta.env.VITE_SERVER_RPC_URL);

const useEthersProvider = () => {
	const [signer, setSigner] = useState(null);
	// const [jsonRpcProvider, setJsonRpcProvider] = useState(null);
    const {address} = useAccount()

	// const provider = getEthersSigner(config);

    // const [signer, setSigner] = useState(null);

    useEffect(() => {
      async function fetchSigner() {
        try {
          const signer = await getEthersSigner(config); // optionally pass { chainId }
        //   const provider =  await getEthersProvider(config);
        //   setJsonRpcProvider(provider);
          setSigner(signer);
        } catch (err) {
          console.error('Failed to get signer:', err);
        }
      }
  
      fetchSigner();
    }, [config, address]);

	return { signer, readOnlyProvider: readOnlyProvider };
};
export default useEthersProvider;
