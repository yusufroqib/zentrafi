"use client";

import { useState, useEffect } from "react";
import {
  Search,
  TrendingUp,
  DollarSign,
  BarChart2,
  Briefcase,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ZentraLogo } from "@/components/ZentraLogo";
import { motion } from "framer-motion";
import { ZentraLogoAnimated } from "@/components/ZentraLogoAnimated";

export function PortfolioDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("token");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isClient, setIsClient] = useState(false);

  // Sample data - replace with actual data in production
  const portfolioStats = {
    totalValue: "$0",
    totalVolume: "$0",
    totalTrades: "0",
    activePositions: "0",
  };

  const tokens = [];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full min-h-screen text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full border-[0.5px] border-[#018ABD]/20 [background-size:50px_50px] [background-image:linear-gradient(to_right,#018ABD10_1px,transparent_1px),linear-gradient(to_bottom,#018ABD10_1px,transparent_1px)]"></div>
          </div>

          {/* Gradient spots */}
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#018ABD]/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-24 -bottom-24 w-64 h-64 bg-[#004581]/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ZentraLogoAnimated size="lg" showTagline={false} />
            <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          </div>
        </div>

        {/* Portfolio Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 bg-[#1D2538]/40 backdrop-blur-sm rounded-2xl p-6 border border-[#475B74]/50 shadow-xl"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-[#018ABD]" />
            Portfolio Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Value Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.1)",
              }}
              className="bg-[#1D2538]/60 rounded-xl p-5 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#97CBDC] text-sm font-medium uppercase tracking-wider">
                  TOTAL VALUE
                </p>
                <div className="bg-[#018ABD]/20 p-1.5 rounded-lg">
                  <DollarSign className="h-5 w-5 text-[#018ABD] group-hover:text-[#018ABD] transition-colors" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">
                {portfolioStats.totalValue}
              </p>
              <div className="mt-3 h-1 w-full bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-full opacity-70"></div>
            </motion.div>

            {/* Total Volume Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.1)",
              }}
              className="bg-[#1D2538]/60 rounded-xl p-5 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#97CBDC] text-sm font-medium uppercase tracking-wider">
                  TOTAL VOLUME
                </p>
                <div className="bg-[#018ABD]/20 p-1.5 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-[#018ABD] group-hover:text-[#018ABD] transition-colors" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">
                {portfolioStats.totalVolume}
              </p>
              <div className="mt-3 h-1 w-full bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-full opacity-70"></div>
            </motion.div>

            {/* Total Trades Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.1)",
              }}
              className="bg-[#1D2538]/60 rounded-xl p-5 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#97CBDC] text-sm font-medium uppercase tracking-wider">
                  TOTAL TRADES
                </p>
                <div className="bg-[#018ABD]/20 p-1.5 rounded-lg">
                  <BarChart2 className="h-5 w-5 text-[#018ABD] group-hover:text-[#018ABD] transition-colors" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">
                {portfolioStats.totalTrades}
              </p>
              <div className="mt-3 h-1 w-full bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-full opacity-70"></div>
            </motion.div>

            {/* Active Positions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.1)",
              }}
              className="bg-[#1D2538]/60 rounded-xl p-5 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#97CBDC] text-sm font-medium uppercase tracking-wider">
                  ACTIVE POSITIONS
                </p>
                <div className="bg-[#018ABD]/20 p-1.5 rounded-lg">
                  <Layers className="h-5 w-5 text-[#018ABD] group-hover:text-[#018ABD] transition-colors" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">
                {portfolioStats.activePositions}
              </p>
              <div className="mt-3 h-1 w-full bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-full opacity-70"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Zentra Tokens Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1D2538]/40 backdrop-blur-sm rounded-2xl p-6 border border-[#475B74]/50 shadow-xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <ZentraLogo showTagline={ false} size="sm" />  <span className="ml-2">Tokens</span>
            </h2>

            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#97CBDC]" />
              </div>
              <input
                type="text"
                placeholder="Search tokens..."
                className="w-full md:w-80 pl-10 pr-4 py-2 bg-[#1D2538]/60 border border-[#475B74]/50 rounded-lg text-white placeholder-[#97CBDC] focus:outline-none focus:ring-2 focus:ring-[#018ABD]/50 focus:border-[#018ABD]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tokens Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#475B74]/50">
                  <th
                    className="text-left py-4 px-2 text-[#97CBDC] text-sm font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("token")}
                  >
                    <div className="flex items-center">
                      Token
                      {sortColumn === "token" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4 text-[#018ABD]" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4 text-[#018ABD]" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="text-left py-4 px-2 text-[#97CBDC] text-sm font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("balance")}
                  >
                    <div className="flex items-center">
                      Balance
                      {sortColumn === "balance" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4 text-[#018ABD]" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4 text-[#018ABD]" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="text-left py-4 px-2 text-[#97CBDC] text-sm font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center">
                      Price
                      {sortColumn === "price" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4 text-[#018ABD]" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4 text-[#018ABD]" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="text-left py-4 px-2 text-[#97CBDC] text-sm font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("value")}
                  >
                    <div className="flex items-center">
                      Value (USD)
                      {sortColumn === "value" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4 text-[#018ABD]" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4 text-[#018ABD]" />
                        ))}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tokens.length > 0 ? (
                  tokens.map((token, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-[#475B74]/30 hover:bg-[#018ABD]/5 transition-colors"
                    >
                      <td className="py-4 px-2 text-white">{token.name}</td>
                      <td className="py-4 px-2 text-white">{token.balance}</td>
                      <td className="py-4 px-2 text-white">{token.price}</td>
                      <td className="py-4 px-2 text-white">{token.value}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-16 text-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <div className="bg-[#1D2538]/80 p-4 rounded-full mb-4">
                          <Layers className="h-10 w-10 text-[#018ABD]/50" />
                        </div>
                        <p className="text-lg text-white font-medium">
                          No tokens found
                        </p>
                        <p className="text-sm text-[#97CBDC] mt-1 max-w-md">
                          Connect your wallet to view your tokens or add tokens
                          to your portfolio
                        </p>
                      </motion.div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
