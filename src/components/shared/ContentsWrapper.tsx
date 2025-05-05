import { cn } from "@/utils/cn";

interface ContentsWrapperProps {
  children: React.ReactNode;
  title: string;
  isBlur: boolean;
}

export default function ContentsWrapper({ children, title, isBlur = false }: ContentsWrapperProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className={cn(isBlur && "blur-xs")}>{children}</div>
    </div>
  );
}
