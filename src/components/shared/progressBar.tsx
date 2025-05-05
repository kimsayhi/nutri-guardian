import { cn } from "@/utils/cn";
import { motion } from "motion/react";

interface ProgressBarProps {
  progress: number;
  color: string;
}
export default function ProgressBar({ progress, color }: ProgressBarProps) {
  return (
    <div className="relative h-1 w-full rounded-full bg-white">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "easeOut", duration: 0.7 }}
        className={cn("absolute top-0 left-0 h-1 rounded-full")}
        style={{ backgroundColor: color }}
      ></motion.div>
    </div>
  );
}
