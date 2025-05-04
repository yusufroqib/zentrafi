import { motion } from "framer-motion";

export function LoadingCard() {
  return (
    <div className="bg-gradient-to-b from-[#1D2538]/90 to-[#1D2538] rounded-3xl overflow-hidden border border-[#475B74]/50 shadow-xl backdrop-blur-sm">
      <div className="relative h-48">
        <div className="absolute inset-0 bg-[#1D2538]/50 animate-pulse"></div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-[#475B74]/50 h-6 w-20 rounded-full animate-pulse"></div>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <div className="h-16 w-16 rounded-full bg-[#475B74]/50 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-6 w-32 bg-[#475B74]/50 rounded-md animate-pulse"></div>
            <div className="h-3 w-20 bg-[#475B74]/50 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1D2538]/60 rounded-xl p-3 border border-[#475B74]/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-4 rounded-full bg-[#475B74]/50 animate-pulse"></div>
              <div className="h-3 w-16 bg-[#475B74]/50 rounded-md animate-pulse"></div>
            </div>
            <div className="h-6 w-16 bg-[#475B74]/50 rounded-md animate-pulse"></div>
          </div>

          <div className="bg-[#1D2538]/60 rounded-xl p-3 border border-[#475B74]/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-4 rounded-full bg-[#475B74]/50 animate-pulse"></div>
              <div className="h-3 w-16 bg-[#475B74]/50 rounded-md animate-pulse"></div>
            </div>
            <div className="h-6 w-16 bg-[#475B74]/50 rounded-md animate-pulse"></div>
          </div>
        </div>

        <div className="h-2 w-full bg-[#1D2538] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#475B74]/50 rounded-full"
            animate={{
              width: ["0%", "50%", "30%", "80%", "20%"],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          ></motion.div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#475B74]/50 animate-pulse"></div>
            <div className="h-4 w-20 bg-[#475B74]/50 rounded-md animate-pulse"></div>
          </div>
          <div className="h-6 w-24 bg-[#475B74]/50 rounded-full animate-pulse"></div>
        </div>

        <div className="h-12 w-full bg-[#475B74]/50 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}
