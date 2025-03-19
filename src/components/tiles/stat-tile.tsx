"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Block from "./block";

export default function StatTile({
  title,
  stat,
  subtitle,
}: {
  title: string;
  stat: string;
  subtitle?: string;
}) {
  return (
    <Block>
      <Card className="w-full h-full ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stat}</div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </CardContent>
      </Card>
    </Block>
  );
}
