export const meta = {
  name: "知乎热榜",
  source: "zhihu",
  url: "https://www.zhihu.com/hot",
  id: "zhihu_hot_rank",
};

export async function rank() {
  try {
    const res = await fetch(
      "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    const data = json.data.map(({ target, detail_text = "0" }: any) => {
      // https://www.zhihu.com/question/631267312
      const { id, title } = target;
      const heat = Number(detail_text.match(/\d+/));
      const link = `https://www.zhihu.com/question/${id}`;
      return {
        id,
        title,
        link,
        heat: heat ? heat + " w" : "累计中",
      };
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default {
  meta,
  rank,
};
