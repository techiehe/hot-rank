export const meta = {
  name: "澎湃热榜",
  source: "pengpai",
  url: "https://www.thepaper.cn/",
  id: "pengpai_hot_rank",
};

export async function rank() {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Mobile Safari/537.36",
    };
    const res = await fetch(
      "https://cache.thepaper.cn/contentapi/wwwIndex/rightSidebar",
      {
        method: "GET",
        headers,
      }
    );
    const json = await res.json();
    const hotNews = json.data.hotNews;
    return hotNews.map((item: any, index: number) => {
      const { contId, name, pubTime } = item;
      return {
        id: `pengpai_hot_${index + 1}`,
        title: name,
        link: `https://www.thepaper.cn/newsDetail_forward_${contId}`,
        heat: pubTime,
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