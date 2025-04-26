import Banner from "@/components/landing-page/banner";
import Carousel from "@/components/landing-page/carousel";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Banner />
      <Carousel />
    </div>
  );
}
