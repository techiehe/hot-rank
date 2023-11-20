export const meta = {
  name: "网络谣言曝光台",
  source: "zhongguopiyao",
  url: "https://www.piyao.org.cn/yybgt/index.htm",
  desc: "只展示 50 个，更多点击标题",
  id: "online_piyao",
};

export async function rank() {
  try {
    const res = await fetch(
      "https://www.piyao.org.cn/yybgt/ds_51d695fa456c4391bb119379c98df87b.json"
    );
    const json = await res.json();
    const rankList = json.datasource;
    rankList.splice(50);
    return rankList.map((item: any, index: number) => {
      const { showTitle, publishUrl, publishTime } = item;
      const [date] = publishTime.split(" ");
      return {
        id: `zhongguopiyao_${index + 1}`,
        title: showTitle,
        link: publishUrl.replace("..", "https://www.piyao.org.cn/"),
        heat: date,
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
