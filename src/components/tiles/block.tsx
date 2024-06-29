import { motion, MotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";
type Props = {
  className?: string;
} & MotionProps;

const Block = ({ className, ...rest }: Props) => {
  return (
    <motion.div
      variants={{
        initial: { scale: 0.5, y: 50, opacity: 0 },
        animate: { scale: 1, y: 0, opacity: 1 },
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
        delay: 0,
      }}
      className={twMerge("w-full h-full", className)}
      {...rest}
    />
  );
};

export default Block;
