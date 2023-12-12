import MuYu from "@/components/muyu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "电子木鱼 -  汇聚全网热点",
  description: "忙里偷闲",
};

export default function Muyu() {
  return (
    <div className="flex justify-center pt-48">
      <MuYu />
    </div>
  );
}
