import Link from "next/link";
import { Coffee } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-card/35">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-5 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
        <p>Veil is just a fun project made for the Dota 2 community.</p>
        <Link
          href="https://buymeacoffee.com/zwelc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        >
          <Coffee aria-hidden="true" className="size-4" />
          Buy me a coffee
        </Link>
      </div>
    </footer>
  );
}
