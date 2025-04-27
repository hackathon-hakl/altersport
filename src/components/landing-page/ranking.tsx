import RankingTable from "./ranking-table";

interface RankingProps {
  clubId?: string;
}

export default function Ranking({ clubId }: RankingProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-white">Rezultati</h2>
      <RankingTable clubId={clubId} />
    </div>
  );
}
