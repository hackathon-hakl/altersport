import Image from "next/image";
import { Star } from "lucide-react";

interface ClubCardProps {
  name: string;
  location: string;
  logoUrl: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export default function ClubCard({
  name,
  location,
  logoUrl,
  isFavorite = false,
  onFavoriteToggle,
}: ClubCardProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-[#0E0C28] p-4 text-white">
      <div className="flex items-center gap-5">
        <div className="relative size-12">
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-white">{name}</span>
          <span className="text-base font-normal text-white/80">
            {location}
          </span>
        </div>
      </div>
      <Star
        size={24}
        color={isFavorite ? "var(--selected)" : "white"}
        opacity={isFavorite ? 1 : 0.8}
        fill={isFavorite ? "var(--selected)" : "none"}
        className="cursor-pointer transition-colors duration-300 ease-in-out"
        onClick={onFavoriteToggle}
      />
    </div>
  );
}
