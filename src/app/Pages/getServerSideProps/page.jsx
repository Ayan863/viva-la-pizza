"use client"
import { useEffect, useState } from "react";

export default function MyPage() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("key");
      setValue(storedValue);
    }
  }, []);

  return <div>Stored Value: {value}</div>;
}
