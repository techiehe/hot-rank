import { cn } from "@/lib/utils";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <div className={cn("flex flex-col items-center justify-center h-full loader")}></div>;
}
