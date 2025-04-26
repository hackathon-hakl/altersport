import Banner from "@/components/landing-page/banner";
import Carousel from "@/components/landing-page/carousel";
import MapsContainer from "@/components/landing-page/maps-container";
import Header from "@/components/landing-page/header";

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

  const tournamentItems = [
    {
      image: "/natjecanja/maraton.png",
      category: "Trčanje",
      title: "Zagrebački Maraton",
      time: "18:30",
      date: "11.9.2025",
      location: "Trg bana Josipa Jelačića",
    },
    {
      image: "/natjecanja/sah.png",
      category: "Šah",
      title: "Zagrebački Classic",
      time: "18:30",
      date: "11.9.2025",
      location: "Masarykova 11",
    },
    {
      image: "/natjecanja/strelicarstvo.png",
      category: "Streličarstvo",
      title: "CEC-Archery",
      time: "18:30",
      date: "11.9.2025",
      location: "Medvedgrad",
    },
    {
      image: "/natjecanja/veslanje.png",
      category: "Veslanje",
      title: "Veslačko prvenstvo",
      time: "18:30",
      date: "11.9.2025",
      location: "Veslački klub Jarun",
    },
    {
      image: "/natjecanja/judo.png",
      category: "Judo",
      title: "UniSport Zagreb judo",
      time: "10:30",
      date: "11.9.2025",
      location: "Osnovna škola Središće",
    },
    {
      image: "/natjecanja/triatlon.png",
      category: "Triatlon",
      title: "Trogir Outdoor Festival",
      time: "18:30",
      date: "11.9.2025",
      location: "Trogir",
    },
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
