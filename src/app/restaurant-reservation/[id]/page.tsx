'use client'

import useCustomFetch from "@/app/lib/customFetch";
import router from "next/router";
import { use, useState } from "react";
import Calender from "react-calendar"
import "react-calendar/dist/Calendar.css";

export const dateChange = (date : Date)=>{  // 예약날짜를 2025-01-06 형식으로 바꾸는 함수
  const formatDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month : "2-digit",
    day : "2-digit"
  })

  const [year, month, day] = formatDate
  .replace(/\./g, "")
  .trim()
  .split(" ")

  const isoFormattedDate = `${year}-${month}-${day}`
  return isoFormattedDate
}

export default function Reservation({params} : {params : Promise<{id : string}>} ) {
  const [date, setDate] = useState<Date>(new Date()) // 예약날짜를 설정하기위한 변수
  const {id} = use(params) // 로그인한 유저의 id를 받아오는 변수
  const customFetch = useCustomFetch()

  const onDateChange = (e : any)=>{ // 예약날짜를 변경하기위한 함수
    setDate(e)
  }



  const onReservation = async(id : string, date : Date)=>{ // 해당날짜에 예약하는 함수
    const isoFormattedDate = dateChange(date)
    try{
      await customFetch(`restaurant/reservation/${id}`,{
        method : 'POST',
        body : JSON.stringify({date: isoFormattedDate})
      })
/*     await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurant/reservation/${id}`,{ 
      method : 'POST',
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({date : isoFormattedDate})
    }) */
      alert(`${isoFormattedDate}에 예약성공했습니다`)
      router.push('/home')
  }
   catch(error){
    alert("식당예약에 실패했어요")
    console.log(error, "예약실패했어요")
    }
  }

  return (
<main>
  식당예약페이지
 <article>
  <Calender onChange={onDateChange} value={date} locale="ko-KR"/>
 </article>
 <section>
 <button className="border border-black" onClick={()=>onReservation(id, date)}>예약하기</button>
 </section>
</main>
  );
}

