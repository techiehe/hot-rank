export const meta = {
  name: "历史上的今天",
  source: "baidu",
  id: "history_today",
};

function removeLinksKeepContent(text: string) {
  // 使用正则表达式匹配超链接
  // 使用正则表达式匹配超链接
  var regex = /<a\b[^>]*>(.*?)<\/a>/gi;

  // 通过替换为匹配到的内容来去除超链接的标签
  var result = text.replace(regex, "$1");

  return result;
}

export async function rank() {
  try {
    // 创建一个 Date 对象
    const currentDate = new Date();
    // 获取当前的月份（注意：月份是从0开始计数的，所以需要加1）
    const month = currentDate.getMonth() + 1;
    const currentMonth = month < 10 ? "0" + month : month;
    // 获取当前的日期
    const day = currentDate.getDate();
    const currentDay = day < 10 ? "0" + day : day;
    const res = await fetch(
      `https://baike.baidu.com/cms/home/eventsOnHistory/${currentMonth}.json`
    );
    const json = await res.json();
    const {
      [currentMonth]: { [`${currentMonth}${currentDay}`]: list },
    } = json;
    const data = list.map((item: any, index: number) => {
      const { title, link } = item;
      return {
        id: `toutiao_gov_${index + 1}`,
        title: removeLinksKeepContent(title),
        link: link,
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
