import RankingTable from "./ranking-table";

export default function Ranking() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-white">Rezultati</h2>
      <RankingTable />
    </div>
  );
}
