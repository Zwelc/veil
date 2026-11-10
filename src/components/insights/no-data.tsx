"use client";

import { UsersRound } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

export const NoData = (
  props: Partial<Parameters<typeof EmptyState>[0]> & { message: string },
) => <EmptyState icon={UsersRound} title="No data found" {...props} />;
