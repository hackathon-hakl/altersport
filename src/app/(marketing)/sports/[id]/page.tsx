"use client";

import { useState, useEffect, use } from "react";
import Header from "@/components/landing-page/header";
import Carousel from "@/components/landing-page/carousel";
import CarouselVertical from "@/components/landing-page/carousel-vertical";
import MapsLeagues from "@/components/landing-page/maps-leagues";
import { tournamentItems } from "@/utils/mockData";
import { useTeamsBySport } from "@/hooks/queries/useTeamsBySport";

export default function Sports({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const sportId = unwrappedParams.id;
  const { data: teams, isLoading: isTeamsLoading } = useTeamsBySport(sportId);
  const [clubItems, setClubItems] = useState<any[]>([]);

  useEffect(() => {
    if (teams) {
      // Transform team data to match ClubItem format
      const formattedTeams = teams.map((team) => ({
        name: team.name,
        location: team.address,
        logoUrl: team.logo?.[0]?.url || "/placeholder.png",
        isFavorite: false, // Default value, could be managed by user preferences
        sport: team.sport,
      }));
      setClubItems(formattedTeams);
    }
  }, [teams]);

  const matchItems = [
    { variant: "upcoming" as const },
    { isFavorite: false, variant: "upcoming" as const },
    { variant: "result" as const },
    { variant: "result" as const },
    { variant: "upcoming" as const },
    { isFavorite: false, variant: "upcoming" as const },
    { variant: "result" as const },
    { variant: "result" as const },
  ];

  return (
    <div className="flex w-full flex-col gap-10">
      <Header />
      <Carousel items={matchItems} />
      <div className="grid grid-cols-[35%_65%] gap-2">
        <CarouselVertical
          title="Klubovi"
          items={clubItems}
          isLoading={isTeamsLoading}
        />
        <MapsLeagues />
      </div>
      <Carousel
        variant="tournament"
        title="Otvorena natjecanja"
        items={tournamentItems}
      />
    </div>
  );
}
