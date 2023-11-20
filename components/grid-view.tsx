"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Sortable from "sortablejs";

import { SkeletonBar } from "@/components/skeleton-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { BiRefresh, BiMove } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { setRankList } from "@/lib/store";
import TooltipString from "./tooltip-string";
const handleUpdateRankById = async (
  index: number,
  id: string,
  updateRankList: any
) => {
  try {
    updateRankList((draft: any) => {
      draft[index].isLoadData = true;
    });
    const res = await fetch("/api/hot-rank?id=" + id);
    const { code = 0, data = [] } = await res.json();
    if (code == 1) {
      updateRankList((draft: any) => {
        draft[index].data = data;
      });
      toast.success("刷新成功");
    }
  } finally {
    updateRankList((draft: any) => {
      draft[index].isLoadData = false;
    });
  }
};

/**
 * grid 布局
 *
 * @param param0
 * @returns
 */
export function GridView({
  rankList,
  updateRankList,
}: {
  rankList: Rank[];
  updateRankList: any;
}) {
  const gridViewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sortableInstance = gridViewRef.current
      ? Sortable.create(gridViewRef.current, {
          draggable: ".card",
          handle: ".move",
          chosenClass: "sortable-chosen",
          ghostClass: "sortable-ghost",
          dragClass: "sortable-drag",
          forceFallback: true,
          animation: 300,
          onEnd: (evt: any) => {
            const [oldIndex, newIndex] = [evt.oldIndex, evt.newIndex];
            if (oldIndex === newIndex) return;
            updateRankList((draft: any) => {
              const [element] = draft.splice(oldIndex, 1);
              draft.splice(newIndex, 0, element);
              setRankList(
                draft.map((item: any) => {
                  return {
                    ...item,
                    data: [],
                  };
                })
              );
              toast.success("排序成功");
            });
          },
        })
      : null;
    return () => {
      sortableInstance && sortableInstance.destroy();
    };
  }, []);
  return (
    <div
      ref={gridViewRef}
      className="grid flex-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-5">
      {rankList.map((item, index) => (
        <RankItem
          key={`item_rank_${item.id}`}
          rank={item}
          index={index}
          updateRankList={updateRankList}
        />
      ))}
    </div>
  );
}

/**
 * 热榜内容渲染
 * @param param0
 * @returns
 */
const RankItem = ({
  rank,
  index,
  updateRankList,
}: {
  rank: Rank;
  index: number;
  updateRankList: any;
}) => {
  return (
    <Card
      key={`card_${rank.id}_${index}`}
      className="card border shadow-none hover:shadow-lg border-slate-100 dark:border-slate-800 rounded-2xl">
      <CardHeader className="flex items-center justify-between gap-2">
        <Link href={`/rank/${rank.id}`}>
          <TooltipString tooltip="点击查看更多">
            <div className="flex items-center gap-2 text-sm">
              <Image
                src={`/${rank.source}.ico`}
                alt=""
                width={20}
                height={20}
              />
              <span className="dark:text-slate-400">{rank.name}</span>
            </div>
          </TooltipString>
        </Link>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="px-0 move" variant={"link"}>
                  <BiMove className={cn("w-5 h-5")} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>拖拽排序</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="px-0"
                  variant={"link"}
                  onClick={() =>
                    handleUpdateRankById(index, rank.id, updateRankList)
                  }>
                  <BiRefresh
                    className={cn("w-5 h-5", rank.isLoadData && "animate-spin")}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>刷新内容</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        {rank.isLoadData ? (
          <SkeletonBar rowNum={15} />
        ) : (
          <div className="h-[415px] pr-4 w-full flex flex-col gap-3 overflow-hidden hover:overflow-y-auto">
            {rank.data.map((item, index) => (
              <div
                key={`item_${item.id}`}
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
};
