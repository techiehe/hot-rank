import * as cheerio from "cheerio";

export const meta = {
  name: "虎扑影视娱乐",
  source: "hupu",
  url: "https://bbs.hupu.com/all-ent",
  id: "hupu_yingshiyule_rank",
};

export async function rank() {
  try {
    const res = await fetch("https://bbs.hupu.com/all-ent");
    const html = await res.text();
    const $ = cheerio.load(html);
    const list = $(
      "#container > div > div.bbs-index-web-holder > div > div.bbs-index-web-middle > div > div.text-list-model > div > div > div"
    );
    const data: any = [];
    list.each(function (index) {
      const a = $(this).find(".t-info > a");
      const title = a.text();
      const link = a.attr("href");
      const heat = $(this).find(".t-info > span").text();
      data.push({
        id: `hupu_yingshiyule_${index + 1}`,
        title,
        link: `https://bbs.hupu.com/${link}`,
        heat,
      });
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
