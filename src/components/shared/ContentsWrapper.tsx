interface ContentsWrapperProps {
  children: React.ReactNode;
  title: string;
}

export default function ContentsWrapper({ children, title }: ContentsWrapperProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
}
