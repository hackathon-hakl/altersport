"use client";

import * as React from "react";
import { useState } from "react";
import { ChevronRightIcon, Dumbbell } from "lucide-react";
import {
  IconBallAmericanFootball,
  IconChessQueen,
  IconSoccerField,
  IconBallVolleyball,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useSports } from "@/hooks/queries/useSports";
import SearchInput from "./landing-page/search-input";
import FieldHockey from "./icons/FieldHockey";

// Function to get the appropriate icon based on sport's icon field
const getSportIcon = (iconName: string) => {
  const size = 24;

  switch (iconName) {
    case "rugby":
      return <IconBallAmericanFootball size={size} />;
    case "chess":
      return <IconChessQueen size={size} />;
    case "soccer":
      return <IconSoccerField size={size} />;
    case "volleyball":
      return <IconBallVolleyball size={size} />;
    case "field_hockey":
      return <FieldHockey />;
    default:
      return <Dumbbell size={size} />;
  }
};

export function AppSidebarLanding({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: sports, isLoading } = useSports();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter sports based on search query
  const filteredSports = sports?.filter((sport) =>
    sport.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Sidebar {...props} innerClassName="bg-[#1B0E28]">
      <SidebarHeader className="px-4">
        <h1 className="mt-6 text-2xl font-bold text-white">ALTERSPORT</h1>
      </SidebarHeader>
      <SidebarContent className="mt-3">
        {/* Sports Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <SidebarMenuItem key={`skeleton-${index}`}>
                      X
                      <SidebarMenuButton variant="landing">
                        <div className="h-6 w-6 animate-pulse rounded-full bg-white/20" />
                        <div className="h-4 w-24 animate-pulse rounded bg-white/20" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
              ) : sports && sports.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <SearchInput
                    className="w-fit pr-7"
                    outerClassName="mb-2"
                    value={searchQuery}
                    onChange={setSearchQuery}
                  />
                  {filteredSports && filteredSports.length > 0 ? (
                    filteredSports.map((sport) => (
                      <SidebarMenuItem key={sport.id}>
                        <SidebarMenuButton asChild variant="landing">
                          <a href={`/sports/${sport.id}`}>
                            {getSportIcon(sport.icon)}
                            {sport.name}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton variant="landing">
                        <span className="text-white/60">
                          Nema rezultata pretrage
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </div>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton variant="landing">
                    <span className="text-white/60">
                      Nema dostupnih sportova
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between gap-2 px-2 pb-5">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback className="bg-[#401146] text-white">
                IP
              </AvatarFallback>
            </Avatar>
            <div className="text-text-whiteish">
              <p className="text-sm font-semibold">Ilija Popović</p>
              <p className="text-xs">ilija.popovic@gmail.com</p>
            </div>
          </div>
          <ChevronRightIcon className="size-4 cursor-pointer" color="#F8F5F9" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
