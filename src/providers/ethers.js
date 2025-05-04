import { getConnectorClient } from '@wagmi/core';
import { BrowserProvider, FallbackProvider, JsonRpcProvider, JsonRpcSigner } from 'ethers';

/**
 * Converts a viem client into an ethers.js Signer
 * @param {object} client - The viem client object
 * @returns {JsonRpcSigner}
 */
function clientToSigner(client) {
  const { account, chain, transport } = client;

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);

  return signer;
}

export function clientToProvider(client) {
  const { chain, transport } = client
  // console.log({clientChains: chain})
  // const chain = chains[0]
  const network = {
    chainId: chain?.id,
    name: chain?.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }

  if (transport.type === 'fallback') {
    const providers = transport.transports.map(
      ({ value }) => new JsonRpcProvider(value?.url, network)
    )
    if (providers.length === 1) return providers[0]
    return new FallbackProvider(providers)
  }

  return new JsonRpcProvider(transport.url, network)
}

/**
 * Gets an ethers.js signer from a wagmi viem client
 * @param {object} config - wagmi config
 * @param {object} [options] - options like { chainId }
 * @returns {Promise<JsonRpcSigner>}
 */
export async function getEthersSigner(config, options = {}) {
  const client = await getConnectorClient(config, options);
  return clientToSigner(client);
}

export async function getEthersProvider(config, options = {}) {
  if (!config) return undefined
  const client = await getConnectorClient(config, options);

  return clientToProvider(client)
}