"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/landing-page/banner";
import Carousel from "@/components/landing-page/carousel";
import MapsContainer from "@/components/landing-page/maps-container";
import Header from "@/components/landing-page/header";
import { tournamentItems } from "@/utils/mockData";
import { externalApi } from "@/lib/api/client";

export default function HomePage() {
  const [matchItems] = useState([
    { variant: "upcoming" as const },
    { isFavorite: false, variant: "upcoming" as const },
    { variant: "result" as const },
    { variant: "result" as const },
    { variant: "upcoming" as const },
    { isFavorite: false, variant: "upcoming" as const },
    { variant: "result" as const },
    { variant: "result" as const },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log("userId", userId);
        // Make the API request
        const response = await externalApi.get(
          `recommend/${userId}/homepage`,
          {},
        );

        // Console log the response
        console.log("API Response:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex w-full flex-col gap-10">
      <Header />
      <Banner />
      <Carousel
        variant="match"
        title="Preporučeni događaji"
        items={matchItems}
      />
      <MapsContainer />
      <Carousel
        variant="tournament"
        title="Otvorena natjecanja"
        items={tournamentItems}
      />
    </div>
  );
}
