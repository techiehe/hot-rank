import { kuaiBaoRank } from "./util";

export const meta = {
  name: "界面-股票前沿",
  source: "jiemian",
  url: "https://www.jiemian.com/lists/1327kb.html",
  id: "jiemian_gupiao",
};

export async function rank() {
  return [...(await kuaiBaoRank("1327", 1)), ...(await kuaiBaoRank("1327", 2))];
}
export default {
  meta,
  rank,
};
