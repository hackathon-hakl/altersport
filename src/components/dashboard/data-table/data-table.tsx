"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, EllipsisVerticalIcon, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

const data: League[] = [
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

export const columns: ColumnDef<League>[] = [
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

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md">
        <Table
          filterComponent={
            <div className="flex w-full items-center justify-between space-x-2">
              <div className="relative">
                <Input
                  placeholder="Pretraži"
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="w-xs pr-10"
                />
                <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-black" />
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      Sport <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        table.getColumn("sport")?.setFilterValue("Nogomet")
                      }
                    >
                      Nogomet
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        table.getColumn("sport")?.setFilterValue("Odbojka")
                      }
                    >
                      Odbojka
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        table.getColumn("sport")?.setFilterValue("Rukomet")
                      }
                    >
                      Rukomet
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        table.getColumn("sport")?.setFilterValue("")
                      }
                    >
                      Svi sportovi
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      Datum <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Najnoviji</DropdownMenuItem>
                    <DropdownMenuItem>Najstariji</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      Status <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        table.getColumn("status")?.setFilterValue("Aktivno")
                      }
                    >
                      Aktivno
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        table.getColumn("status")?.setFilterValue("Neaktivno")
                      }
                    >
                      Neaktivno
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        table.getColumn("status")?.setFilterValue("")
                      }
                    >
                      Svi statusi
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      Vrsta lige <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        table.getColumn("vrstaLige")?.setFilterValue("Privatna")
                      }
                    >
                      Privatna
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        table.getColumn("vrstaLige")?.setFilterValue("Službena")
                      }
                    >
                      Službena
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        table.getColumn("vrstaLige")?.setFilterValue("")
                      }
                    >
                      Sve vrste
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          }
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nema rezultata.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTableDemo;
