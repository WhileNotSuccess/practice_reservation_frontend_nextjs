'use client'
import { useState } from "react";
import { smallMenu } from "@/app/menu";

export default function HtmlDocs() {
  const [content, setContent] = useState<string>("");

  return (
    <div className="w-full h-screen">
      <div className="w-full" style={{height : "200px"}}></div>
    </div>

  );
}
