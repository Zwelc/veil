"use client";

import { DataTable } from "@/components/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { usePlayerMatches } from "@/hooks/usePlayer";

import { columns } from "./columns";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = usePlayerMatches(params.id);

  return (
    <Card className="row-span-4 col-span-3">
      <CardHeader>
        <CardTitle>Match History</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data || []} />
      </CardContent>
    </Card>
  );
}
