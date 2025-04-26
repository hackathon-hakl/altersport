import Banner from "@/components/landing-page/banner";
import Carousel from "@/components/landing-page/carousel";
import MapsContainer from "@/components/landing-page/maps-container";
import Header from "@/components/landing-page/header";
import { tournamentItems } from "@/utils/mockData";
export default function HomePage() {
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
