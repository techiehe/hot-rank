import ZhihuRank from "./zhihu";
import WeiboRank from "./weibo";
import BiliBiliRank from "./bilibili";
import ToutiaoRank from "./toutiao";
import BaiduRank from "./baidu";
import HuxiuRank from "./huxiu";
import DouyinHotSearchRank from "./douyin";
import PengpaiRank from "./pengpai";
import AcFun from "./acfun";
import QQNewsRank from "./qqnews";
import SinaRank from "./sina";
import PiyaoRank from "./piyao";
import TiebaRank from "./tieba";
import HistoryTodayRank from "./today-history";
import NBDRank from "@/lib/rank/nbd"

import HuPuList from "./hupu";
import _36KrList from "./36kr";

export const rankList = [
  HistoryTodayRank,
  AcFun,
  ZhihuRank,
  WeiboRank,
  NBDRank,
  SinaRank,
  BiliBiliRank,
  ToutiaoRank,
  BaiduRank,
  TiebaRank,
  ...HuPuList,
  ..._36KrList,
  HuxiuRank,
  DouyinHotSearchRank,
  PengpaiRank,
  QQNewsRank,
  PiyaoRank,
];

export const rankMetaList = rankList.map((rank) => rank.meta);

export const id2Item = rankList.reduce((obj: any, item: any) => {
  obj[item.meta.id] = item;
  return obj;
}, {});

export async function AllRank() {
  const data = await Promise.all(rankList.map((rank) => rank.rank()));
  return data;
}

export async function Rank(id: string) {
  const data = await id2Item[id].rank();
  return data;
}
