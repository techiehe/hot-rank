export const meta = {
  name: "贴吧热议话题",
  source: "baidu",
  url: "https://tieba.baidu.com/hottopic/browse/topicList?res_type=1",
  id: "tieba_hot_topic_rank",
};

export async function rank() {
  try {
    const res = await fetch(
      "https://tieba.baidu.com/hottopic/browse/topicList"
    );
    const json = await res.json();
    const { data: { bang_topic: { topic_list = [] } = {} } = {} } = json;
    const data = topic_list.map((item: any, index: number) => {
      const { topic_name, topic_url } = item;
      return {
        id: `toutiao_gov_${index + 1}`,
        title: topic_name,
        link: topic_url,
        heat: "",
      };
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
