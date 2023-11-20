import { rankMetaList } from "@/lib/rank";

export const getRankList = (): any[] => {
  const storedRankList = localStorage.getItem("rankMetaList");
  if (!storedRankList) {
    return rankMetaList;
  }
  const localRankMetaList = JSON.parse(storedRankList);
  const id2Item = rankMetaList.reduce((obj: any, item: any) => {
    obj[item.id] = item;
    return obj;
  }, {});
  const res: any[] = [];
  localRankMetaList.forEach((meta: any) => {
    const rank = id2Item[meta.id];
    rank && res.push(meta);
    delete id2Item[meta.id];
  });
  Object.keys(id2Item).forEach((id) => {
    res.push(id2Item[id]);
  });
  return res;
};

export const setRankList = (rankList: any) => {
  localStorage.setItem("rankMetaList", JSON.stringify(rankList));
};
