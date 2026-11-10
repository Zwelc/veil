"use client";

import MotionLink from "@/components/motion/motion-link";
import { AnimatePresence, m, type Variants } from "framer-motion";
import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useViewedPlayers } from "@/hooks/useViewedPlayers";
import { EASE_OUT, fadeUp, spring, stagger } from "@/lib/motion";

const chip: Variants = {
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE_OUT } },
};

const avatarPop: Variants = {
  hover: { scale: 1.12, rotate: -6, transition: spring },
};

/**
 * Players this browser opened recently. Slides in once history loads from
 * localStorage (after hydration) and animates out when cleared.
 */
export default function RecentlyViewed() {
  const { players, clear } = useViewedPlayers();

  return (
    <AnimatePresence>
      {players.length > 0 && (
        <m.section
          key="recently-viewed"
          aria-labelledby="recent-heading"
          className="space-y-4"
          initial="initial"
          animate="animate"
          exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
          variants={stagger(0.05)}
        >
          <m.div variants={fadeUp}>
            <PageHeader
              id="recent-heading"
              size="md"
              eyebrow="Pick up where you left off"
              title="Recently viewed"
              aside={
                <Button variant="ghost" size="sm" onClick={clear}>
                  Clear
                </Button>
              }
            />
          </m.div>
          <m.ul
            variants={stagger(0.05)}
            className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible"
          >
            {players.map((player) => (
              <m.li
                key={player.account_id}
                variants={chip}
                className="shrink-0"
              >
                {/* Hover lives on the link so the <li> keeps the stagger. */}
                <MotionLink
                  whileHover="hover"
                  href={`/players/${player.account_id}`}
                  className="flex items-center gap-2 rounded-full border border-border/70 bg-card py-1 pr-4 pl-1 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <m.span variants={avatarPop} className="inline-flex">
                    <Avatar size="lg">
                      <AvatarImage src={player.avatarfull ?? undefined} alt="" />
                      <AvatarFallback>
                        {player.personaname.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </m.span>
                  <span className="max-w-40 truncate">{player.personaname}</span>
                </MotionLink>
              </m.li>
            ))}
          </m.ul>
        </m.section>
      )}
    </AnimatePresence>
  );
}
