import * as cheerio from "cheerio";

export const meta = {
  name: "AcFun 排行榜",
  source: "acfun",
  url: "https://www.acfun.cn/rank/list?cid=-1&pcid=-1&range=THREE_DAYS",
  id: "acfun_rank",
};

export async function rank() {
  try {
    const res = await fetch(
      "https://www.acfun.cn/rest/pc-direct/rank/channel?channelId=&subChannelId=&rankLimit=30&rankPeriod=THREE_DAYS"
    );
    const json = await res.json();
    const rankList = json.rankList;
    return rankList.map((item: any, index: number) => {
      const { contentTitle, danmuCount, shareUrl } = item;
      return {
        id: `acfun_hot_${index + 1}`,
        title: contentTitle,
        link: shareUrl,
        heat: `弹幕数 ${danmuCount}`,
      };
    });
  } catch (e) {
    return [];
  }
}

export default {
  meta,
  rank,
};
