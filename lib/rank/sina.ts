export const meta = {
  name: "新浪热榜",
  source: "weibo",
  url: "https://sinanews.sina.cn/h5/top_news_list.d.html?localCityCode=CN44010000000000",
  id: "sina_hot_rank",
};

export async function rank() {
  try {
    const res = await fetch(
      "https://newsapp.sina.cn/api/hotlist?newsId=HB-1-snhs%2Ftop_news_list-all"
    );
    const json = await res.json();

    const hotList = json.data.hotList;
    return hotList.map((item: any, index: number) => {
      const {
        info,
        base: { base },
      } = item;
      return {
        id: `weibo_hot_${index + 1}`,
        title: info.title,
        link: base.url,
        heat: info.hotValue,
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
