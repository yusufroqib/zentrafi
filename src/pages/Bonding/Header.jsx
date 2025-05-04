"use client";

import { Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";

export default function LaunchHeader() {
  const account = useAccount();
  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-r from-[#1D2538]/90 to-[#1D2538] backdrop-blur-sm border border-[#475B74]/50 rounded-3xl shadow-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1200')] opacity-5 bg-cover bg-center"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#018ABD]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#97CBDC]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative p-6">
        <div className="flex items-start gap-4">
          <motion.div
            className="bg-gradient-to-br from-[#004581] to-[#018ABD] p-3 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Rocket size={32} className="text-white" />
          </motion.div>
          <div>
            <motion.h1
              className="text-3xl font-bold bg-gradient-to-r from-[#018ABD] via-[#97CBDC] to-[#DDEF0] bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Pump Launch
            </motion.h1>
            <motion.p
              className="text-[#97CBDC] mt-2 max-w-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Create & Launch a token in one transaction for 0.0003{" "}
              {account?.chain?.nativeCurrency.symbol || "ETH"}. Fixed supply of
              1 billion tokens with 1% to your Dev wallet. Users can trade &
              withdraw on the bonding curve until the market cap is reached.
              Auto-listed on a V3 DEX at $69k with LP burned.
            </motion.p>

            {/* <motion.div
              className="mt-4 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/docs/launch"
                className="inline-flex items-center text-[#018ABD] hover:text-white transition-colors text-sm"
              >
                <ArrowRight className="mr-1 h-3 w-3" />
                Read Documentation
              </Link>
              <Link
                href="/examples"
                className="inline-flex items-center text-[#018ABD] hover:text-white transition-colors text-sm"
              >
                <ArrowRight className="mr-1 h-3 w-3" />
                View Examples
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center text-[#018ABD] hover:text-white transition-colors text-sm"
              >
                <ArrowRight className="mr-1 h-3 w-3" />
                FAQ
              </Link>
            </motion.div> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
