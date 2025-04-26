"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SearchInput from "./search-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatDate } from "@/lib/utils";

export default function Header() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex w-full items-center justify-center gap-4 p-4">
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "gap-2 rounded-full border-white/30 bg-[#966498]/10 text-left font-normal text-[#DCE0E3]",
              )}
            >
              <ChevronLeft className="size-5" color="white" />
              <CalendarIcon className="size-5" color="#F66467" />
              {date ? formatDate(date.toISOString()) : <span>Pick a date</span>}
              <ChevronRight className="size-5" color="white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <SearchInput />
        <Button>Action</Button>
      </div>
    </div>
  );
}
