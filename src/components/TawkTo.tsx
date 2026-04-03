"use client";

import { useEffect } from "react";

// 1. 去 https://www.tawk.to 注册并创建 Property
// 2. 进入 Administration > Chat Widget，复制 Widget 代码中的两个 ID
// 3. 替换下方的 PROPERTY_ID 和 WIDGET_ID

const TAWK_PROPERTY_ID = "YOUR_PROPERTY_ID"; // e.g. "64a1b2c3d4e5f6a7b8c9d0e1"
const TAWK_WIDGET_ID = "YOUR_WIDGET_ID";     // e.g. "1habcdefg"

export default function TawkTo() {
  useEffect(() => {
    if (TAWK_PROPERTY_ID === "YOUR_PROPERTY_ID") return;

    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.head.appendChild(s1);

    return () => {
      document.head.removeChild(s1);
    };
  }, []);

  return null;
}
