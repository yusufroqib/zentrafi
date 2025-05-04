import { motion } from "framer-motion";
import { SearchX, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ searchQuery, activeFilter }) {
  const getMessage = () => {
    if (searchQuery) {
      return {
        title: "No results found",
        description: `We couldn't find any launches matching "${searchQuery}"`,
        icon: <SearchX className="h-12 w-12 text-[#97CBDC]" />,
        action: "Clear search",
      };
    }

    if (activeFilter !== "ALL") {
      return {
        title: `No ${activeFilter.toLowerCase()} launches`,
        description: `There are currently no launches with ${activeFilter.toLowerCase()} status`,
        icon: <Filter className="h-12 w-12 text-[#97CBDC]" />,
        action: "Show all launches",
      };
    }

    return {
      title: "No launches available",
      description: "There are currently no launches available",
      icon: <RefreshCw className="h-12 w-12 text-[#97CBDC]" />,
      action: "Refresh",
    };
  };

  const message = getMessage();

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#1D2538]/60 rounded-full p-6 mb-6">
        {message.icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{message.title}</h3>
      <p className="text-[#97CBDC] mb-6 max-w-md">{message.description}</p>
      <Button className="bg-gradient-to-r from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl shadow-lg shadow-[#004581]/20 transition-all duration-200">
        {message.action}
      </Button>
    </motion.div>
  );
}
