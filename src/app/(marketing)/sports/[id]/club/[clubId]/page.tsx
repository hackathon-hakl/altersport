"use client";

import { useParams } from "next/navigation";
import { useTeam } from "@/hooks/queries/useTeams";
import Image from "next/image";
import Loader from "@/components/ui/loader";
import TitleHeader from "@/components/landing-page/title-header";
import Carousel from "@/components/landing-page/carousel";
import JoinBanner from "@/components/landing-page/join-banner";
import Results from "@/components/landing-page/results";

export default function ClubPage() {
  const params = useParams();
  const clubId = Array.isArray(params.id) ? params.id[1] : params.id;
  const { data: club, isLoading, error } = useTeam(clubId as string);

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[50vh] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="flex h-full min-h-[50vh] w-full flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-semibold">Error loading club</h2>
        <p className="mt-2 text-white/70">
          {error instanceof Error ? error.message : "Unable to load club data"}
        </p>
      </div>
    );
  }

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
    <div className="flex flex-col gap-10">
      <div className="relative h-full">
        <Image
          src={"/placeholder.svg"}
          alt={"banner"}
          width={1920}
          height={250}
          className="w-full object-cover"
        />
        <div className="absolute -bottom-18 left-0 w-full translate-y-1/2 transform">
          <div className="px-8 py-3">
            <TitleHeader />
          </div>
        </div>
      </div>
      <div className="mt-44 flex w-full flex-col gap-12 bg-[#070314] px-8 py-3">
        <div className="grid grid-cols-[75%_25%] gap-6">
          <Carousel items={matchItems} />
          <JoinBanner />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Results />
        </div>
      </div>
    </div>
  );
}
