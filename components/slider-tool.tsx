"use client";

import { Button } from "./ui/button";
import { BiArrowToTop, BiCalendar } from "react-icons/bi";
import { TooltipString } from "./tooltip";
import { Popover } from "./popover";
import Calendar from "./calendar";

const SliderTool: React.FC = () => {
  return (
    <div className="fixed right-2 sm:right-5 bottom-12 flex flex-col gap-4">
      <Popover
        trigger={
          <Button size="icon" className="rounded-full">
            <BiCalendar className="w-5 h-5" />
          </Button>
        }>
        <Calendar />
      </Popover>
      <TooltipString
        tooltip={{
          content: "回到顶部",
          className: " whitespace-nowrap",
        }}>
        <Button
          size="icon"
          className="rounded-full"
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }>
          <BiArrowToTop className="w-5 h-5" />
        </Button>
      </TooltipString>
    </div>
  );
};

export default SliderTool;
