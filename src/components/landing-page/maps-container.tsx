"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomMarker } from "../ui/custom-marker";
import MapLocationCard from "../ui/map-location-card";
import SearchInput from "./search-input";

// Define location type for better type safety
type Location = {
  id: number;
  position: { lat: number; lng: number };
  label: string;
  address: string;
  imageUrl: string;
  sport: string;
};

// Map configuration constants
const MAP_CONFIG = {
  containerStyle: {
    width: "100%",
    height: "580px",
    borderRadius: "8px",
  },
  defaultCenter: {
    lat: 45.815399, // Croatia
    lng: 15.966568,
  },
  options: {
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#131033" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#131033" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.land_parcel",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "administrative.neighborhood",
        stylers: [{ visibility: "off" }],
      },
      { featureType: "poi", stylers: [{ visibility: "off" }] },
      { featureType: "poi.business", stylers: [{ visibility: "off" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#131033" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
      { featureType: "landscape.man_made", stylers: [{ visibility: "off" }] },
      {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ],
  },
};

// Sample location data - would typically come from an API
const LOCATIONS: Location[] = [
  {
    id: 1,
    position: MAP_CONFIG.defaultCenter,
    label: "Zagrebački plivački klub",
    address: "Kombolova ul. 4a, 10000, Zagreb",
    imageUrl:
      "https://v5.airtableusercontent.com/v3/u/40/40/1745704800000/icCxbFi4mJD9Dcpxb8KLxg/bHlInV5_5kLk-xhtJEokSLoHDf3ZRXvJizXTFy6pj_reaTMSGxQOoEebSXf8pWTngb3nGU0G4YQp3LUNErw0tNR83_YC4sxmVvkbrVlwJggkzyvAJTI8shSg7bHVlK_vA5lbrvMoxB36_TaJTGBHqA/OcTbKYOvf-mKJI3C6KO7_z8JAILcLiNw3FMowyQGCTY",
    sport: "football",
  },
];

// Props type for FilterDropdown
type FilterDropdownProps = {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
  align?: "center" | "start" | "end";
};

// Filter dropdown component for better organization
const FilterDropdown = ({
  label,
  options,
  onSelect,
  align = "center",
}: FilterDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        className="rounded-full border-white/30 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
      >
        {label}
        <ChevronDownIcon className="size-5" color="white" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align={align}
      className="border-white/30 bg-[#0E0C28] shadow-lg"
    >
      {options.map((option) => (
        <DropdownMenuItem
          key={option}
          onClick={() => onSelect(option)}
          className="text-white focus:bg-white/10 focus:text-white"
        >
          {option}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default function MapsContainer() {
  // State management
  const [selectedSport, setSelectedSport] = useState("Sport");
  const [selectedDistance, setSelectedDistance] = useState("Udaljenost");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [favorites, setFavorites] = useState<number[]>([]);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Google Maps API loading
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Dropdown options
  const sports = useMemo(() => ["Fudbal", "Košarka", "Tenis", "Odbojka"], []);
  const distances = useMemo(() => ["1km", "5km", "10km", "20km", "50km"], []);

  // Map callbacks
  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);

  // Close location card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setSelectedLocation(null);
        setActiveMarker(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle marker click
  const handleMarkerClick = (markerId: number) => {
    if (markerId === activeMarker) {
      setActiveMarker(null);
      setSelectedLocation(null);
    } else {
      setActiveMarker(markerId);
      const location = LOCATIONS.find((loc) => loc.id === markerId);
      setSelectedLocation(location || null);
    }
  };

  // Toggle location favorite status
  const handleToggleFavorite = (locationId: number) => {
    setFavorites((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId],
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold text-white">Pretraži na karti</h2>

      <div className="flex flex-col gap-5 rounded-md bg-[#0E0C28] p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilterDropdown
              label={selectedSport}
              options={sports}
              onSelect={setSelectedSport}
              align="start"
            />
            <FilterDropdown
              label={selectedDistance}
              options={distances}
              onSelect={setSelectedDistance}
              align="end"
            />
          </div>
          <SearchInput />
        </div>

        <div className="relative w-full">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={MAP_CONFIG.containerStyle}
              center={MAP_CONFIG.defaultCenter}
              zoom={12}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={MAP_CONFIG.options}
            >
              {selectedLocation && (
                <div ref={cardRef}>
                  <MapLocationCard
                    location={selectedLocation}
                    favorite={favorites.includes(selectedLocation.id)}
                    handleToggleFavorite={() =>
                      handleToggleFavorite(selectedLocation.id)
                    }
                  />
                </div>
              )}

              {LOCATIONS.map((marker) => (
                <CustomMarker
                  key={marker.id}
                  position={marker.position}
                  label={marker.label}
                  isActive={activeMarker === marker.id}
                  onClick={() => handleMarkerClick(marker.id)}
                  imageUrl={marker.imageUrl}
                />
              ))}
            </GoogleMap>
          ) : (
            <div className="flex h-[400px] w-full items-center justify-center rounded-md bg-gray-800">
              <p className="text-white">Učitavanje karte...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
