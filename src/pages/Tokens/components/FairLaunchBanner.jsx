import { Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FairLaunchBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#1D2538]/90 to-[#1D2538] rounded-xl p-6 border border-[#475B74]/50 shadow-xl">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1200')] opacity-5 bg-cover bg-center"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#018ABD]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#97CBDC]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="bg-gradient-to-br from-[#018ABD] to-[#004581] p-3 rounded-xl shadow-lg hidden md:block">
            <Rocket size={32} className="text-white" />
          </div>
          <div>
            <p className="text-[#97CBDC] text-sm md:text-base">
              After creating your token you can use our{" "}
              <Link
                href="/fairlaunch"
                className="text-[#018ABD] font-medium hover:text-[#97CBDC] transition-colors underline decoration-dotted"
              >
                Fair Launch app
              </Link>{" "}
              to fund your liquidity pool and project. The automated,
              decentralized process ensures safety and efficiency. Add & lock
              liquidity, list on a V2 or V3 DEX, view charts, and start trading.
              All from just $7.
            </p>
          </div>
        </div>
        <Link
          href="/fairlaunch"
          className="bg-gradient-to-r animate-bounce from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl px-6 py-3 font-bold shadow-lg shadow-[#004581]/20 transition-all duration-300 transform hover:scale-105 flex items-center whitespace-nowrap"
        >
          Launch Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
