"use client";

import ConnectWallet from "@/components/ui/ConnectButton";
import { ZentraLogo } from "@/components/ZentraLogo";
import { ZentraLogoAnimated } from "@/components/ZentraLogoAnimated";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingLayout({ children }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-md border-b border-[#475B74]/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ZentraLogo size="sm" animated={true} showTagline={false} />
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#home"
                className="text-[#97CBDC] cursor-pointer hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#products"
                className="text-[#97CBDC] cursor-pointer hover:text-white transition-colors"
              >
                Products
              </a>
              <a
                href="#pharos-network"
                className="text-[#97CBDC] cursor-pointer hover:text-white transition-colors"
              >
                Pharos Network
              </a>
              <a
                href="#team"
                className="text-[#97CBDC] cursor-pointer hover:text-white transition-colors"
              >
                Team
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <ConnectWallet />
              <button
                onClick={() => navigate("/launchpad")}
                className="hidden cursor-pointer md:block bg-gradient-to-r from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl px-4 py-2 shadow-lg shadow-[#004581]/20 transition-all duration-200"
              >
                Launch App
              </button>
              <button
                className="md:hidden p-2 rounded-full bg-[#1D2538]/60 hover:bg-[#1D2538]"
                onClick={() => {
                  // This will be handled by the state in the page component
                  const event = new CustomEvent("toggleMobileMenu");
                  window.dispatchEvent(event);
                }}
              >
                <Menu className="h-5 w-5 text-[#97CBDC]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
