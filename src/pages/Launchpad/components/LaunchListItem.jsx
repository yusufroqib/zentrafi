"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Diamond,
  Clock,
  TrendingUp,
  Wallet,
  Star,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function LaunchListItem({ launch, isHovered }) {
  const getStatusColor = () => {
    switch (launch.status) {
      case "LIVE":
        return "bg-gradient-to-r from-green-500 to-green-400 text-green-100";
      case "UPCOMING":
        return "bg-gradient-to-r from-blue-500 to-blue-400 text-blue-100";
      case "COMPLETED":
        return "bg-gradient-to-r from-purple-500 to-purple-400 text-purple-100";
      case "BONDING":
        return "bg-gradient-to-r from-purple-600 to-purple-500 text-purple-100";
      case "ENDED":
        return "bg-gradient-to-r from-gray-500 to-gray-400 text-gray-100";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-400 text-gray-100";
    }
  };

  const getProgressBarColor = () => {
    switch (launch.status) {
      case "UPCOMING":
        return "bg-gradient-to-r from-blue-600 to-blue-400";
      case "BONDING":
        return "bg-gradient-to-r from-purple-600 to-purple-400";
      case "LIVE":
        return "bg-gradient-to-r from-green-500 to-green-400";
      case "COMPLETED":
        return "bg-gradient-to-r from-green-500 to-green-400";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-400";
    }
  };

  return (
    <motion.div
      className={cn(
        "bg-gradient-to-r from-[#1D2538]/90 to-[#1D2538] rounded-xl overflow-hidden border border-[#475B74]/50 shadow-xl backdrop-blur-sm transition-all duration-300 relative z-10 group",
        isHovered && "border-[#018ABD]/70 shadow-[#018ABD]/5"
      )}
      animate={{
        y: isHovered ? -2 : 0,
        transition: { duration: 0.2 },
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

      <div className="flex flex-col md:flex-row items-center p-4 gap-4 relative">
        <div className="flex items-center gap-4 w-full md:w-1/3">
          <div className="relative">
            <motion.div
              className="h-14 w-14 rounded-full overflow-hidden border-2 border-[#475B74] shadow-lg"
              animate={{
                scale: isHovered ? 1.05 : 1,
                transition: { duration: 0.2 },
              }}
            >
              <image
                src={launch.icon || "/placeholder.svg?height=60&width=60"}
                alt={`${launch.name} icon`}
                width={56}
                height={56}
                className="object-cover"
              />
            </motion.div>
            {launch.featured && (
              <div className="absolute -top-1 -right-1">
                <div className="bg-gradient-to-r from-yellow-500 to-amber-300 p-1 rounded-full shadow-lg">
                  <Star className="h-3 w-3 text-white fill-white" />
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge
                className={`${getStatusColor()} text-xs font-medium px-2 py-0.5 rounded-full shadow-lg`}
              >
                {launch.status === "LIVE" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-1 animate-pulse"></span>
                )}
                {launch.status}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-white">{launch.name}</h3>
            {launch.participants && (
              <div className="flex items-center gap-1 text-xs text-[#97CBDC]">
                <Users className="h-3 w-3" />
                <span>{launch.participants} participants</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-2/3">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
            <div className="bg-[#1D2538]/60 rounded-xl p-2 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-colors duration-300 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Wallet className="h-4 w-4 text-[#018ABD]" />
                <span className="text-xs text-[#97CBDC]">Progress</span>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-[#DDEEFF]">
                  {launch.progress.toFixed(2)}%
                </p>
                <div className="h-1.5 w-full bg-[#1D2538] rounded-full overflow-hidden mt-1">
                  <motion.div
                    className={`h-full ${getProgressBarColor()} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(launch.progress, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
            </div>

            <div className="bg-[#1D2538]/60 rounded-xl p-2 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-colors duration-300 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-[#018ABD]" />
                <span className="text-xs text-[#97CBDC]">Total Raised</span>
              </div>
              <p className="text-sm font-semibold text-[#DDEEFF]">
                {launch.totalRaised || "0"} ETH
              </p>
            </div>

            <div className="bg-[#1D2538]/60 rounded-xl p-2 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-colors duration-300 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-[#97CBDC]" />
                <span className="text-xs text-[#97CBDC]">Start Time</span>
              </div>
              <p className="text-sm font-semibold text-[#DDEEFF]">
                {launch.startTime}
              </p>
            </div>
          </div>

          <motion.div
            className="w-full md:w-1/3"
            animate={{
              scale: isHovered ? 1.02 : 1,
              transition: { duration: 0.2 },
            }}
          >
            <Button className="w-full bg-gradient-to-r from-[#004581] cursor-pointer to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl h-10 shadow-lg shadow-[#004581]/20 transition-all duration-200 font-medium group">
              <span>VIEW SALE</span>
              <ArrowUpRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
