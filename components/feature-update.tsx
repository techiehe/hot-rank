"use client";
import { BiRocket } from "react-icons/bi";
import Alert from "./alert";
import { useEffect, useState } from "react";

export default function FeatureUpdate() {
  const [show, setShow] = useState(false);
  const key = "feature-update——1";
  useEffect(() => {
    const t = JSON.parse(localStorage.getItem(key) || "true");
    setShow(t);
  }, []);

  return (
    show && (
      <Alert
        icon={<BiRocket />}
        close={() => {
          setShow(false);
          localStorage.setItem(key, "false");
        }}
        title="热榜聚合">
        新增 界面股票前沿/今日热点板块
      </Alert>
    )
  );
}
