export async function kuaiBaoRank(id: string, page: number = 1) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Mobile Safari/537.36",
    };
    const res = await fetch(
      `https://papi.jiemian.com/page/api/kuaixun/getlistmore?cid=${id}kb&start_time=${timestamp}&page=${page}&tagid=${id}`,
      {
        method: "GET",
        headers,
      }
    );
    const json = await res.json();
    const list = json.result.list;
    return list.map((item: any, index: number) => {
      const { title, id, hot_value, video_count } = item;
      return {
        id: `jiemain_hot_search_${index + 1}`,
        title,
        link: `https://www.jiemian.com/article/${id}.html`,
        heat: `${(hot_value / 10000).toFixed(2)} w / 视频数 ${video_count}`,
      };
    });
  } catch (e) {
    return [];
  }
}
