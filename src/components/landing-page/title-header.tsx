import { MailIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";

export default function TitleHeader() {
  return (
    <div className="flex flex-col gap-6">
      <Image
        src="https://v5.airtableusercontent.com/v3/u/40/40/1745719200000/3bckMZnXGMy9TWbYua4OKA/91Cdb8DFFWbpgtb8oZiOd5q_PSsK_QFUuBOiYEIY_TkTFhnVnqCLkZlHQn9cvphLDh7YH6Ur7B_MeAYSpo9GFYR624uljYG4HpUQwDjkiYBQemrdIgKTHygSbmeAM-cKJQ3xfwyQeyvOLF6n3wJVKQ/bOZLOauCsDntSrIfR3I3THUftr8C041-Ev6jKeBpSFA"
        alt="logo"
        width={116}
        height={116}
        className=""
      />
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold text-white">
          Hokej klub Concordia 1906
        </h2>
        <div className="flex items-center gap-3">
          <Image
            src="/social_media/yt.svg"
            alt="Youtube"
            width={46}
            height={46}
            className="cursor-pointer"
          />
          <Image
            src="/social_media/instagram.svg"
            alt="Instagram"
            width={46}
            height={46}
            className="cursor-pointer"
          />
          <Image
            src="/social_media/facebook.svg"
            alt="Facebook"
            width={46}
            height={46}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <MapPinIcon strokeWidth={2} className="size-5 text-white" />
          <p className="font-normal text-white">Praha, Česká republika</p>
        </div>
        <div className="flex items-center gap-3">
          <MailIcon strokeWidth={2} className="size-5 text-white" />
          <p className="font-normal text-white">+420 123 456 789</p>
        </div>
      </div>
    </div>
  );
}
