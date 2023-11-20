import { Skeleton } from "./ui/skeleton";

export const SkeletonBar = ({ rowNum }: { rowNum: number }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: rowNum }).map((_, index) => (
        <Skeleton
          key={`skeleton_${index}`}
          className="w-full h-[20px] rounded-full bg-zinc-400"
        />
      ))}
    </div>
  );
};
