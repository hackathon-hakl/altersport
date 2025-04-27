import React from "react";
import Image from "next/image";
import { Check, X, Slash } from "lucide-react";

interface RankingTeam {
  position: number;
  logo: string;
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  recentResults: ("win" | "loss" | "draw" | "none")[];
}

const RankingTable: React.FC = () => {
  const teams: RankingTeam[] = [
    {
      position: 1,
      logo: "https://v5.airtableusercontent.com/v3/u/40/40/1745719200000/publEzWATHLITQJ_GuLtEA/HOlRa5tzJU9uHcsj13e6CKNlyCt2XQFu9t8-wuT-Pb5tHTr3oa4peUdnFC1n8N-L-VrCvvbbj3WEX92lgnYjmKY5GmkCsNhO15SOweHAbe25i548vE5NtQVJ18i1llwL9UzZC3tFSqNHuFBb74K9Dg/zO7uEp7SaJNqzZQDMGOQDU8tMHckMeCubkiPl422tSo",
      name: "NK Botinec",
      played: 12,
      wins: 14,
      draws: 0,
      losses: 4,
      points: 48,
      recentResults: ["win", "win", "none", "none", "none"],
    },
    {
      position: 1,
      logo: "/team-logos/nk-botinec.png",
      name: "NK Botinec",
      played: 12,
      wins: 14,
      draws: 0,
      losses: 4,
      points: 48,
      recentResults: ["win", "loss", "draw", "none", "none"],
    },
    {
      position: 1,
      logo: "/team-logos/nk-botinec.png",
      name: "NK Botinec",
      played: 12,
      wins: 14,
      draws: 0,
      losses: 4,
      points: 48,
      recentResults: ["none", "none", "none", "none", "none"],
    },
    {
      position: 1,
      logo: "/team-logos/nk-botinec.png",
      name: "NK Botinec",
      played: 12,
      wins: 14,
      draws: 0,
      losses: 4,
      points: 48,
      recentResults: ["none", "none", "none", "none", "none"],
    },
    {
      position: 1,
      logo: "/team-logos/nk-botinec.png",
      name: "NK Botinec",
      played: 12,
      wins: 14,
      draws: 0,
      losses: 4,
      points: 48,
      recentResults: ["none", "none", "none", "none", "none"],
    },
    {
      position: 1,
      logo: "/team-logos/nk-botinec.png",
      name: "NK Botinec",
      played: 12,
      wins: 14,
      draws: 0,
      losses: 4,
      points: 48,
      recentResults: ["none", "none", "none", "none", "none"],
    },
    {
      position: 1,
      logo: "/team-logos/nk-botinec.png",
      name: "NK Botinec",
      played: 12,
      wins: 14,
      draws: 0,
      losses: 4,
      points: 48,
      recentResults: ["none", "none", "none", "none", "none"],
    },
    {
      position: 1,
      logo: "/team-logos/nk-botinec.png",
      name: "NK Botinec",
      played: 12,
      wins: 14,
      draws: 0,
      losses: 4,
      points: 48,
      recentResults: ["none", "none", "none", "none", "none"],
    },
    {
      position: 1,
      logo: "/team-logos/nk-botinec.png",
      name: "NK Botinec",
      played: 12,
      wins: 14,
      draws: 0,
      losses: 4,
      points: 48,
      recentResults: ["none", "none", "none", "none", "none"],
    },
  ];

  const getResultIcon = (result: "win" | "loss" | "draw" | "none") => {
    switch (result) {
      case "win":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6A8E00]">
            <Check className="size-4 text-white" />
          </div>
        );
      case "loss":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#AE2718]">
            <X className="size-4 text-white" />
          </div>
        );
      case "draw":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#545270]">
            <Slash className="size-3 text-white" />
          </div>
        );
      default:
        return (
          <div className="h-6 w-6 rounded-full border-2 border-white"></div>
        );
    }
  };

  return (
    <div className="no-scrollbar max-h-[460px] w-full overflow-y-auto rounded-lg text-white">
      <div className="w-full">
        <div className="mb-2 grid grid-cols-3 px-4 py-3 text-sm text-white">
          <div className="text-left font-bold">Klub</div>
          <div className="flex justify-between space-x-1 font-medium">
            <span className="w-6 text-center">OU</span>
            <span className="w-6 text-center">POB</span>
            <span className="w-6 text-center">NER</span>
            <span className="w-6 text-center">IZG</span>
            <span className="w-6 text-center">Bod</span>
          </div>
          <div className="text-right font-bold">Posljednjih pet</div>
        </div>

        <div className="space-y-1">
          {teams.map((team, idx) => (
            <div
              key={idx}
              className="grid grid-cols-3 rounded-2xl bg-[#0E0C28] px-4 py-3 transition-colors active:bg-[#2F063B]"
            >
              <div className="my-auto">
                <div className="flex items-center">
                  <div className="w-4 text-lg font-bold">{team.position}</div>
                  <div className="mr-3 flex items-center justify-center">
                    <Image
                      src={team.logo}
                      alt={team.name}
                      width={42}
                      height={42}
                      className="size-10 object-contain"
                    />
                  </div>
                  <span className="font-medium">{team.name}</span>
                </div>
              </div>
              <div className="my-auto">
                <div className="item flex justify-between space-x-1 font-medium">
                  <span className="w-6 text-center">{team.played}</span>
                  <span className="w-6 text-center">{team.wins}</span>
                  <span className="w-6 text-center">{team.draws}</span>
                  <span className="w-6 text-center">{team.losses}</span>
                  <span className="w-6 text-center font-bold">
                    {team.points}
                  </span>
                </div>
              </div>
              <div className="my-auto">
                <div className="flex justify-end space-x-1">
                  {team.recentResults.map((result, i) => (
                    <div key={i}>{getResultIcon(result)}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingTable;
