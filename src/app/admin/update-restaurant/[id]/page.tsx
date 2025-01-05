'use client'

import { use, useEffect } from "react";


export default function RestaurantPage({params} : {params : Promise<{id : number}>}) { // 임시로 만든 페이지라 현서가 만든 페이지로 교체하면 됨
  const user : string = "admin"
  const {id} = use(params)
  useEffect(()=>{
    if(user !=="admin"){
      alert("관리자가 아닙니다.")
    }
  })

  return (
    <div className="h-screen w-screen flex justify-evenly flex-wrap gap-5 mt-[4%]">
      {user === "admin" ?       <div>
        {id}을 수정할게요
      </div> : <></>}

    </div>
  );
}