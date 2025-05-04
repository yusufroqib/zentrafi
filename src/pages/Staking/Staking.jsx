import { useState, useEffect } from "react";
import { Search, Plus, TrendingUp, Clock, Wallet, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { fetchPools } from "@/lib/api";
import { AnimatePresence, motion } from "framer-motion";
import CreatePoolModal from "./CreatePool";

export default function Staking() {
  const [pools, setPools] = useState([]);
  const [filteredPools, setFilteredPools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Live");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const loadPools = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPools();
        setPools(data);
      } catch (error) {
        console.error("Failed to fetch pools:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPools();
  }, []);

  useEffect(() => {
    // Filter pools based on search query and active/ended status
    const filtered = pools.filter((pool) => {
      const matchesSearch = pool.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        activeFilter === "Live" ? pool.isActive : !pool.isActive;
      return matchesSearch && matchesStatus;
    });

    setFilteredPools(filtered);
  }, [pools, searchQuery, activeFilter]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleCreatePool = (data) => {
    console.log("Creating pool with data:", data);
    // Here you would typically send this data to your API
    // For now, we'll just add a mock pool to the list

    // Create object URLs for the images (simulating IPFS URLs)
    // In a real implementation, you would upload to IPFS and get back URLs
    const bannerUrl = data.bannerImage
      ? URL.createObjectURL(data.bannerImage)
      : "/placeholder.svg?height=400&width=800&text=NEW";
    const profileUrl = data.profileImage
      ? URL.createObjectURL(data.profileImage)
      : "/placeholder.svg?height=56&width=56&text=N";

    const newPool = {
      id: `new-${Date.now()}`,
      name: data.name,
      bannerImage: bannerUrl,
      profileImage: profileUrl,
      isActive: true,
      stakeToken: data.stakingToken.substring(0, 6),
      earnToken: data.rewardToken
        ? data.rewardToken.substring(0, 6)
        : data.stakingToken.substring(0, 6),
      totalStaked: 0,
      apy: "0.00",
      rewards: Number.parseFloat(data.rewardAmount),
      endsIn: `${data.duration}d 0h 0m`,
    };

    setPools((prev) => [newPool, ...prev]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full  sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#97CBDC] h-4 w-4" />
            <Input
              placeholder="Search by pool"
              className="pl-10 bg-[#1D2538]/80 border-[#475B74] h-full rounded-lg w-full text-sm focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex rounded-xl overflow-hidden border border-[#475B74] p-1 bg-[#1D2538]/80 w-full sm:w-auto">
            <Button
              variant="ghost"
              className={cn(
                "rounded-lg px-6 py-2 h-10 flex-1 sm:flex-none cursor-pointer transition-all duration-200",
                activeFilter === "Live"
                  ? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white shadow-lg shadow-[#004581]/20"
                  : "bg-transparent text-[#97CBDC] hover:text-white hover:bg-[#1D2538]"
              )}
              onClick={() => handleFilterChange("Live")}
            >
              Live
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "rounded-lg px-6 py-2 h-10 flex-1 sm:flex-none cursor-pointer transition-all duration-200",
                activeFilter === "Ended"
                  ? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white shadow-lg shadow-[#004581]/20"
                  : "bg-transparent text-[#97CBDC] hover:text-white hover:bg-[#1D2538]"
              )}
              onClick={() => handleFilterChange("Ended")}
            >
              Ended
            </Button>
          </div>
        </div>
        <Button
          className="bg-gradient-to-r from-[#004581] to-[#018ABD] cursor-pointer hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl px-6 py-2 h-12 shadow-lg shadow-[#004581]/20 transition-all duration-200 w-full sm:w-auto"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Pool
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPools.map((pool, idx) => (
          <div
            key={pool.id}
            className="relative"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-[#004581]/10 block rounded-3xl z-0"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <PoolCard pool={pool} isHovered={hoveredIndex === idx} />
          </div>
        ))}
      </div>

      <CreatePoolModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePool}
      />
    </div>
  );
}

function PoolCard({ pool, isHovered }) {
  return (
    <motion.div
      className={cn(
        "bg-gradient-to-b from-[#1D2538]/90 to-[#1D2538] rounded-3xl overflow-hidden border border-[#475B74]/50 shadow-xl backdrop-blur-sm transition-all duration-300 relative z-10",
        isHovered && "border-[#018ABD]/70 shadow-[#018ABD]/5"
      )}
      animate={{
        y: isHovered ? -5 : 0,
        transition: { duration: 0.2 },
      }}
    >
      <div className="relative h-48">
        <image
          src={pool.bannerImage || "/placeholder.svg"}
          alt={pool.name}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isHovered && "scale-105"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D2538] to-transparent opacity-70"></div>
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <motion.div
            className="h-14 w-14 rounded-full overflow-hidden border-2 border-white shadow-lg"
            animate={{
              scale: isHovered ? 1.05 : 1,
              transition: { duration: 0.2 },
            }}
          >
            <image
              src={pool.profileImage || "/placeholder.svg"}
              alt={`${pool.name} profile`}
              width={56}
              height={56}
              className="object-cover"
            />
          </motion.div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  pool.isActive ? "bg-green-500" : "bg-red-500"
                } ${pool.isActive ? "animate-pulse" : ""}`}
              ></span>
              <span
                className={`text-sm font-medium ${
                  pool.isActive ? "text-green-400" : "text-red-400"
                }`}
              >
                {pool.isActive ? "Live" : "Ended"}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white drop-shadow-md">
              {pool.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <motion.div
          className="flex items-center justify-center bg-[#1D2538]/80 rounded-xl p-3 border border-[#475B74]/50"
          animate={{
            y: isHovered ? -3 : 0,
            transition: { duration: 0.2, delay: 0.05 },
          }}
        >
          <div className="text-center">
            <p className="text-sm text-[#97CBDC] mb-1">Stake & Earn</p>
            <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#018ABD] to-[#97CBDC]">
              {pool.stakeToken} → {pool.earnToken}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="bg-[#1D2538]/60 rounded-xl p-3 border border-[#475B74]/50"
            animate={{
              y: isHovered ? -3 : 0,
              transition: { duration: 0.2, delay: 0.1 },
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Wallet className="h-4 w-4 text-[#018ABD]" />
              <span className="text-xs text-[#97CBDC]">Total Staked</span>
            </div>
            <p className="text-lg font-semibold text-[#DDEF0]">
              {pool.totalStaked.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            className="bg-[#1D2538]/60 rounded-xl p-3 border border-[#475B74]/50"
            animate={{
              y: isHovered ? -3 : 0,
              transition: { duration: 0.2, delay: 0.15 },
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-xs text-[#97CBDC]">APY</span>
            </div>
            <p className="text-lg font-semibold text-green-400">{pool.apy}%</p>
          </motion.div>
        </div>

        <motion.div
          className="bg-[#1D2538]/60 rounded-xl p-3 border border-[#475B74]/50"
          animate={{
            y: isHovered ? -3 : 0,
            transition: { duration: 0.2, delay: 0.2 },
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Award className="h-4 w-4 text-[#97CBDC]" />
            <span className="text-xs text-[#97CBDC]">Rewards</span>
          </div>
          <p className="text-lg font-semibold text-[#DDEF0]">
            {pool.rewards.toLocaleString()}
          </p>
        </motion.div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#97CBDC]" />
            <span className="text-sm text-[#97CBDC]">Ends in:</span>
          </div>
          <span className="text-sm font-medium bg-[#1D2538] px-3 py-1 rounded-full text-[#DDEF0]">
            {pool.endsIn}
          </span>
        </div>

        <motion.div
          animate={{
            scale: isHovered ? 1.03 : 1,
            transition: { duration: 0.2 },
          }}
        >
          <Button className="w-full bg-gradient-to-r from-[rgb(0,69,129)] cursor-pointer to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl h-12 shadow-lg shadow-[#004581]/20 transition-all duration-200 font-medium">
            Join Pool
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
