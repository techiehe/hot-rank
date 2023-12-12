import { useState, useEffect } from "react";

// 自定义Hook，用于监听窗口的滚动事件
function useScroll() {
  // 状态用于存储滚动位置
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 用于更新滚动位置的函数
    const updatePosition = () => {
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
    };
    // 添加滚动事件监听器
    window.addEventListener("scroll", updatePosition);
    // 当组件卸载时，移除事件监听器
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
}

export default useScroll;
