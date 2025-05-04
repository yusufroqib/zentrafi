import { Flame, Info, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function TaxSettingsForm({
  formState,
  handleInputChange,
  errors,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-orange-500/20 p-2 rounded-lg">
          <Flame className="h-5 w-5 text-orange-400" />
        </div>
        <h3 className="text-lg font-bold text-orange-400">Tax Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <label className="block text-sm font-medium text-[#97CBDC] mr-2">
                Buy Tax (%)
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-[#97CBDC]" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                    <p className="text-xs max-w-xs">
                      Fee applied when someone buys your token
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <Input
            type="text"
            name="buyTax"
            value={formState.buyTax}
            onChange={handleInputChange}
            placeholder="0"
            className="bg-[#1D2538]/70 text-white border-[#475B74]/50 rounded-lg placeholder:text-[#97CBDC]/50 focus:border-orange-500 transition-all duration-200"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <label className="block text-sm font-medium text-[#97CBDC] mr-2">
                Sell Tax (%)<span className="text-red-500">*</span>
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-[#97CBDC]" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                    <p className="text-xs max-w-xs">
                      Fee applied when someone sells your token
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <Input
            type="text"
            name="sellTax"
            value={formState.sellTax}
            onChange={handleInputChange}
            placeholder="0"
            className="bg-[#1D2538]/70 text-white border-[#475B74]/50 rounded-lg placeholder:text-[#97CBDC]/50 focus:border-orange-500 transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <label className="block text-sm font-medium text-[#97CBDC] mr-2">
              Tax Receiver<span className="text-red-500">*</span>
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-[#97CBDC]" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1D2538] border-[#475B74] text-white">
                  <p className="text-xs max-w-xs">
                    Wallet address that will receive the tax fees
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {errors.taxReceiver && (
            <span className="text-xs text-red-400 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.taxReceiver}
            </span>
          )}
        </div>
        <Input
          type="text"
          name="taxReceiver"
          value={formState.taxReceiver}
          onChange={handleInputChange}
          placeholder="Eg: 0x1234..."
          className={cn(
            "bg-[#1D2538]/70 text-white border-[#475B74]/50 rounded-lg placeholder:text-[#97CBDC]/50 focus:border-orange-500 transition-all duration-200",
            errors.taxReceiver && "border-red-500 focus:border-red-500"
          )}
        />
      </div>
    </div>
  );
}
