import React from "react";
import Header from "@/components/dashboard/header";
import { PlusIcon } from "lucide-react";
import { DataTableDemo } from "@/components/dashboard/data-table/data-table";

export default async function Leagues() {
  return (
    <div>
      <Header
        title="Upravljanje liga"
        buttonText="Novi tim"
        buttonIcon={<PlusIcon className="size-5" />}
      />
      <DataTableDemo />
    </div>
  );
}
