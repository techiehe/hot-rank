"use client";
import { useTheme } from "next-themes";
import useHasMounted from "@/hook/use-has-mounted";
import Image from "next/image";
import Link from "next/link";
import Favicon from "@/app/favicon.ico";
import { AiOutlineSetting } from "react-icons/ai";
import { TooltipString } from "./tooltip";
import { BiSolidSun, BiSolidMoon, BiCalendar } from "react-icons/bi";
import { Button } from "./ui/button";
import { Solar } from "lunar-typescript";
import { useEffect, useRef, useState } from "react";
import useScroll from "@/hook/use-scroll";
import { cn } from "@/lib/utils";
import MuYuIcon from "@/assets/svg/muyu.svg";

const DateShow = ({ solar }: { solar: Solar }) => {
  return (
    <div className="flex flex-col text-center">
      <div>
        <span>{solar.toYmdHms()}</span>{" "}
        <span>星期{solar.getLunar().getWeekInChinese()} </span>
      </div>
      <div className="flex gap-1 justify-center">
        <span>
          {solar.getLunar().getYearInGanZhi()}(
          {solar.getLunar().getYearShengXiao()})年
        </span>
        <div>
          <span>{solar.getLunar().getMonthInChinese()}月</span>
          <span>{solar.getLunar().getDayInChinese()}日</span>
        </div>
      </div>
    </div>
  );
};

/**
 * 日期组建
 * @returns
 */
const DateCom = () => {
  const ref = useRef<any>(null);
  const [date, setDate] = useState<any>();
  const [flag, updateFlag] = useState<boolean>(false);
  const solar = useRef<Solar>();

  useEffect(() => {
    ref.current = setInterval(() => {
      setDate(new Date());
    }, 1000);
    if (date) {
      solar.current = Solar.fromDate(date);
    }
    return () => {
      clearInterval(ref.current);
    };
  }, [date]);

  useEffect(() => {
    ref.current = setInterval(() => {
      updateFlag((prev) => !prev);
    }, 1000);
    return () => {
      clearInterval(ref.current);
    };
  }, []);

  if (!date || !solar.current) {
    return null;
  }

  return (
    <div className="hidden sm:flex  gap-2 text-sm text-gray-800 dark:text-gray-400">
      <DateShow solar={solar.current} />
    </div>
  );
};

export default function Header() {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useTheme();
  const scrollInfo = useScroll();

  if (!hasMounted) {
    return null;
  }
  return (
    <nav
      className={cn(
        "flex justify-between items-center border-slate-100 p-4  bg-[hsl(var(--card))] bg-opacity-80 sticky top-0 z-[9998]",
        scrollInfo.y > 64 ? "shadow-md" : " border-b dark:border-none"
      )}>
      <Link href={"/"} className="flex gap-2 cursor-pointer pl-2">
        <Image src={Favicon} width={20} height={20} alt=""></Image>
        <span>热榜聚合</span>
      </Link>
      <DateCom />
      <div className="flex gap-2">
        <TooltipString
          tooltip={{
            content: "电子木鱼",
          }}>
          <Link href="/muyu">
            <Button size="icon" className="rounded-full w-8 h-8">
              <MuYuIcon className="w-4 h-4" />
            </Button>
          </Link>
        </TooltipString>
        <TooltipString
          tooltip={{
            content: "主题切换",
          }}>
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
        <TooltipString
          tooltip={{
            content: "网站设置",
          }}>
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
