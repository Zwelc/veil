import { Big_Shoulders } from "next/font/google";

/**
 * Condensed display face for the landing page only (variable, with an optical-size
 * axis so large headlines get the display cut). Applied as a CSS variable on the
 * landing wrapper, so other routes never load it. Use through `font-display`.
 */
export const displayFont = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
  display: "swap",
});
