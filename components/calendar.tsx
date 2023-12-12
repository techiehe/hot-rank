"use client";
import { Solar } from "lunar-typescript";
import { useEffect, useRef, useState } from "react";
import { Calendar as ReactCalendar } from "@/components/ui/calendar";
import zhCN from "date-fns/locale/zh-CN";
import { format } from "date-fns";
import { DayContent, DayContentProps, DayPicker } from "react-day-picker";
import { Popover } from "./popover";
import { cn } from "@/lib/utils";

const DateTime = (props: DayContentProps) => {
  const dateTime = format(props.date, "yyyy-MM-dd");
  let _ = Solar.fromDate(props.date);
  const lunar = _.getLunar();

  const festivals = [..._.getFestivals(), ..._.getOtherFestivals()];

  const temp = (
    <>
      <time dateTime={dateTime}>
        <DayContent {...props} />
      </time>
      <div className="text-xs">
        {lunar.getJieQi().length ? (
          <span className=" text-red-600"> {lunar.getJieQi()}</span>
        ) : (
          <span>{_.getLunar().getDayInChinese()}</span>
        )}
      </div>
    </>
  );

  return (
    <div
      className={cn(
        "flex flex-col p-2 h-12 w-12  after:content-[''] ",
        festivals.length > 0 &&
          "after:block after:w-2 after:h-2 after:bg-red-500 after:rounded-full after:absolute after:right-0"
      )}>
      <Popover hoverEnabled={true} trigger={temp}>
        <div className="w-64 whitespace-normal text-left flex flex-col gap-2">
          <div>
            {festivals.map((item, index) => {
              return (
                <span
                  key={index}
                  className="text-red-500 px-2 py-1 rounded-md border">
                  {item}
                </span>
              );
            })}
          </div>
          <div>
            <span className="text-green-500 font-bold">宜：</span>
            {lunar.getDayYi().toString()}
          </div>
          <div>
            <span className="text-red-500 font-bold">忌：</span>
            {lunar.getDayJi().toString()}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default function Calendar() {
  const date = useRef(new Date());
  let _ = Solar.fromDate(date.current);
  return (
    <div>
      <div className=" text-xs">
        <span>注: 红点表示当日包含常见的国内国际节日和其他纪念日</span>
      </div>
      <ReactCalendar
        components={{ DayContent: DateTime }}
        mode="single"
        selected={date.current}
        className="rounded-md w-96"
        locale={zhCN}
        onDayClick={(day) => {}}
      />
    </div>
  );
}
