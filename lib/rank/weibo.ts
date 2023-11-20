export const meta = {
  name: "微博热搜",
  source: "weibo",
  url: "https://weibo.com/hot/search",
  id: "weibo_hot_search_rank",
};

export async function rank() {
  try {
    const res = await fetch("https://weibo.com/ajax/side/hotSearch");
    const json = await res.json();
    const { realtime = [], hotgovs = [] } = json.data;

    const data: RankItem[] = [];

    hotgovs.forEach((item: any, index: number) => {
      data.push({
        id: `weibo_gov_${index}`,
        title: item.word,
        link: item.url,
        heat: "国家新闻",
      });
    });

    realtime.forEach((item: any, index: number) => {
      const { rank, word, raw_hot } = item;
      data.push({
        id: `weibo_${index + 1}`,
        title: word,
        link: `https://s.weibo.com/weibo?q=${word}`,
        heat: `${(raw_hot / 10000).toFixed(2)} w`,
      });
    });
    return data;
  } catch (e) {
    return [];
  }
}
export default {
  meta,
  rank,
};
