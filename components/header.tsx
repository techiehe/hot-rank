"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useTheme } from "next-themes";
import useHasMounted from "@/hook/use-has-mounted";
import Image from "next/image";
import Link from "next/link";
import Favicon from "@/app/favicon.ico";
import { AiOutlineSetting } from "react-icons/ai";
import TooltipString from "./tooltip-string";
import { BiSolidSun, BiSolidMoon, BiHomeAlt } from "react-icons/bi";
import { Button } from "./ui/button";
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
      <div className="flex gap-2">
        <TooltipString tooltip="主题切换">
          <Button size="icon" className="rounded-full">
            {theme === "dark" ? (
              <BiSolidSun
                className="w-5 h-5"
                onClick={() => setTheme("light")}
              />
            ) : (
              <BiSolidMoon
                className="w-5 h-5"
                onClick={() => setTheme("dark")}
              />
            )}
          </Button>
        </TooltipString>
        <TooltipString tooltip="网站设置">
          <Link href="/setting">
            <Button size="icon" className="rounded-full">
              <AiOutlineSetting className="w-4 h-4" />
            </Button>
          </Link>
        </TooltipString>
      </div>
    </nav>
  );
}
