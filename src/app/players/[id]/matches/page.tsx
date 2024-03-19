"use client";

import { DataTable } from "@/components/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { usePlayerMatches } from "@/hooks/usePlayer";

import { columns } from "./columns";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = usePlayerMatches(params.id);

  return (
    <Card className="row-span-2 md:row-span-6 col-span-2 md:col-span-6 h-full w-full md:min-h-[44rem]">
      <CardHeader>
        <CardTitle>Match History</CardTitle>
      </CardHeader>
      <CardContent className="">
        <DataTable columns={columns} data={data || []} />
      </CardContent>
    </Card>
  );
}
