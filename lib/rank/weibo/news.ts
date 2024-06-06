import { gen } from "./cookie";

export const meta = {
  name: "微博要闻榜",
  source: "weibo",
  url: "https://weibo.com/hot/news",
  id: "weibo_hot_news",
};

export async function rank() {
  try {
    const res = await fetch("https://weibo.com/ajax/statuses/news", {
      headers:{
        cookie: gen()
      }
    });
    const json = await res.json();
    const {band_list = [] } = json.data;

    const data: RankItem[] = [];

    band_list.forEach((item: any, index: number) => {
      const { topic, read } = item;
      data.push({
        id: `weibo_news_${index + 1}`,
        title: topic,
        link: `https://s.weibo.com/weibo?q=%23${topic}%23`,
        heat: `${(read / 10000).toFixed(2)} w`,
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
