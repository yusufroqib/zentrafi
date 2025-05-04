"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DateTimePicker({ date, setDate, className }) {
  const [selectedDate, setSelectedDate] = React.useState(date || new Date());
  const [selectedHour, setSelectedHour] = React.useState(
    date ? date.getHours().toString() : "12"
  );
  const [selectedMinute, setSelectedMinute] = React.useState(
    date ? date.getMinutes().toString().padStart(2, "0") : "00"
  );

  // Update the parent's state when any of our internal states change
  React.useEffect(() => {
    const newDate = new Date(selectedDate);
    newDate.setHours(Number.parseInt(selectedHour, 10));
    newDate.setMinutes(Number.parseInt(selectedMinute, 10));
    setDate(newDate);
  }, [selectedDate, selectedHour, selectedMinute, setDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal bg-[#1D2538]/60 border-[#475B74] text-white h-10 rounded-xl hover:bg-[#1D2538] hover:text-white",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP p") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-[#1D2538] border-[#475B74]">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          initialFocus
          className="bg-[#1D2538] text-white"
        />
        <div className="p-3 border-t border-[#475B74] flex items-center gap-2">
          <Select value={selectedHour} onValueChange={setSelectedHour}>
            <SelectTrigger className="w-[70px] bg-[#1D2538]/60 border-[#475B74] text-white">
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent className="bg-[#1D2538] border-[#475B74] text-white">
              {Array.from({ length: 24 }).map((_, i) => (
                <SelectItem
                  key={i}
                  value={i.toString()}
                  className="hover:bg-[#004581]/20 focus:bg-[#004581]/20"
                >
                  {i.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-white">:</span>
          <Select value={selectedMinute} onValueChange={setSelectedMinute}>
            <SelectTrigger className="w-[70px] bg-[#1D2538]/60 border-[#475B74] text-white">
              <SelectValue placeholder="Minute" />
            </SelectTrigger>
            <SelectContent className="bg-[#1D2538] border-[#475B74] text-white">
              {Array.from({ length: 12 }).map((_, i) => (
                <SelectItem
                  key={i}
                  value={(i * 5).toString().padStart(2, "0")}
                  className="hover:bg-[#004581]/20 focus:bg-[#004581]/20"
                >
                  {(i * 5).toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
