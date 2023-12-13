import { kuaiBaoRank } from "./util";

export const meta = {
  name: "界面-今日热点",
  source: "jiemian",
  url: "https://www.jiemian.com/lists/1324kb.html",
  id: "jiemian_hot_article_rank",
};

export async function rank() {
  return [...(await kuaiBaoRank("1324", 1)), ...(await kuaiBaoRank("1324", 2))];
}
export default {
  meta,
  rank,
};
