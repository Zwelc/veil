import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import FeatureStrip from "@/components/home/feature-strip";
import Hero from "@/components/home/hero";
import HomeContent from "@/components/home/home-content";
import SceneSection from "@/components/home/scene-section";
import { displayFont } from "@/lib/fonts";
import { proPlayerQueries } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { makeQueryClient } from "@/lib/query-client";
import type { IProLanding } from "@/models/scene";
import { OpenDota } from "@/server/opendota";

// Static page, regenerated at most every 6 hours (ISR): no function call per visit.
export const revalidate = 21600; // must be a literal; matches CACHE_TTL.proPlayers

/** One upstream call for pros and scene counts; null if OpenDota is down. */
async function loadLanding(): Promise<IProLanding | null> {
  try {
    return await OpenDota.getProLanding();
  } catch {
    return null; // the client fetches the pro list later; the counts are omitted
  }
}

export default async function Home() {
  const landing = await loadLanding();
  const queryClient = makeQueryClient();
  // Same key as the client query, so the browser starts with data and skips the request.
  if (landing) {
    queryClient.setQueryData(proPlayerQueries.list().queryKey, landing.pros);
  }

  return (
    // The display font is scoped to the landing page, so other routes never load it.
    <div className={cn("flex w-full flex-1 flex-col", displayFont.variable)}>
      <Hero pros={landing?.pros} scene={landing?.scene} />
      <div className="container mx-auto w-full flex-1 px-4 py-10 pb-14 sm:px-6 sm:py-12">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HomeContent
            features={<FeatureStrip />}
            scene={landing && <SceneSection scene={landing.scene} />}
          />
        </HydrationBoundary>
      </div>
    </div>
  );
}
