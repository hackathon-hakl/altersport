import { Globe, MapPin, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Location {
  id: number;
  label: string;
  imageUrl: string;
  sport: string;
  position: { lat: number; lng: number };
}

interface MapLocationCardProps {
  location: Location;
  favorite: boolean;
  handleToggleFavorite: () => void;
  onClose: () => void;
}

export const MapLocationCard = ({
  location,
  favorite,
  handleToggleFavorite,
  onClose,
}: MapLocationCardProps) => {
  // Hardcoded values that should eventually come from location object
  const name = "Zagrebački plivački klub";
  const address = "Kombolova ul. 4a, 10000, Zagreb";
  const mainImage =
    "https://zpk.hr/wp-content/uploads/2023/07/img_1_1690204871152.webp";
  const logoImage =
    "https://v5.airtableusercontent.com/v3/u/40/40/1745690400000/NNa-l6XTDS5Wqe_dP3HSpA/1bx4BKkKlC0aQ7MlloLR9JUE97jcw8hRctMPW0wP-_DoSFgaPvrB4Kf4bbRQRrT1arRmmzoVnbPPiprIyalDT2hyFAtjSroAeTKNE_P0nKJPLBx5N4NQq7l9vZbk2-wuwN8r4w4vYdxusiX7mlqBHg/imcCi_dqZVAICqhY2ZFkd-_76FYQdZsTch7T1gsq2oY";

  return (
    <div className="absolute top-2 left-4 z-30">
      <div className="flex flex-col gap-6 rounded-md bg-[#13091B] p-4">
        <header className="flex flex-row items-center justify-between gap-16">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <Star
            size={24}
            color={favorite ? "var(--selected)" : "white"}
            opacity={favorite ? 1 : 0.8}
            fill={favorite ? "var(--selected)" : "none"}
            className="cursor-pointer transition-colors duration-300 ease-in-out"
            onClick={handleToggleFavorite}
          />
        </header>

        <div className="relative h-48 w-full overflow-visible">
          <Image
            src={mainImage}
            alt={name}
            fill
            className="rounded-sm object-cover"
          />
          <div className="absolute -bottom-10 left-6 z-10">
            <Image
              src={logoImage}
              alt={name}
              width={74}
              height={74}
              className="rounded-[6px] border-2 border-black"
            />
          </div>
        </div>

        <div className="mt-8 mb-4 flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2 text-sm text-white">
            <Globe className="text-selected size-4" />
            {name}
          </div>
          <div className="flex flex-row items-center gap-2 text-sm text-white">
            <MapPin className="text-selected size-4" />
            {address}
          </div>
        </div>

        <div className="mb-2 flex justify-end">
          <Button className="bg-cta hover:bg-cta/80 w-fit rounded-full px-4 py-2 text-sm font-semibold text-white">
            Pogledaj profil
            <ArrowRight className="size-4" color="white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapLocationCard;
