"use client";

import React, { useState } from "react";
import Header from "@/components/dashboard/header";
import { PlusIcon, EllipsisVerticalIcon } from "lucide-react";
import {
  DataTable,
  type FilterOption,
} from "@/components/dashboard/data-table/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

export type League = {
  id: string;
  naziv: string;
  sport: string;
  vrstaLige: "Privatna" | "Službena";
  brojTimova: number;
  organizator: string;
  pocetak: string;
  kraj: string;
  status: "Aktivno" | "Neaktivno";
};

const leagueData: League[] = [
  {
    id: "1",
    naziv: "Hrvatska školska liga 2025",
    sport: "Nogomet",
    vrstaLige: "Privatna",
    brojTimova: 10,
    organizator: "Ivan Kranjec",
    pocetak: "21.4.2025.",
    kraj: "18.6.2025.",
    status: "Aktivno",
  },
  {
    id: "2",
    naziv: "Hrvatska školska liga 2025",
    sport: "Nogomet",
    vrstaLige: "Službena",
    brojTimova: 8,
    organizator: "Ivan Kranjec",
    pocetak: "21.4.2025.",
    kraj: "18.6.2025.",
    status: "Aktivno",
  },
  {
    id: "3",
    naziv: "Brooklyn Simmons",
    sport: "Nogomet",
    vrstaLige: "Službena",
    brojTimova: 10,
    organizator: "Ivan Kranjec",
    pocetak: "21.4.2025.",
    kraj: "18.6.2025.",
    status: "Aktivno",
  },
  {
    id: "4",
    naziv: "Hrvatska školska liga 2025",
    sport: "Nogomet",
    vrstaLige: "Privatna",
    brojTimova: 12,
    organizator: "Ivan Kranjec",
    pocetak: "21.4.2025.",
    kraj: "18.6.2025.",
    status: "Aktivno",
  },
  {
    id: "5",
    naziv: "Ralph Edwards",
    sport: "Odbojka",
    vrstaLige: "Privatna",
    brojTimova: 7,
    organizator: "Ivan Kranjec",
    pocetak: "21.4.2025.",
    kraj: "18.6.2025.",
    status: "Neaktivno",
  },
  {
    id: "6",
    naziv: "Theresa Webb",
    sport: "Rukomet",
    vrstaLige: "Privatna",
    brojTimova: 9,
    organizator: "Ivan Kranjec",
    pocetak: "21.4.2025.",
    kraj: "18.6.2025.",
    status: "Neaktivno",
  },
];

