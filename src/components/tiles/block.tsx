import { m, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";

type Props = {
  className?: string;
} & MotionProps;

/** A grid child that rises and fades in with its parent Grid's stagger. */
const Block = ({ className, ...rest }: Props) => {
  return (
    <m.div variants={fadeUp} className={cn("w-full h-full", className)} {...rest} />
  );
};

export default Block;
