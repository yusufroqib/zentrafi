import { useLaunch } from "@/providers/FairLaunchProvider";
import { Info } from "lucide-react";

export default function FairLaunchStepConfig() {
	const { formData, updateFormData } = useLaunch();

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row gap-6">
				<div className="flex-1">
					<div className="space-y-4">
						{/* <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#97CBDC]">
                Launch Type
              </label>
              <div className="flex bg-[#0a0a20]/80 border border-[#475B74]/50 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => updateFormData({ launchType: "fair" })}
                  className={`flex-1 py-2 cursor-pointer px-4 rounded-lg text-sm font-medium transition-colors ${
                    formData.launchType === "fair"
                      ? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white"
                      : "text-[#97CBDC]/70 hover:text-[#97CBDC]"
                  }`}
                >
                  Fair Launch
                </button>
                <button
                  type="button"
                  onClick={() => updateFormData({ launchType: "presale" })}
                  className={`flex-1 py-2 px-4 rounded-lg cursor-pointer text-sm font-medium transition-colors ${
                    formData.launchType === "presale"
                      ? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white"
                      : "text-[#97CBDC]/70 hover:text-[#97CBDC]"
                  }`}
                >
                  Presale
                </button>
              </div>
            </div> */}

						<div className="space-y-1.5">
							<label
								htmlFor="totalSaleAmount"
								className="text-sm font-medium text-[#97CBDC]"
							>
								Total Sale Amount <span className="text-[#F0B90B]">*</span>
							</label>
							<input
								id="totalSaleAmount"
								type="number"
								value={formData.totalSaleAmount}
								onChange={(e) =>
									updateFormData({ totalSaleAmount: e.target.value })
								}
								placeholder={`Enter amount in ${
									formData.tokenSymbol || "tokens"
								}`}
								className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
							/>
							<p className="text-xs text-[#97CBDC]/50">
								Total amount of tokens to be sold
							</p>
						</div>

						<div className="space-y-1.5">
							<label
								htmlFor="refundType"
								className="text-sm font-medium text-[#97CBDC]"
							>
								Refund Type
							</label>
							<select
								id="refundType"
								value={formData.refundType}
								onChange={(e) => updateFormData({ refundType: e.target.value })}
								className="w-full px-3 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
							>
								<option value="Burn">Burn</option>
								<option value="Refund">Refund</option>
							</select>
							<p className="text-xs text-[#97CBDC]/50">
								What happens to unsold tokens
							</p>
						</div>
					</div>
				</div>

				<div className="flex-1">
					<div className="space-y-4">
						{formData.launchType === "fair" ? (
							<>
								<div className="space-y-1.5">
									<label
										htmlFor="softcap"
										className="text-sm font-medium text-[#97CBDC]"
									>
										Softcap <span className="text-[#F0B90B]">*</span>
									</label>
									<div className="relative">
										<input
											id="softcap"
											type="text"
											value={formData.softcap}
											onChange={(e) =>
												updateFormData({ softcap: e.target.value })
											}
											placeholder="0.001"
											className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200 pr-16"
										/>
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<span className="text-[#97CBDC]/70">
												{formData.currency}
											</span>
										</div>
									</div>
									<p className="text-xs text-[#97CBDC]/50">
										Minimum amount to raise for the sale to be successful
									</p>
								</div>

								<div className="space-y-1.5">
									<label
										htmlFor="liquidityPercentage"
										className="text-sm font-medium text-[#97CBDC]"
									>
										Liquidity Percentage{" "}
										<span className="text-[#F0B90B]">*</span>
									</label>
									<div className="relative">
										<input
											id="liquidityPercentage"
											type="number"
											min="1"
											max="100"
											value={formData.liquidityPercentage}
											onChange={(e) =>
												updateFormData({
													liquidityPercentage: Number.parseInt(e.target.value),
												})
											}
											className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200 pr-10"
										/>
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<span className="text-[#97CBDC]/70">%</span>
										</div>
									</div>
									<p className="text-xs text-[#97CBDC]/50">
										Percentage of raised funds that will be added as liquidity
									</p>
								</div>
							</>
						) : (
							<>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label
											htmlFor="softcap"
											className="text-sm font-medium text-[#97CBDC]"
										>
											Softcap <span className="text-[#F0B90B]">*</span>
										</label>
										<div className="relative">
											<input
												id="softcap"
												type="text"
												value={formData.softcap}
												onChange={(e) =>
													updateFormData({ softcap: e.target.value })
												}
												placeholder="0.001"
												className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200 pr-16"
											/>
											<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
												<span className="text-[#97CBDC]/70">
													{formData.currency}
												</span>
											</div>
										</div>
									</div>

									<div className="space-y-1.5">
										<label
											htmlFor="hardcap"
											className="text-sm font-medium text-[#97CBDC]"
										>
											Hardcap <span className="text-[#F0B90B]">*</span>
										</label>
										<div className="relative">
											<input
												id="hardcap"
												type="text"
												value={formData.hardcap}
												onChange={(e) =>
													updateFormData({ hardcap: e.target.value })
												}
												placeholder="0.01"
												className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200 pr-16"
											/>
											<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
												<span className="text-[#97CBDC]/70">
													{formData.currency}
												</span>
											</div>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label
											htmlFor="minContribution"
											className="text-sm font-medium text-[#97CBDC]"
										>
											Minimum Contribution
										</label>
										<div className="relative">
											<input
												id="minContribution"
												type="text"
												value={formData.minContribution}
												onChange={(e) =>
													updateFormData({ minContribution: e.target.value })
												}
												placeholder="0.0001"
												className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200 pr-16"
											/>
											<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
												<span className="text-[#97CBDC]/70">
													{formData.currency}
												</span>
											</div>
										</div>
									</div>

									<div className="space-y-1.5">
										<label
											htmlFor="maxContribution"
											className="text-sm font-medium text-[#97CBDC]"
										>
											Maximum Contribution
										</label>
										<div className="relative">
											<input
												id="maxContribution"
												type="text"
												value={formData.maxContribution}
												onChange={(e) =>
													updateFormData({ maxContribution: e.target.value })
												}
												placeholder="0.01"
												className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200 pr-16"
											/>
											<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
												<span className="text-[#97CBDC]/70">
													{formData.currency}
												</span>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			<div className="border-t border-[#475B74]/30 pt-6">
				{/* <div className="flex items-center mb-4">
          <label
            htmlFor="enableVesting"
            className="flex items-center cursor-pointer"
          >
            <input
              id="enableVesting"
              type="checkbox"
              checked={formData.enableVesting}
              onChange={(e) =>
                updateFormData({ enableVesting: e.target.checked })
              }
              className="w-4 h-4 text-[#018ABD] bg-[#0a0a20] border-[#475B74] rounded"
            />
            <span className="ml-2 text-sm font-medium text-[#97CBDC]">
              Enable Token Vesting
            </span>
          </label>
          <div className="ml-2 group relative">
            <Info className="h-4 w-4 text-[#97CBDC]/50 cursor-pointer" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#0a0a20] border border-[#475B74]/50 text-[#97CBDC] text-xs p-2 rounded-md w-48 z-10">
              Configure token vesting to release tokens gradually over time
            </div>
          </div>
        </div> */}

				{formData.enableVesting && (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#0a0a20]/60 rounded-xl border border-[#475B74]/30">
						<div className="space-y-1.5">
							<label
								htmlFor="vestingFirstRelease"
								className="text-sm font-medium text-[#97CBDC]"
							>
								First Release (%)
							</label>
							<div className="relative">
								<input
									id="vestingFirstRelease"
									type="number"
									min="0"
									max="100"
									value={formData.vestingFirstRelease}
									onChange={(e) =>
										updateFormData({
											vestingFirstRelease: Number.parseInt(e.target.value),
										})
									}
									className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200 pr-10"
								/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<span className="text-[#97CBDC]/70">%</span>
								</div>
							</div>
							<p className="text-xs text-[#97CBDC]/50">
								Percentage of tokens released at TGE
							</p>
						</div>

						<div className="space-y-1.5">
							<label
								htmlFor="vestingPeriod"
								className="text-sm font-medium text-[#97CBDC]"
							>
								Vesting Period (days)
							</label>
							<input
								id="vestingPeriod"
								type="number"
								min="1"
								value={formData.vestingPeriod}
								onChange={(e) =>
									updateFormData({
										vestingPeriod: Number.parseInt(e.target.value),
									})
								}
								className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
							/>
							<p className="text-xs text-[#97CBDC]/50">
								Days between each token release
							</p>
						</div>

						<div className="space-y-1.5">
							<label
								htmlFor="vestingRelease"
								className="text-sm font-medium text-[#97CBDC]"
							>
								Each Release (%)
							</label>
							<div className="relative">
								<input
									id="vestingRelease"
									type="number"
									min="0"
									max="100"
									value={formData.vestingRelease}
									onChange={(e) =>
										updateFormData({
											vestingRelease: Number.parseInt(e.target.value),
										})
									}
									className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200 pr-10"
								/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<span className="text-[#97CBDC]/70">%</span>
								</div>
							</div>
							<p className="text-xs text-[#97CBDC]/50">
								Percentage of tokens released each period
							</p>
						</div>
					</div>
				)}
			</div>

			<div className="bg-[#0a0a20]/60 border border-[#F0B90B]/30 rounded-xl p-4 flex items-start gap-3">
				<Info className="h-5 w-5 text-[#F0B90B] mt-0.5" />
				<div>
					<h3 className="font-medium text-[#97CBDC]">Important</h3>
					<p className="text-sm text-[#97CBDC]/70">
						You will need{" "}
						{Number(
							Number(formData.totalSaleAmount) +
								(Number(formData.totalSaleAmount) * Number(formData.liquidityPercentage)) / 100
						).toLocaleString() || "0"}{" "}
						{formData.tokenSymbol || "tokens"} to create this{" "}
						{formData.launchType === "fair" ? "Fair Launch" : "Presale"}. Make
						sure you have enough tokens in your wallet before proceeding.
					</p>
				</div>
			</div>
		</div>
	);
} // totalTokens + (totalTokens * liquidityPercent) / 100
