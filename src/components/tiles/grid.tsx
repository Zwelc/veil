import { motion, MotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
} & MotionProps;

const Grid = ({ className, ...rest }: Props) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      className={twMerge(
        "grid grid-cols-2 md:grid-cols-6 gap-3 w-full h-full",
        className
      )}
      {...rest}
    />
  );
};

export default Grid;
