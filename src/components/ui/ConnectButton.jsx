import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="hidden cursor-pointer md:block bg-[#1D2538]/80 border border-[#475B74] px-4 py-2 rounded-xl text-[#97CBDC] hover:text-white transition-colors"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="hidden cursor-pointer md:block bg-red-600/80 border border-red-400 px-4 py-2 rounded-xl text-white hover:bg-red-700 transition-colors"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    className="flex items-center cursor-pointer bg-[#1D2538]/80 border border-[#475B74] px-3 py-2 rounded-xl text-[#97CBDC] hover:text-white transition-colors"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 6,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 18, height: 18 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    className="bg-[#1D2538]/80 cursor-pointer border border-[#475B74] px-4 py-2 rounded-xl text-[#97CBDC] hover:text-white transition-colors"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