const leagueColumns: ColumnDef<League>[] = [
  {
    accessorKey: "naziv",
    header: "Naziv",
    cell: ({ row }) => <div>{row.getValue("naziv")}</div>,
  },
  {
    accessorKey: "sport",
    header: "Sport",
    cell: ({ row }) => <div>{row.getValue("sport")}</div>,
  },
  {
    accessorKey: "vrstaLige",
    header: "Vrsta lige",
    cell: ({ row }) => <div>{row.getValue("vrstaLige")}</div>,
  },
  {
    accessorKey: "brojTimova",
    header: "Broj timova",
    cell: ({ row }) => <div>{row.getValue("brojTimova")}</div>,
  },
  {
    accessorKey: "organizator",
    header: "Organizator",
    cell: ({ row }) => <div>{row.getValue("organizator")}</div>,
  },
  {
    accessorKey: "pocetak",
    header: "Početak",
    cell: ({ row }) => <div>{row.getValue("pocetak")}</div>,
  },
  {
    accessorKey: "kraj",
    header: "Kraj",
    cell: ({ row }) => <div>{row.getValue("kraj")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={"status"}
          className={`${status === "Aktivno" ? "bg-[#5dcc4e33]" : "bg-[#ff646633]"}`}
        >
          <div
            className={`size-1.5 rounded-full ${status === "Aktivno" ? "bg-[#0D8C37]" : "bg-[#C40D10]"}`}
          />
          <span className="text-sm font-normal">{status}</span>
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const league = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVerticalIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(league.id)}
            >
              Kopiraj ID lige
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Pregled lige</DropdownMenuItem>
            <DropdownMenuItem>Uredi ligu</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Define the filter options for leagues
const leagueFilterOptions: FilterOption[] = [
  {
    label: "Sport",
    column: "sport",
    options: [
      { label: "Nogomet", value: "Nogomet" },
      { label: "Odbojka", value: "Odbojka" },
      { label: "Rukomet", value: "Rukomet" },
      { label: "Svi sportovi", value: null },
    ],
  },
  {
    label: "Status",
    column: "status",
    options: [
      { label: "Aktivno", value: "Aktivno" },
      { label: "Neaktivno", value: "Neaktivno" },
      { label: "Svi statusi", value: null },
    ],
  },
  {
    label: "Vrsta lige",
    column: "vrstaLige",
    options: [
      { label: "Privatna", value: "Privatna" },
      { label: "Službena", value: "Službena" },
      { label: "Sve vrste", value: null },
    ],
  },
  {
    label: "Datum",
    column: "",
    options: [
      { label: "Najnoviji", value: "newest" },
      { label: "Najstariji", value: "oldest" },
    ],
  },
];

// Form schema
const leagueFormSchema = z.object({
  naziv: z.string().min(1, "Naziv je obavezan"),
  sport: z.string().min(1, "Odaberite sport"),
  vrstaLige: z.string().min(1, "Odaberite vrstu lige"),
  brojTimova: z.coerce.number().min(2, "Minimalno 2 tima"),
  organizator: z.string().min(1, "Organizator je obavezan"),
  pocetak: z.string().min(1, "Datum početka je obavezan"),
  kraj: z.string().min(1, "Datum završetka je obavezan"),
  status: z.enum(["Aktivno", "Neaktivno"]).default("Aktivno"),
});

// League Form Component
type LeagueFormProps = {
  onSubmit: (data: LeagueFormData) => void;
  onCancel: () => void;
};

type LeagueFormData = {
  naziv: string;
  sport: string;
  vrstaLige: string;
  brojTimova: string;
  organizator: string;
  pocetak: string;
  kraj: string;
  status: "Aktivno" | "Neaktivno";
};

function LeagueForm({ onSubmit, onCancel }: LeagueFormProps) {
  const [formData, setFormData] = useState<LeagueFormData>({
    naziv: "",
    sport: "",
    vrstaLige: "",
    brojTimova: "",
    organizator: "",
    pocetak: "",
    kraj: "",
    status: "Aktivno",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="naziv">Naziv lige</Label>
        <Input
          id="naziv"
          name="naziv"
          placeholder="Unesite naziv lige"
          value={formData.naziv}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sport">Sport</Label>
          <Select
            value={formData.sport}
            onValueChange={(value) => handleSelectChange("sport", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Odaberite sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nogomet">Nogomet</SelectItem>
              <SelectItem value="Odbojka">Odbojka</SelectItem>
              <SelectItem value="Rukomet">Rukomet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vrstaLige">Vrsta lige</Label>
          <Select
            value={formData.vrstaLige}
            onValueChange={(value) => handleSelectChange("vrstaLige", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Odaberite vrstu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Privatna">Privatna</SelectItem>
              <SelectItem value="Službena">Službena</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brojTimova">Broj timova</Label>
          <Input
            id="brojTimova"
            name="brojTimova"
            type="number"
            placeholder="Broj timova"
            value={formData.brojTimova}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organizator">Organizator</Label>
          <Input
            id="organizator"
            name="organizator"
            placeholder="Ime organizatora"
            value={formData.organizator}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pocetak">Datum početka</Label>
          <Input
            id="pocetak"
            name="pocetak"
            placeholder="npr. 21.4.2025."
            value={formData.pocetak}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="kraj">Datum završetka</Label>
          <Input
            id="kraj"
            name="kraj"
            placeholder="npr. 18.6.2025."
            value={formData.kraj}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) =>
            handleSelectChange("status", value as "Aktivno" | "Neaktivno")
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Odaberite status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Aktivno">Aktivno</SelectItem>
            <SelectItem value="Neaktivno">Neaktivno</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Odustani
        </Button>
        <Button
          className="bg-[#BBFA01] text-black hover:bg-[#99cc00]"
          type="submit"
        >
          Spremi ligu
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function Leagues() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateLeague = (data: LeagueFormData) => {
    console.log(data);
    setDialogOpen(false);
  };

  return (
    <div>
      <Header
        title="Upravljanje liga"
        buttonText="Nova liga"
        buttonIcon={<PlusIcon className="size-5" />}
        onClick={() => setDialogOpen(true)}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Dodaj novu ligu</DialogTitle>
            <DialogDescription>
              Unesite podatke za novu ligu. Kliknite spremi kada završite.
            </DialogDescription>
          </DialogHeader>
          <LeagueForm
            onSubmit={handleCreateLeague}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <DataTable
        columns={leagueColumns}
        data={leagueData}
        filterOptions={leagueFilterOptions}
        searchPlaceholder="Pretraži lige"
      />
    </div>
  );
}
