import LandingTabs from "./landing-tabs";
import { useState } from "react";

export default function Results() {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-white">Rezultati</h2>

      <LandingTabs
        tabs={[
          { label: "Sve", id: "all" },
          { label: "Nadolazeće", id: "upcoming" },
          { label: "Prethodno", id: "previous" },
          { label: "Omiljeno", id: "favorites" },
        ]}
        defaultActiveTab="all"
        onTabChange={handleTabChange}
      />

      <div className="mt-4">
        {activeTab === "all" && <div className="text-white">Svi rezultati</div>}

        {activeTab === "upcoming" && (
          <div className="text-white">Nadolazeći rezultati</div>
        )}

        {activeTab === "previous" && (
          <div className="text-white">Prethodni rezultati</div>
        )}

        {activeTab === "favorites" && (
          <div className="text-white">Omiljeni rezultati</div>
        )}
      </div>
    </div>
  );
}
