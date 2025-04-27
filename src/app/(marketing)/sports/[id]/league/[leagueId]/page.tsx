"use client";

import { useParams } from "next/navigation";
import { useKategorije } from "@/hooks/queries/useKategorije";
import { useMatchesByLeague } from "@/hooks/queries/useMatches";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/ui/loader";
import TitleHeader from "@/components/landing-page/title-header";
import Carousel from "@/components/landing-page/carousel";
import JoinBanner from "@/components/landing-page/join-banner";
import Results from "@/components/landing-page/results";
import Ranking from "@/components/landing-page/ranking";
import type { MatchRecord, KategorijaRecord } from "@/lib/services/airtable";

export default function LeaguePage() {
  const params = useParams();
  const leagueId = Array.isArray(params.leagueId)
    ? params.leagueId[0]
    : params.leagueId;

  // Get the current league data
  const {
    data: allLeagues,
    isLoading: leaguesLoading,
    error: leaguesError,
  } = useKategorije();

  // Get league-specific matches
  const { data: leagueMatches, isLoading: matchesLoading } = useMatchesByLeague(
    leagueId as string,
  );

  const [currentLeague, setCurrentLeague] = useState<KategorijaRecord | null>(
    null,
  );

  // Find the current league from all leagues
  useEffect(() => {
    if (allLeagues && leagueId) {
      const league = allLeagues.find((league) => league.id === leagueId);
      setCurrentLeague(league || null);
    }
  }, [allLeagues, leagueId]);

  if (leaguesLoading || matchesLoading) {
    return (
      <div className="flex h-full min-h-[50vh] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (leaguesError || !currentLeague) {
    return (
      <div className="flex h-full min-h-[50vh] w-full flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-semibold">Error loading league</h2>
        <p className="mt-2 text-white/70">
          {leaguesError instanceof Error
            ? leaguesError.message
            : "Unable to load league data"}
        </p>
      </div>
    );
  }

  const matchItems = leagueMatches?.map((match) => {
    return {
      variant: match.matchResult ? ("result" as const) : ("upcoming" as const),
      isFavorite: false,
      matchData: match,
    };
  }) || [
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
    <div className="flex flex-col">
      <div className="relative h-full">
        <Image
          src={"/placeholder.svg"}
          alt={"banner"}
          width={1920}
          height={250}
          className="w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-12 bg-[#070314] px-8 py-3">
        <TitleHeader title={currentLeague.name} />
        <Carousel items={matchItems} />
        <div className="grid grid-cols-2 gap-6">
          <Results
            clubMatches={leagueMatches || []}
            currentClubId=""
            leagueView={true}
          />
          <Ranking leagueId={currentLeague.id} />
        </div>
      </div>
    </div>
  );
}
