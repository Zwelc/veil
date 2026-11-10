import { m, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { stagger } from "@/lib/motion";

type Props = {
  className?: string;
} & MotionProps;

/** Staggers its Block children in on mount. */
const Grid = ({ className, ...rest }: Props) => {
  return (
    <m.div
      initial="initial"
      animate="animate"
      variants={stagger(0.05)}
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-full",
        className
      )}
      {...rest}
    />
  );
};

export default Grid;
