import { gen } from "./cookie";

export const meta = {
  name: "微博文娱榜",
  source: "weibo",
  url: "https://weibo.com/hot/entertainment",
  id: "weibo_hot_entertainment",
};

export async function rank() {
  try {
    const res = await fetch("https://weibo.com/ajax/statuses/entertainment", {
      headers: {
        cookie: gen(),
      },
    });
    const json = await res.json();
    const { band_list = [] } = json.data;

    const data: RankItem[] = [];

    band_list.forEach((item: any, index: number) => {
      const { topic, read, word, word_scheme } = item;
      data.push({
        id: `weibo_entertainment_${index + 1}`,
        title: word,
        link: `https://s.weibo.com/weibo?q=${word_scheme}`,
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
