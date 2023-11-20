import * as cheerio from "cheerio";

import { format } from "date-fns";

export const BaseURL = "https://36kr.com"

export const meta = {
  name: "36 氪人气榜",
  source: "36kr",
  id: "36kr_renqi_rank",
  url: `${BaseURL}/hot-list/catalog`,
};

export async function rank() {
  try {
    const currentDate = new Date();
    const date = format(currentDate, "yyyy-MM-dd");
    console.log(`${BaseURL}/hot-list/renqi/${date}/1`);
    const res = await fetch(`${BaseURL}/hot-list/renqi/${date}/1`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const list = $(
      "#app > div > div.kr-layout-main.clearfloat > div.main-right > div > div > div.main-wrapper > div.list-wrapper > div > div.article-wrapper > div > div > div.kr-shadow-content > div.article-item-info.clearfloat"
    );
    const data: any = [];
    list.each(function (index) {
      const titleA = $(this).find("a.article-item-title");
      //   const descA = $(this).find("a.article-item-description");
      console.log();
      const title = titleA.text();
      const link = titleA.attr("href");
      //   const desc = descA.text();
      data.push({
        id: `36kr_renqi_${index + 1}`,
        title,
        link: `${BaseURL}${link}`,
        // desc: desc,
        heat: null,
      });
    });
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default {
  meta,
  rank,
};
