"use client";
import { useEffect } from "react";
import { GridView } from "@/components/grid-view";
import { getRankList } from "@/lib/store";
import { useImmer } from "use-immer";

const fetchRankData = async (index: number) => {
  try {
    const res = await fetch(`/api/hot-rank?id=${index}`);
    const { code, data } = await res.json();
    return code === 1 ? data : [];
  } catch (error) {
    console.error("Failed to fetch rank data:", error);
    return [];
  }
};

export default function HotRank() {
  const [rankList, updateRankList] = useImmer<Rank[]>([]);
  useEffect(() => {
    const initialRankList = getRankList();
    updateRankList(
      initialRankList.map((item) => ({
        ...item,
        data: [],
        isLoadData: true,
      }))
    );
    Promise.all(
      initialRankList.map(async (item: any, index) => {
        const rank = await fetchRankData(item.id);
        updateRankList((draft) => {
          draft[index].data = rank;
          draft[index].isLoadData = false;
        });
      })
    );
  }, []);
  return <GridView rankList={rankList} updateRankList={updateRankList} />;
}
