export const meta = {
  name: "每经热榜",
  source: "nbd",
  url: "https://www.nbd.com.cn/",
  id: "nbd_hot_rank",
};

export async function rank() {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Mobile Safari/537.36",
    };
    const res = await fetch(
      "https://www.nbd.com.cn/news-rank-nr-h5/rank_index/news",
      {
        method: "GET",
        headers,
      }
    );
    const json = await res.json();
    const hotNews = json.data.list;
    return hotNews.map((item: any, index: number) => {
      const { title, url: link } = item;
      return {
        id: `nbd_hot_${index + 1}`,
        title,
        link,
        heat: "",
      };
    });
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default {
  meta,
  rank,
};
