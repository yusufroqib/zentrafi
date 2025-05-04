import { motion } from "framer-motion";

export function LoadingListItem() {
  return (
    <div className="bg-gradient-to-r from-[#1D2538]/90 to-[#1D2538] rounded-xl overflow-hidden border border-[#475B74]/50 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center p-4 gap-4">
        <div className="flex items-center gap-4 w-full md:w-1/3">
          <div className="h-14 w-14 rounded-full bg-[#475B74]/50 animate-pulse"></div>

          <div className="space-y-2">
            <div className="h-5 w-16 bg-[#475B74]/50 rounded-full animate-pulse"></div>
            <div className="h-6 w-32 bg-[#475B74]/50 rounded-md animate-pulse"></div>
            <div className="h-3 w-20 bg-[#475B74]/50 rounded-md animate-pulse"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-2/3">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
            <div className="bg-[#1D2538]/60 rounded-xl p-2 border border-[#475B74]/50 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-4 rounded-full bg-[#475B74]/50 animate-pulse"></div>
                <div className="h-3 w-16 bg-[#475B74]/50 rounded-md animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <div className="h-4 w-12 bg-[#475B74]/50 rounded-md animate-pulse mb-1"></div>
                <div className="h-1.5 w-full bg-[#1D2538] rounded-full overflow-hidden">
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
              </div>
            </div>

            <div className="bg-[#1D2538]/60 rounded-xl p-2 border border-[#475B74]/50 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-4 rounded-full bg-[#475B74]/50 animate-pulse"></div>
                <div className="h-3 w-16 bg-[#475B74]/50 rounded-md animate-pulse"></div>
              </div>
              <div className="h-4 w-16 bg-[#475B74]/50 rounded-md animate-pulse"></div>
            </div>

            <div className="bg-[#1D2538]/60 rounded-xl p-2 border border-[#475B74]/50 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-4 rounded-full bg-[#475B74]/50 animate-pulse"></div>
                <div className="h-3 w-16 bg-[#475B74]/50 rounded-md animate-pulse"></div>
              </div>
              <div className="h-4 w-24 bg-[#475B74]/50 rounded-md animate-pulse"></div>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <div className="h-10 w-full bg-[#475B74]/50 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
