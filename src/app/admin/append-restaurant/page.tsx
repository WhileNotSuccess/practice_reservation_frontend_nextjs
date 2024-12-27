'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function RestaurantPage() {
  const user : string = "admin"
  const router = useRouter()

  useEffect(()=>{
    if(user !=="admin"){
      alert("관리자가 아닙니다.")
      router.push("/")
    }
  })

  return (
    <div className="h-screen w-screen flex justify-evenly flex-wrap gap-5 mt-[4%]">
      {user === "admin" ?       <div>
        관리자전용 게시글 작성페이지
      </div> : <></>}

    </div>
  );
}