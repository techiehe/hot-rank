export const meta = {
  name: "抖音热搜榜",
  source: "douyin",
  url: "https://www.douyin.com/discover",
  id: "douyin_hot_search_rank",
};

export  async function rank() {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Mobile Safari/537.36",
    };
    const res = await fetch(
      "https://aweme.snssdk.com/aweme/v1/hot/search/list/?detail_list=1",
      {
        method: "GET",
        headers,
      }
    );
    const json = await res.json();

    const trending_list = json.data.trending_list;

    const list = [].concat.apply(json.data.word_list, trending_list);

    return list.map((item: any, index: number) => {
      const { word, sentence_id, hot_value, video_count } = item;
      return {
        id: `douyin_hot_search_${index + 1}`,
        title: word,
        link: `https://www.douyin.com/hot/${sentence_id}/${word}`,
        heat: `${(hot_value / 10000).toFixed(2)} w / 视频数 ${video_count}`,
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