"use client";
import { SkeletonBar } from "@/components/skeleton-bar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRankList } from "@/lib/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";

/**
 * 标签模式
 *
 * @param param0
 * @returns
 */
export default function Tabs({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [rankList, setRankList] = useState<Rank[]>([]);
  const [rank, setRank] = useState<Rank>(null as any);

  useEffect(() => {
    setRankList(getRankList());
  }, []);

  useEffect(() => {
    const selected = rankList.find((item) => item.id === slug);
    if (selected) {
      setRank({ ...selected, data: [], isLoadData: true });

      const fetchRankData = async () => {
        const res = await fetch(`/api/hot-rank?id=${selected.id}`);
        const { code = 0, data = [] } = await res.json();
        if (code == 1) {
          setRank((prevRank: Rank) => ({
            ...prevRank,
            data,
            isLoadData: false,
          }));
        }
      };

      fetchRankData();
    }
  }, [slug, rankList]);

  if (!rank) {
    return <SkeletonBar rowNum={20} />;
  }

  return (
    <div className="flex flex-col gap-2">
      {/* rank tabs */}
      <Card className="border shadow-none  border-slate-100 dark:border-slate-100 dark:border-none">
        <CardContent className="flex gap-2 flex-wrap">
          {rankList.map((item, index) => (
            <Link
              href={`/rank/${item.id}`}
              key={`${item.id}_${index}`}
              className={cn(
                "flex gap-2 px-2 py-1 text-sm rounded-lg cursor-pointer border hover:shadow-lg",
                rank.id === item.id && "text-red-600 dark:text-red-600"
              )}>
              <Image
                src={`/${item.source}.ico`}
                alt=""
                width={20}
                height={20}
              />
              <span className="flex-shrink-0">{item.name}</span>
            </Link>
          ))}
        </CardContent>
      </Card>
      {/* rank card */}
      <Content rank={rank} />
    </div>
  );
}

const Content = memo(({ rank }: { rank: Rank }) => {
  return (
    <Card className="border shadow-none border-slate-100 dark:border-slate-100 dark:border-none">
      <CardHeader className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-lg font-bold">
          <Image src={`/${rank.source}.ico`} alt="" width={20} height={20} />
          <span className="flex-shrink-0">{rank.name}</span>
        </div>
        <div className="text-sm">共 {rank.data.length} 条</div>
      </CardHeader>
      <CardContent>
        {rank.isLoadData ? (
          <SkeletonBar rowNum={20} />
        ) : (
          <div className="w-full flex flex-col gap-3">
            {rank.data.map((item, index) => (
              <div
                key={item.id}
                onClick={() => window.open(item.link, "_blank")}
                className="flex items-center gap-2 text-sm prose dark:prose-invert px-1 hover:cursor-pointer">
                <span
                  className={cn(
                    "flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-md w-6 h-6 flex-shrink-0",
                    index < 3 ? "text-white" : "",
                    index === 0
                      ? "bg-red-500 dark:bg-red-500 text-white"
                      : index === 1
                      ? "bg-orange-500 dark:bg-orange-500"
                      : index === 2
                      ? "bg-yellow-500 dark:bg-yellow-500"
                      : ""
                  )}>
                  {index + 1}
                </span>
                <span className="move-right-animate">{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
});
Content.displayName = "Content";