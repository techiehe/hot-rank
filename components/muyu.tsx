"use client";
import MuyuSvg from "@/assets/svg/muyu.svg";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function MuYu() {
  const [counter, setCounter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerMuyuHit = () => {
    setCounter((prevCounter) => prevCounter + 1);
    setIsAnimating(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === " " || event.code === "Space") {
        event.preventDefault(); // 防止任何默认行为，比如滚动
        triggerMuyuHit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    // 移除监听器
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsAnimating(false);
    }, 100);
    return () => {
      clearTimeout(t);
    };
  }, [isAnimating]);

  return (
    <div className="flex flex-col gap-8 justify-center text-center">
      <div className="flex justify-center items-center flex-col">
        <div className="text-[96px]">{counter}</div>
        <span className=" mt-[-2rem]">功德</span>
      </div>
      <MuyuSvg
        className={cn("cursor-pointer", isAnimating && "w-f-c-i-size")}
        onClick={triggerMuyuHit}
      />

      <footer>按下空格/点击木鱼积攒功德</footer>
    </div>
  );
}
