"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  Star,
  TrendingUp,
  Clock,
  ArrowDownAZ,
  ArrowUpAZ,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FilterDropdown() {
  const [showFeatured, setShowFeatured] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#1D2538]/80 border-[#475B74] text-[#97CBDC] hover:text-white hover:bg-[#1D2538] rounded-lg"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#1D2538] border-[#475B74] text-white">
        <DropdownMenuLabel className="text-[#97CBDC]">
          Filter Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#475B74]/50" />
        <DropdownMenuCheckboxItem
          checked={showFeatured}
          onCheckedChange={setShowFeatured}
          className="hover:bg-[#004581]/20 focus:bg-[#004581]/20"
        >
          <Star className="h-4 w-4 mr-2 text-yellow-500" />
          Featured Only
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator className="bg-[#475B74]/50" />
        <DropdownMenuLabel className="text-[#97CBDC]">
          Sort By
        </DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={sortBy === "newest"}
          onCheckedChange={(checked) => checked && setSortBy("newest")}
          className="hover:bg-[#004581]/20 focus:bg-[#004581]/20"
        >
          <Clock className="h-4 w-4 mr-2 text-[#018ABD]" />
          Newest First
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy === "oldest"}
          onCheckedChange={(checked) => checked && setSortBy("oldest")}
          className="hover:bg-[#004581]/20 focus:bg-[#004581]/20"
        >
          <Clock className="h-4 w-4 mr-2 text-[#018ABD]" />
          Oldest First
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy === "progress-high"}
          onCheckedChange={(checked) => checked && setSortBy("progress-high")}
          className="hover:bg-[#004581]/20 focus:bg-[#004581]/20"
        >
          <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
          Highest Progress
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy === "progress-low"}
          onCheckedChange={(checked) => checked && setSortBy("progress-low")}
          className="hover:bg-[#004581]/20 focus:bg-[#004581]/20"
        >
          <TrendingUp className="h-4 w-4 mr-2 rotate-180 text-red-500" />
          Lowest Progress
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy === "a-z"}
          onCheckedChange={(checked) => checked && setSortBy("a-z")}
          className="hover:bg-[#004581]/20 focus:bg-[#004581]/20"
        >
          <ArrowDownAZ className="h-4 w-4 mr-2 text-[#018ABD]" />
          A-Z
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy === "z-a"}
          onCheckedChange={(checked) => checked && setSortBy("z-a")}
          className="hover:bg-[#004581]/20 focus:bg-[#004581]/20"
        >
          <ArrowUpAZ className="h-4 w-4 mr-2 text-[#018ABD]" />
          Z-A
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
