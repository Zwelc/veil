"use client";

import { usePlayerHeroes } from "@/hooks/usePlayer";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = usePlayerHeroes(params.id);

  return (
    <Card className=" row-span-2 md:row-span-6 col-span-2 md:col-span-6">
      <CardHeader>
        <CardTitle>Most Played Heroes</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data || []} />
      </CardContent>
    </Card>
  );
}
