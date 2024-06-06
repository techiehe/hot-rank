import { NextResponse } from "next/server";

import { gen } from "@/lib/rank/weibo/cookie";

export const GET = async () => {
  const res = await fetch("https://weibo.com/hot/news");
  console.log(gen());

  return NextResponse.json({
    data: gen(),
    code: 1,
  });
};
