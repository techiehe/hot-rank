"use client";
import MuyuSvg from "@/assets/svg/muyu.svg";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MuYu() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex flex-col gap-4 justify-center text-center">
      <div className="text-[96px]">{counter}</div>

      <MuyuSvg
        className="cursor-pointer"
        onClick={() => {
          setCounter(counter + 1);
          toast.success("功德+1");
        }}
      />
    </div>
  );
}
