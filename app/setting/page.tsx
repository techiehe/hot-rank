"use client";
import Sortable from "sortablejs";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getRankList, setRankList } from "@/lib/store";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useImmer } from "use-immer";

export default function Setting() {
  const rankListRef = useRef<HTMLDivElement>(null);
  const [rankMetaList, updateRankMetaList] = useImmer<any[]>([]);
  const rankMetaListRef = useRef<any[]>([]);

  useEffect(() => {
    rankMetaListRef.current = getRankList();
    updateRankMetaList(rankMetaListRef.current);

    const sortableInstance = rankListRef.current
      ? Sortable.create(rankListRef.current, {
          chosenClass: "sortable-chosen",
          ghostClass: "sortable-ghost",
          dragClass: "sortable-drag",
          forceFallback: true,
          animation: 300,
          delay: 500,
          onEnd: (evt: any) => {
            const [oldIndex, newIndex] = [evt.oldIndex, evt.newIndex];
            if (oldIndex === newIndex) return;

            updateRankMetaList((draft: any) => {
              const [element] = draft.splice(oldIndex, 1);
              draft.splice(newIndex, 0, element);
              setRankList(draft);
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
    <Card className="border rounded-md">
      <CardHeader className="flex justify-between items-center">
        <div>
          <div className="text-xl ">榜单排序</div>
          <p className="text-sm text-slate-400">长按拖拽排序 </p>
        </div>
        <Button
          onClick={() => {
            updateRankMetaList((draft) => {
              draft.splice(0, draft.length, ...rankMetaListRef.current);
              setRankList(rankMetaList);
            });
            toast.success("重置成功");
          }}>
          重置
        </Button>
      </CardHeader>
      <CardContent>
        <div
          ref={rankListRef}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 3xl:grid-cols-6 gap-2">
          {rankMetaList.map((rank: any) => (
            <div
              key={rank.id}
              className="cursor-move px-4 py-2 border rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={`/${rank.source}.ico`}
                    alt=""
                    width={32}
                    height={32}
                  />
                  <span className=" text-lg"> {rank.name}</span>
                </div>
                <Switch checked={true}></Switch>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
