import { Rocket, Info, AlertCircle, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function LiquidityRewardsForm({
  formState,
  handleInputChange,
  handleSelectChange,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#018ABD]/20 p-2 rounded-lg">
          <Rocket className="h-5 w-5 text-[#018ABD]" />
        </div>
        <h3 className="text-lg font-bold text-[#018ABD]">
          Liquidity & Rewards
        </h3>
      </div>

      <div className="p-4 bg-gradient-to-r from-[#004581]/10 to-[#018ABD]/10 rounded-lg border border-[#475B74]/50 mb-4">
        <div className="flex items-center mb-4">
          <label className="block text-sm font-medium text-[#97CBDC] mr-2">
            Dex Router
          </label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-[#97CBDC]" />
              </TooltipTrigger>
              <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                <p className="text-xs max-w-xs">
                  Select the DEX where your token will be traded
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {["ZENTRA-v2", "ZENTRA-v3"].map((router) => (
            <button
              key={router}
              type="button"
              onClick={() => handleSelectChange("dexRouter", router)}
              className={cn(
                "p-3 rounded-lg border transition-all duration-200 flex items-center justify-center",
                formState.dexRouter === router
                  ? "bg-gradient-to-r from-[#004581]/30 to-[#018ABD]/30 border-[#018ABD] text-[#018ABD]"
                  : "bg-[#1D2538]/70 border-[#475B74]/50 text-[#97CBDC] hover:border-[#97CBDC]"
              )}
            >
              {formState.dexRouter === router && (
                <Check className="h-4 w-4 mr-2" />
              )}
              {router === "ZENTRA-v2" && "ZENTRA V2"}
              {router === "ZENTRA-v3" && "ZENTRA V3"}
            </button>
          ))}
        </div>

        <div className="mt-4 text-sm text-[#018ABD] flex items-start">
          <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-[#97CBDC]">
            If you are using the Auto LP function it will only work on V2 not on
            V3
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-[#97CBDC] mr-2">
              Liquidity Buy Fee (%)
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-[#97CBDC]" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                  <p className="text-xs max-w-xs">
                    Percentage of tokens to add to liquidity pool on buy
                    transactions
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="text"
            name="liquidityBuyFee"
            value={formState.liquidityBuyFee}
            onChange={handleInputChange}
            placeholder="0"
            disabled={formState.dexRouter === "ZENTRA-v3"}
            className="bg-[#1D2538]/70 text-white border-[#475B74]/50 rounded-lg placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200"
          />
        </div>
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-[#97CBDC] mr-2">
              Liquidity Sell Fee (%)
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-[#97CBDC]" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                  <p className="text-xs max-w-xs">
                    Percentage of tokens to add to liquidity pool on sell
                    transactions
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="text"
            name="liquiditySellFee"
            value={formState.liquiditySellFee}
            onChange={handleInputChange}
            placeholder="0"
            disabled={formState.dexRouter === "ZENTRA-v3"}
            className="bg-[#1D2538]/70 text-white border-[#475B74]/50 rounded-lg placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200"
          />
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-purple-900/10 to-[#018ABD]/10 rounded-lg border border-[#475B74]/50 mb-4">
        <div className="flex items-center mb-4">
          <label className="block text-sm font-medium text-[#97CBDC] mr-2">
            Choose Rewards
          </label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-[#97CBDC]" />
              </TooltipTrigger>
              <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                <p className="text-xs max-w-xs">
                  Select the token that holders will receive as rewards
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {["project-token", "ptt"].map((token) => (
            <button
              key={token}
              type="button"
              onClick={() => handleSelectChange("rewardsToken", token)}
              className={cn(
                "p-3 rounded-lg border transition-all duration-200 flex items-center justify-center",
                formState.rewardsToken === token
                  ? "bg-gradient-to-r from-purple-900/30 to-[#018ABD]/30 border-purple-500 text-purple-400"
                  : "bg-[#1D2538]/70 border-[#475B74]/50 text-[#97CBDC] hover:border-[#97CBDC]"
              )}
            >
              {formState.rewardsToken === token && (
                <Check className="h-4 w-4 mr-2" />
              )}
              {token === "project-token" && "Project Token"}
              {token === "ptt" && "PTT"}
            </button>
          ))}
        </div>

        <div className="mt-4 text-sm text-[#97CBDC]">
          The token you would like users to receive their rewards in. This can
          be your Project Token or PTT if you use a V2 DEX.
          {formState.dexRouter === "ZENTRA-v3" &&
            formState.rewardsToken !== "project-token" && (
              <div className="mt-2 text-red-400 flex items-start">
                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  Reward tokens other than Project Token only work with V2 DEX
                </span>
              </div>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-[#97CBDC] mr-2">
              Buy Rewards (%)
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-[#97CBDC]" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                  <p className="text-xs max-w-xs">
                    Percentage of tokens to distribute as rewards on buy
                    transactions
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="text"
            name="buyRewards"
            value={formState.buyRewards}
            onChange={handleInputChange}
            placeholder="0"
            disabled={
              formState.dexRouter === "ZENTRA-v3" &&
              formState.rewardsToken !== "project-token"
            }
            className="bg-[#1D2538]/70 text-white border-[#475B74]/50 rounded-lg placeholder:text-[#97CBDC]/50 focus:border-purple-500 transition-all duration-200"
          />
        </div>
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-[#97CBDC] mr-2">
              Sell Rewards (%)
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-[#97CBDC]" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                  <p className="text-xs max-w-xs">
                    Percentage of tokens to distribute as rewards on sell
                    transactions
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="text"
            name="sellRewards"
            value={formState.sellRewards}
            onChange={handleInputChange}
            placeholder="0"
            disabled={
              formState.dexRouter === "ZENTRA-v3" &&
              formState.rewardsToken !== "project-token"
            }
            className="bg-[#1D2538]/70 text-white border-[#475B74]/50 rounded-lg placeholder:text-[#97CBDC]/50 focus:border-purple-500 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}
