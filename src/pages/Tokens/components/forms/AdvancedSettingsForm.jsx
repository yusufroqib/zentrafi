import { Sparkles, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AdvancedSettingsForm({ formState, handleInputChange }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-purple-500/20 p-2 rounded-lg">
          <Sparkles className="h-5 w-5 text-purple-400" />
        </div>
        <h3 className="text-lg font-bold text-purple-400">Advanced Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-[#97CBDC] mr-2">
              Max Transaction<span className="text-red-500">*</span>
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-[#97CBDC]" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                  <p className="text-xs max-w-xs">
                    Maximum amount of tokens that can be transferred in a single
                    transaction (0 = unlimited)
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="text"
            name="maxTransaction"
            value={formState.maxTransaction}
            onChange={handleInputChange}
            placeholder="0"
            className="bg-[#1D2538]/70 text-white border-[#475B74]/50 rounded-lg placeholder:text-[#97CBDC]/50 focus:border-purple-500 transition-all duration-200"
          />
        </div>
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-[#97CBDC] mr-2">
              Max Wallet<span className="text-red-500">*</span>
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-[#97CBDC]" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                  <p className="text-xs max-w-xs">
                    Maximum amount of tokens that a wallet can hold (0 =
                    unlimited)
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="text"
            name="maxWallet"
            value={formState.maxWallet}
            onChange={handleInputChange}
            placeholder="0"
            className="bg-[#1D2538]/70 text-white border-[#475B74]/50 rounded-lg placeholder:text-[#97CBDC]/50 focus:border-purple-500 transition-all duration-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-[#97CBDC] mr-2">
              Buy Burn Fee (%)
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-[#97CBDC]" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                  <p className="text-xs max-w-xs">
                    Percentage of tokens to burn on buy transactions
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="text"
            name="buyBurnFee"
            value={formState.buyBurnFee}
            onChange={handleInputChange}
            placeholder="0"
            className="bg-[#1D2538]/70 text-white border-[#475B74]/50 rounded-lg placeholder:text-[#97CBDC]/50 focus:border-purple-500 transition-all duration-200"
          />
        </div>
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-[#97CBDC] mr-2">
              Sell Burn Fee (%)
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-[#97CBDC]" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                  <p className="text-xs max-w-xs">
                    Percentage of tokens to burn on sell transactions
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="text"
            name="sellBurnFee"
            value={formState.sellBurnFee}
            onChange={handleInputChange}
            placeholder="0"
            className="bg-[#1D2538]/70 text-white border-[#475B74]/50 rounded-lg placeholder:text-[#97CBDC]/50 focus:border-purple-500 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}
