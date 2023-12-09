"use client";
import { useTheme } from "next-themes";
import useHasMounted from "@/hook/use-has-mounted";
import Image from "next/image";
import Link from "next/link";
import Favicon from "@/app/favicon.ico";
import { AiOutlineSetting } from "react-icons/ai";
import TooltipString from "./tooltip-string";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { Button } from "./ui/button";
import { Solar } from "lunar-typescript";
import { useEffect, useRef, useState } from "react";

const DateCom = () => {
  const ref = useRef<any>(null);
  const [flag, updateFlag] = useState<boolean>(false);
  const solar = Solar.fromDate(new Date());
  const lunarYear = solar.getLunar();
  const yi = lunarYear.getDayYi();
  const ji = lunarYear.getDayJi();
  useEffect(() => {
    ref.current = setInterval(() => {
      updateFlag((prev) => !prev);
    }, 1000);
    return () => {
      clearInterval(ref.current);
    };
  }, []);

  return (
    <div className="hidden sm:flex  gap-2 text-sm text-gray-800 dark:text-gray-400">
      <div className="flex flex-col text-center">
        <div>
          <span>{solar.toYmdHms()}</span>{" "}
          <span>星期{lunarYear.getWeekInChinese()} </span>
        </div>
        <div className="flex gap-1 justify-center">
          <span>
            {lunarYear.getYearInGanZhi()}({lunarYear.getYearShengXiao()})年
          </span>
          <div>
            <span>{lunarYear.getMonthInChinese()}月</span>
            <span>{lunarYear.getDayInChinese()}日</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          <span className="text-green-500 font-bold">宜：</span>
          {yi.toString()}
        </div>
        <div>
          <span className="text-red-500 font-bold">忌：</span>
          {ji.toString()}
        </div>
      </div>
    </div>
  );
};

export default function Header() {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useTheme();
  if (!hasMounted) {
    return null;
  }
  return (
    <nav className="flex justify-between items-center border-slate-100 p-4  bg-[hsl(var(--card))] bg-opacity-80 sticky top-0">
      <Link href={"/"} className="flex gap-2 cursor-pointer pl-2">
        <Image src={Favicon} width={20} height={20} alt=""></Image>
        <span>热榜聚合</span>
      </Link>
      <DateCom />
      <div className="flex gap-2">
        <TooltipString tooltip="主题切换">
          <Button size="icon" className="rounded-full  w-8 h-8">
            {theme === "dark" ? (
              <BiSolidSun
                className="w-4 h-4"
                onClick={() => setTheme("light")}
              />
            ) : (
              <BiSolidMoon
                className="w-4 h-4"
                onClick={() => setTheme("dark")}
              />
            )}
          </Button>
        </TooltipString>
        <TooltipString tooltip="网站设置">
          <Link href="/setting">
            <Button size="icon" className="rounded-full w-8 h-8">
              <AiOutlineSetting className="w-4 h-4" />
            </Button>
          </Link>
        </TooltipString>
      </div>
    </nav>
  );
}
