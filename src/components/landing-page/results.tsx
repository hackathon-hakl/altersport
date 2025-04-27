import LandingTabs from "./landing-tabs";
import { useState } from "react";
import PlanMatchCard from "./plan-match-card";
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
        {activeTab === "all" && (
          <div className="flex flex-col gap-4">
            <PlanMatchCard
              variant="finished"
              homeTeam={{
                name: "SC Savica",
                logoUrl:
                  "https://v5.airtableusercontent.com/v3/u/40/40/1745719200000/gqeqRt6P1ywUlRQcxQTJMQ/h_C8_ZQGNVL04aQ-vQgw3MCC5zQS0ATUsmjJspNqbBgQX7XmokztG-r_IVaGz9gZxlCFrRkXVsVBFSfe8hmOmJcaNYPL3N9C2BmDoCw9D5eQAL4DOFs09dHjO2B6FV0J1bzi8XdtP_euYnxq1V2UqA/ZQSIHQrGnIlufjC87OxlclLz4mQxz8nUg9EJcAcDOKk",
              }}
              awayTeam={{
                name: "NK Studentski grad",
                logoUrl:
                  "https://v5.airtableusercontent.com/v3/u/40/40/1745719200000/gqeqRt6P1ywUlRQcxQTJMQ/h_C8_ZQGNVL04aQ-vQgw3MCC5zQS0ATUsmjJspNqbBgQX7XmokztG-r_IVaGz9gZxlCFrRkXVsVBFSfe8hmOmJcaNYPL3N9C2BmDoCw9D5eQAL4DOFs09dHjO2B6FV0J1bzi8XdtP_euYnxq1V2UqA/ZQSIHQrGnIlufjC87OxlclLz4mQxz8nUg9EJcAcDOKk",
              }}
              homeTeamResult={1}
              awayTeamResult={1}
            />
          </div>
        )}

        {activeTab === "upcoming" && (
          <div className="flex flex-col gap-4">
            <PlanMatchCard
              variant="upcoming"
              homeTeam={{
                name: "SC Savica",
                logoUrl:
                  "https://v5.airtableusercontent.com/v3/u/40/40/1745719200000/gqeqRt6P1ywUlRQcxQTJMQ/h_C8_ZQGNVL04aQ-vQgw3MCC5zQS0ATUsmjJspNqbBgQX7XmokztG-r_IVaGz9gZxlCFrRkXVsVBFSfe8hmOmJcaNYPL3N9C2BmDoCw9D5eQAL4DOFs09dHjO2B6FV0J1bzi8XdtP_euYnxq1V2UqA/ZQSIHQrGnIlufjC87OxlclLz4mQxz8nUg9EJcAcDOKk",
              }}
              awayTeam={{
                name: "NK Studentski grad",
                logoUrl:
                  "https://v5.airtableusercontent.com/v3/u/40/40/1745719200000/gqeqRt6P1ywUlRQcxQTJMQ/h_C8_ZQGNVL04aQ-vQgw3MCC5zQS0ATUsmjJspNqbBgQX7XmokztG-r_IVaGz9gZxlCFrRkXVsVBFSfe8hmOmJcaNYPL3N9C2BmDoCw9D5eQAL4DOFs09dHjO2B6FV0J1bzi8XdtP_euYnxq1V2UqA/ZQSIHQrGnIlufjC87OxlclLz4mQxz8nUg9EJcAcDOKk",
              }}
            />
          </div>
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
