import Header from "@/components/landing-page/header";
import Carousel from "@/components/landing-page/carousel";
import CarouselVertical from "@/components/landing-page/carousel-vertical";
import MapsLeagues from "@/components/landing-page/maps-leagues";

export default function Sports() {
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

  const clubItems = [
    {
      name: "GNK Dinamo",
      location: "adresa",
      logoUrl:
        "https://v5.airtableusercontent.com/v3/u/40/40/1745704800000/XW8Y52TsoNSRVKRcfossZA/CT7kdfsWB3ciiR40FEzt5PUN4mkd8HyQNsjVrZkahWWupJJoZ0e85BEgPm_T2i72fjRgaSfNaxCwDOK3Fr0djlUqD5Nat-PA0TXzRMwoB8FZ70HDOvMsbbeIX6ZiDw7DGeUZmyyEzFJB9w5MLXWkgA/tcaCRh9TM8wvcDiJz-zmmXLfkRYgSMpdN7LPBvqTRv0",
      isFavorite: true,
    },
    {
      name: "NK Osijek",
      location: "Osijek",
      logoUrl: "/clubs/osijek.png",
      isFavorite: false,
    },
    {
      name: "HNK Hajduk",
      location: "Split",
      logoUrl: "/clubs/hajduk.png",
      isFavorite: false,
    },
    {
      name: "NK Rijeka",
      location: "Rijeka",
      logoUrl: "/clubs/rijeka.png",
      isFavorite: false,
    },
    {
      name: "HNK Šibenik",
      location: "Šibenik",
      logoUrl: "/clubs/sibenik.png",
      isFavorite: false,
    },
    {
      name: "HNK Šibenik",
      location: "Šibenik",
      logoUrl: "/clubs/sibenik.png",
      isFavorite: false,
    },
    {
      name: "HNK Šibenik",
      location: "Šibenik",
      logoUrl: "/clubs/sibenik.png",
      isFavorite: false,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-10">
      <Header />
      <Carousel items={matchItems} />
      <div className="grid grid-cols-[30%_70%] gap-10">
        <CarouselVertical title="Klubovi" items={clubItems} />
        <MapsLeagues />
      </div>
    </div>
  );
}
