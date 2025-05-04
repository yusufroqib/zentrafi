import { useLaunch } from "@/providers/FairLaunchProvider";
import { Calendar, Clock, Info } from "lucide-react";

export default function FairLaunchScheduleStep() {
  const { formData, updateFormData } = useLaunch();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="startTime"
              className="text-sm font-medium text-[#97CBDC]"
            >
              Start Time <span className="text-[#F0B90B]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="h-5 w-5 text-[#97CBDC]/50" />
              </div>
              <input
                id="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => updateFormData({ startTime: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
              />
            </div>
            <p className="text-xs text-[#97CBDC]/50">
              When the token launch will start (local time)
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="endTime"
              className="text-sm font-medium text-[#97CBDC]"
            >
              End Time <span className="text-[#F0B90B]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Clock className="h-5 w-5 text-[#97CBDC]/50" />
              </div>
              <input
                id="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => updateFormData({ endTime: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
              />
            </div>
            <p className="text-xs text-[#97CBDC]/50">
              When the token launch will end (local time)
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="liquidityLockDuration"
              className="text-sm font-medium text-[#97CBDC]"
            >
              Liquidity Lock Duration <span className="text-[#F0B90B]">*</span>
            </label>
            <div className="relative">
              <input
                id="liquidityLockDuration"
                type="number"
                required
                min="1"
                value={formData.liquidityLockDuration}
                onChange={(e) =>
                  updateFormData({
                    liquidityLockDuration: Number.parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200 pr-16"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-[#97CBDC]/70">days</span>
              </div>
            </div>
            <p className="text-xs text-[#97CBDC]/50">
              How long the liquidity will be locked
            </p>
          </div>

          <div className="p-4 bg-[#0a0a20]/60 rounded-xl border border-[#475B74]/30 mt-6">
            <h3 className="font-medium text-[#97CBDC] mb-2">
              Timeline Preview
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#97CBDC]/70">Launch Start:</span>
                <span className="font-medium text-[#97CBDC]">
                  {formData.startTime
                    ? new Date(formData.startTime).toLocaleString()
                    : "Not set"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#97CBDC]/70">Launch End:</span>
                <span className="font-medium text-[#97CBDC]">
                  {formData.endTime
                    ? new Date(formData.endTime).toLocaleString()
                    : "Not set"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#97CBDC]/70">Liquidity Unlock:</span>
                <span className="font-medium text-[#97CBDC]">
                  {formData.endTime && formData.liquidityLockDuration
                    ? new Date(
                        new Date(formData.endTime).getTime() +
                          formData.liquidityLockDuration * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()
                    : "Not set"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0a20]/60 border border-[#018ABD]/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-[#018ABD] mt-0.5" />
        <div>
          <h3 className="font-medium text-[#97CBDC]">Schedule Tips</h3>
          <ul className="text-sm text-[#97CBDC]/70 list-disc pl-5 mt-1 space-y-1">
            <li>
              Set your start time at least 24 hours in the future to allow for
              marketing
            </li>
            <li>
              Recommended sale duration is 3-7 days for maximum participation
            </li>
            <li>
              Longer liquidity locks (180+ days) build more trust with investors
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
