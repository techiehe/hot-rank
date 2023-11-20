export const meta = {
  name: "BiliBili热搜",
  source: "bilibili",
  id: "bilibili_hot_search_rank",
};

export async function rank() {
  try {
    const res = await fetch(
      "https://api.bilibili.com/x/web-interface/wbi/search/square?limit=50",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    const list = json.data.trending.list;
    const data = list.map((item: any, index: number) => {
      return {
        id: `bilibili_${index + 1}`,
        title: item.keyword,
        link: `https://search.bilibili.com/all?keyword=${item.keyword}`,
        heat: "",
      };
    });

    return data;
  } catch (error) {
    return [];
  }
}
export default {
  meta,
  rank,
};
