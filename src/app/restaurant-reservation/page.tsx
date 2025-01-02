'use client'

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Calander from "react-calendar"
import "react-calendar/dist/Calendar.css";

export default function Reservation() {
  const [date, setDate] = useState<Date>(new Date())
  const a = useSearchParams()
  //const id = a.get("id")
  const id = "1" // 변경 필수

  const onDateChange = (e : any)=>{
    setDate(e)
  }

  const onReservation = async(id : string, date : Date)=>{
    const formmatDate = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month : "2-digit",
      day : "2-digit"
    })

    const [year, month, day] = formmatDate
    .replace(/\./g, "")
    .trim()
    .split(" ")

    const isoFormattedDate = `${year}-${month}-${day}`
    console.log(isoFormattedDate)


    await fetch(`http://localhost:3009/restaurant/reservation/${id}`,{ 
      method : 'POST',
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({date : isoFormattedDate})
    }).then(()=>{
      alert(`${isoFormattedDate}에 예약성공했습니다`)
    }).catch(e=>{
      console.log(e, "예약실패했어요")
    })
  }

  return (
<div>
  식당예약페이지
 <div>
  <Calander onChange={onDateChange} value={date} locale="ko-KR"/>
 </div>
 <button className="border border-black" onClick={()=>onReservation(id, date)}>예약하기</button>
</div>
  );
}

