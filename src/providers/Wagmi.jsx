import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig, http } from "wagmi";
import { celoAlfajores } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { defineChain } from "viem";
import { createAvatar } from "@dicebear/core";
import { pixelArt, personas } from "@dicebear/collection";

const REOWN_CLOUD_APP_ID = import.meta.env.VITE_REOWN_CLOUD_APP_ID || "";

const pharosDevnet = defineChain({
  id: 50002,
  caipNetworkId: "eip155:50002",
  chainNamespace: "eip155",
  name: "Pharos Devnet",
  iconUrl: "/Pharos-chain.jpg",
  nativeCurrency: {
    decimals: 18,
    name: "Pharos",
    symbol: "PTT",
  },
  rpcUrls: {
    default: {
      http: [import.meta.env.VITE_SERVER_RPC_URL],
      webSocket: ["wss://devnet.dplabs-internal.com"],
    },
  },
  blockExplorers: {
    default: { name: "Pharos Explorers", url: "https://pharosscan.xyz" },
  },
  contracts: {
    multicall3: {
      address: "0x3308CC3B0b2fCD4E9994E210A8290649d61360D7",
      blockCreated: 18602303,
    },
  },
});

export const config = createConfig({
  appName: "Zentra",
  projectId: REOWN_CLOUD_APP_ID,
  chains: [pharosDevnet, celoAlfajores],
  transports: {
    [pharosDevnet.id]: http(),
    [celoAlfajores.id]: http(),
  },
  ssr: true,
});

const DicebearPersonaAvatar = ({ address, size }) => {
  // Generate avatar using the same function from your code
  const avatarUri = createAvatar(pixelArt, personas, {
    seed: address.toLowerCase(),
    scale: 90,
    radius: 50,
    backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
  }).toDataUri();

  return (
    <img
      src={avatarUri}
      width={size}
      height={size}
      alt={`${address.slice(0, 6)}...${address.slice(-4)} avatar`}
      className="rounded-full"
    />
  );
};

const customAvatar = ({ address, ensImage, size }) => {
  // If there's an ENS image, use it instead of DiceBear
  if (ensImage) {
    return (
      <img
        src={ensImage}
        width={size}
        height={size}
        alt={`${address.slice(0, 6)}...${address.slice(-4)} avatar`}
        className="rounded-full"
      />
    );
  } else {
    // Otherwise use DiceBear
    return <DicebearPersonaAvatar address={address} size={size} />;
  }
};

export const WagmiConfigProvider = ({ children }) => {
  const queryClient = new QueryClient();

  if (!REOWN_CLOUD_APP_ID) {
    console.error("REOWN_CLOUD_APP_ID is not set!");
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={pharosDevnet?.id}
          showRecentTransactions={true}
          modalSize="compact"
          theme={darkTheme({
            accentColor: "#97CBDC/30",
            accentColorForeground: "white",
            fontStack: "system",
          })}
          avatar={customAvatar}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
