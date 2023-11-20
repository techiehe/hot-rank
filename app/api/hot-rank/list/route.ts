import { NextResponse } from "next/server";
import { rankList } from "@/lib/rank";

export const GET = async () => {
  return NextResponse.json({
    data: rankList.map((rank) => {
      return {
        ...rank.meta,
      };
    }),
    code: 1,
  });
};
