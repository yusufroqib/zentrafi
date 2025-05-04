import { CoinsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#1D2538]/90 to-[#1D2538] rounded-3xl p-6 mb-8 border border-[#475B74]/50 shadow-xl">
      <div className="absolute inset-0 bg-[url('/Pharos-chain.jpg')] opacity-5 bg-cover bg-center"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#018ABD]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#97CBDC]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-[#018ABD] to-[#004581] p-3 rounded-xl shadow-lg">
            <CoinsIcon size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#018ABD] via-[#97CBDC] to-[#DDEF0] bg-clip-text text-transparent">
              Create a Token
            </h1>
            <p className="text-[#97CBDC] mt-1">
              Zero Code Knowledge Required. Complete in 60 Seconds!
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/bonding-token-sale")}
          className="animate-bounce cursor-pointer bg-gradient-to-r from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl shadow-lg shadow-[#004581]/20 transition-all duration-300 transform hover:scale-105 px-6 py-6 h-auto font-bold"
        >
          CREATE A PUMP SALE HERE
        </button>
      </div>
    </div>
  );
}
