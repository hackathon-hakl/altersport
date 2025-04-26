import { Search, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

export default function SearchInput() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white" />
      <Input
        placeholder="Pretraži"
        className="w-xs rounded-full border-white/30 bg-[#966498]/10 pl-10 text-white placeholder:text-white/30"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <X
        className={`absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 cursor-pointer text-white transition-opacity duration-300 ease-in-out ${
          searchInput
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSearchInput("")}
      />
    </div>
  );
}
