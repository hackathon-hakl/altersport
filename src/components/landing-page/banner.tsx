import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative flex flex-col gap-20 overflow-hidden rounded-2xl bg-[url('/banner_gradinet.svg')] bg-cover bg-center px-6 py-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-4xl font-bold text-white">
          Otkrij novi sport za sebe!
        </h2>
        <p className="text-base font-medium text-white">
          Odgovori na kratke pitalice i predložimo ti sportove u blizini.
        </p>
      </div>
      <button className="bg-cta hover:bg-cta/80 flex w-fit cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition-all duration-300">
        Ispuni Kviz
        <ArrowRight size={16} color="white" />
      </button>
      <Image
        src="/banner_sport.png"
        alt="Banner Image"
        width={420}
        height={360}
        priority
        className="absolute top-3 right-20"
      />
    </div>
  );
}
