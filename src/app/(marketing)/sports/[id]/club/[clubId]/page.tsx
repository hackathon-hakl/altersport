"use client";

import { useParams } from "next/navigation";
import { useTeam } from "@/hooks/queries/useTeams";
import Image from "next/image";
import Loader from "@/components/ui/loader";

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

  return (
    <div className="">
      <Image
        src={"/placeholder.svg"}
        alt={"banner"}
        width={100}
        height={150}
        className="absolute top-0 left-0 w-full"
      />
    </div>
  );
}
