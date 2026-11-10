"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { numberValue } from "./config";
import { NoData } from "./no-data";

export function WordCloudView({ data }: { data: unknown }) {
  const [source, setSource] = useState<"my_word_counts" | "all_word_counts">(
    "my_word_counts",
  );
  const cloud =
    data && typeof data === "object"
      ? (data as Record<string, unknown>)[source]
      : undefined;
  const allWords =
    cloud && typeof cloud === "object"
      ? Object.entries(cloud as Record<string, unknown>)
          .map(([word, count]) => ({ word, count: numberValue(count) }))
          .sort((a, b) => b.count - a.count)
      : [];
  const words = allWords.slice(0, 48);
  const max = Math.max(1, ...words.map((item) => item.count));
  const total = allWords.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Words from match chat</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Word size reflects how often it appears in the available chat log.
          </p>
        </div>
        <div className="flex rounded-xl border border-border/70 bg-muted/40 p-1">
          <Button
            size="sm"
            variant={source === "my_word_counts" ? "secondary" : "ghost"}
            onClick={() => setSource("my_word_counts")}
          >
            Your words
          </Button>
          <Button
            size="sm"
            variant={source === "all_word_counts" ? "secondary" : "ghost"}
            onClick={() => setSource("all_word_counts")}
          >
            All chat
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {words.length === 0 ? (
          <NoData message="No chat words are available for this selection." />
        ) : (
          <>
            <p className="mb-4 text-xs text-muted-foreground">
              Top {words.length} of {allWords.length.toLocaleString()} words ·{" "}
              {total.toLocaleString()} occurrences counted
            </p>
            <div className="flex min-h-56 flex-wrap content-center items-center justify-center gap-2 rounded-2xl border border-border/60 bg-muted/20 p-5 sm:gap-3 sm:p-8">
              {words.map(({ word, count }, index) => (
                <span
                  key={word}
                  title={`${word}: ${count}`}
                  className={cn(
                    "rounded-full border border-primary/10 bg-card/80 px-3 py-1.5 text-primary shadow-sm",
                    index < 3 && "bg-primary/10 font-bold",
                  )}
                  style={{
                    fontSize: `${0.75 + (count / max) * 0.9}rem`,
                    opacity: 0.65 + (count / max) * 0.35,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
