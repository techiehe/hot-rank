"use client";
import { useRef } from "react";
import { BiX } from "react-icons/bi";

export default function Alert({
  children,
  title,
  icon,
  close,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  icon?: React.ReactNode;
  close?: () => void;
}) {
  const alertRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={alertRef}
      role="alert"
      className="flex gap-2 items-center w-full rounded-lg border px-4 py-3 text-sm bg-background text-foreground relative">
      {icon && <div className="alert-icon">{icon}</div>}
      <div className="alert-content flex flex-1 flex-col  gap-2">
        <span className="font-bold text-sm pr-4">{title}</span>
        <div className="text-sm [&_p]:leading-relaxed">{children}</div>
        <BiX
          className="w-4 h-4 cursor-pointer absolute top-3 right-4 text-gray-500"
          onClick={() => {
            close ? close() : alertRef?.current?.remove();
          }}></BiX>
      </div>
    </div>
  );
}
