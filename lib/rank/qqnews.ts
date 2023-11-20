export const meta = {
  name: "腾讯热点榜",
  source: "tengxun",
  url: "https://news.qq.com/",
  id: "tencent_hot_rank",
};

export async function rank() {
  try {
    const res = await fetch(
      "https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/NinjaPageContentSync?pull_urls=news_top_2018"
    );
    const json = await res.json();
    const rankList = json.data;
    return rankList.map((item: any, index: number) => {
      const { title, url } = item;
      return {
        id: `tengxun_hot_${index + 1}`,
        title: title,
        link: url,
        heat: null,
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
