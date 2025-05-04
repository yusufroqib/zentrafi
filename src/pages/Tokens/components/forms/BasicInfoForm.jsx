import { CoinsIcon, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function BasicInfoForm({
  formState,
  handleInputChange,
  errors,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#018ABD]/20 p-2 rounded-lg">
          <CoinsIcon className="h-5 w-5 text-[#018ABD]" />
        </div>
        <h3 className="text-lg font-bold text-[#018ABD]">Basic Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#97CBDC]">
              Name<span className="text-red-500">*</span>
            </label>
            {errors.name && (
              <span className="text-xs text-red-400 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.name}
              </span>
            )}
          </div>
          <Input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            placeholder="Eg: Degen Coin"
            className={cn(
              "bg-[#1D2538]/70 border-[#475B74]/50 rounded-lg text-white placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200",
              errors.name && "border-red-500 focus:border-red-500"
            )}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#97CBDC]">
              Symbol<span className="text-red-500">*</span>
            </label>
            {errors.symbol && (
              <span className="text-xs text-red-400 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.symbol}
              </span>
            )}
          </div>
          <Input
            type="text"
            name="symbol"
            value={formState.symbol}
            onChange={handleInputChange}
            placeholder="Eg: DGN"
            className={cn(
              "bg-[#1D2538]/70 border-[#475B74]/50 text-white rounded-lg placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200",
              errors.symbol && "border-red-500 focus:border-red-500"
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#97CBDC]">
              Supply<span className="text-red-500">*</span>
            </label>
            {errors.supply && (
              <span className="text-xs text-red-400 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.supply}
              </span>
            )}
          </div>
          <Input
            type="text"
            name="supply"
            value={formState.supply}
            onChange={handleInputChange}
            placeholder="Eg: 1000000000"
            className={cn(
              "bg-[#1D2538]/70 border-[#475B74]/50 text-white rounded-lg placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200",
              errors.supply && "border-red-500 focus:border-red-500"
            )}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#97CBDC]">
              Decimals<span className="text-red-500">*</span>
            </label>
            {errors.decimals && (
              <span className="text-xs text-red-400 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.decimals}
              </span>
            )}
          </div>
          <Input
            type="text"
            name="decimals"
            value={formState.decimals}
            onChange={handleInputChange}
            placeholder="Eg: 18"
            className={cn(
              "bg-[#1D2538]/70 border-[#475B74]/50 text-white rounded-lg placeholder:text-[#97CBDC]/50 focus:border-[#018ABD] transition-all duration-200",
              errors.decimals && "border-red-500 focus:border-red-500"
            )}
          />
        </div>
      </div>
    </div>
  );
}
