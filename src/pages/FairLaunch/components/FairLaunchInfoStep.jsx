"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertCircle, CheckCircle, Info } from "lucide-react";
import { toast } from "react-toastify";
import { useLaunch } from "@/providers/FairLaunchProvider";
import { useAccount } from "wagmi";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { formatUnits } from "viem";

export default function FairLaunchStepInfo() {
  const { address } = useAccount();
  const account = useAccount();
  const { formData, updateFormData } = useLaunch();
  const [debouncedTokenAddress, setDebouncedTokenAddress] = useState("");
  const [error, setError] = useState("");
  const symbol = account?.chain?.nativeCurrency?.symbol || "ETH";

  // Set up debounced token address for better UX
  useEffect(() => {
    // Only update debounced address if it's different to avoid unnecessary re-renders
    if (formData.tokenAddress !== debouncedTokenAddress) {
      const timer = setTimeout(() => {
        setDebouncedTokenAddress(formData.tokenAddress);
      }, 500); // 500ms delay

      return () => clearTimeout(timer);
    }
  }, [formData.tokenAddress, debouncedTokenAddress]);

  // Use the token info hook
  const { tokenInfo, isLoadingToken, tokenError, fetchTokenInfo } =
    useTokenInfo(debouncedTokenAddress, address);

  // Update form data when token info changes
  useEffect(() => {
    if (tokenInfo && !formData.isTokenLoaded) {
      const formattedSupply = tokenInfo.totalSupply
        ? formatUnits(tokenInfo.totalSupply, tokenInfo.decimal).toString()
        : "0";

      updateFormData({
        tokenName: tokenInfo.name,
        tokenSymbol: tokenInfo.symbol,
        tokenDecimals: tokenInfo.decimal,
        tokenSupply: formattedSupply,
        isTokenLoaded: true,
      });

      toast.success("Token information loaded successfully");
    }
  }, [tokenInfo, formData.isTokenLoaded, updateFormData]);

  // Handle token address changes
  const handleTokenAddressChange = (e) => {
    updateFormData({
      tokenAddress: e.target.value,
      isTokenLoaded: false,
    });
    setError("");
  };

  // Handle token error
  useEffect(() => {
    if (tokenError) {
      setError(tokenError);
      // Reset token loaded state if there's an error
      if (formData.isTokenLoaded) {
        updateFormData({ isTokenLoaded: false });
      }
    }
  }, [tokenError, formData.isTokenLoaded, updateFormData]);

  // Handle fetch token button click
  const handleFetchToken = () => {
    if (
      !formData.tokenAddress ||
      formData.tokenAddress.length !== 42 ||
      !formData.tokenAddress.startsWith("0x")
    ) {
      setError("Please enter a valid token address");
      return;
    }

    setError("");
    fetchTokenInfo();
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="tokenAddress"
            className="text-sm font-medium text-[#97CBDC]"
          >
            Token Address <span className="text-[#F0B90B]">*</span>
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                id="tokenAddress"
                type="text"
                value={formData.tokenAddress}
                onChange={handleTokenAddressChange}
                placeholder="Enter your token contract address (0x...)"
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  error ? "border-red-500" : "border-[#475B74]"
                } bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200`}
              />
              {error && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            <button
              onClick={handleFetchToken}
              disabled={isLoadingToken || !formData.tokenAddress}
              className="px-4 py-2.5 cursor-pointer rounded-xl bg-gradient-to-r from-[#004581] to-[#018ABD] text-white hover:from-[#003b6e] hover:to-[#0179a3] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center shadow-lg shadow-[#004581]/20"
            >
              {isLoadingToken ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading</span>
                </>
              ) : (
                <span>Fetch Info</span>
              )}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        {formData.isTokenLoaded && (
          <div className="bg-[#0a0a20]/60 border border-[#018ABD]/30 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-[#018ABD] mt-0.5" />
            <div>
              <h3 className="font-medium text-[#97CBDC]">
                Token loaded successfully
              </h3>
              <p className="text-sm text-[#97CBDC]/70">
                Your token information has been loaded and verified. You can
                proceed to the next step.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-[#97CBDC]">Token Information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm text-[#97CBDC]/70">Name</label>
              <div className="p-3 bg-[#0a0a20]/80 border border-[#475B74] rounded-xl text-[#97CBDC]">
                {formData.isTokenLoaded ? formData.tokenName : "—"}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-[#97CBDC]/70">Symbol</label>
              <div className="p-3 bg-[#0a0a20]/80 border border-[#475B74] rounded-xl text-[#97CBDC]">
                {formData.isTokenLoaded ? formData.tokenSymbol : "—"}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-[#97CBDC]/70">Decimals</label>
              <div className="p-3 bg-[#0a0a20]/80 border border-[#475B74] rounded-xl text-[#97CBDC]">
                {formData.isTokenLoaded ? formData.tokenDecimals : "—"}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-[#97CBDC]/70">Total Supply</label>
              <div className="p-3 bg-[#0a0a20]/80 border border-[#475B74] rounded-xl text-[#97CBDC]">
                {formData.isTokenLoaded
                  ? Number(formData.tokenSupply).toLocaleString()
                  : "—"}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-[#97CBDC]">Launch Settings</h3>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="dex" className="text-sm text-[#97CBDC]">
                Select DEX
              </label>
              <select
                id="dex"
                value={formData.dex}
                onChange={(e) => updateFormData({ dex: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
              >
                <option value="Zentra V2">Zentra V2</option>
                <option value="Zentra V3">Zentra V3</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-[#97CBDC]">Currency</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="currency"
                    checked={true}
                    onChange={() =>
                      updateFormData({
                        currency: symbol,
                      })
                    }
                    className="w-4 h-4 text-[#018ABD] bg-[#0a0a20] border-[#475B74]"
                  />
                  <span className="text-[#97CBDC]">
                    {symbol}
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-[#97CBDC]">Platform Fee</label>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fee"
                  checked={true}
                  onChange={() => {}} // Empty handler since this is always checked
                  className="w-4 h-4 text-[#018ABD] bg-[#0a0a20] border-[#475B74]"
                />
                <span className="text-[#97CBDC]">
                  {formData.fee} {symbol}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0a20]/60 border border-[#F0B90B]/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-[#F0B90B] mt-0.5" />
        <div>
          <h3 className="font-medium text-[#97CBDC]">What happens next?</h3>
          <p className="text-sm text-[#97CBDC]/70">
            After fetching your token information, you'll configure your launch
            parameters, set the schedule, and add project details before
            reviewing and submitting your token launch.
          </p>
        </div>
      </div>
    </div>
  );
}
