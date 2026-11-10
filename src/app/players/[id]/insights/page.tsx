"use client";

import { use } from "react";
import PlayerInsights from "@/components/insights";

export default function PlayerInsightsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <PlayerInsights id={id} />;
}