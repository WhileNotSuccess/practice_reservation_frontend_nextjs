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
    const formmatDate = date.toISOString().slice(0,10)
    await fetch(`http://localhost:3001/restaurant/reservation/${id}`,{ 
      method : 'POST',
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({date : formmatDate})
    }).then(()=>{
      alert(`${formmatDate}에 예약성공했습니다`)
    }).catch(e=>{
      console.log(e, "예약실패했어요")
    })
  }

  return (
<div>
  식당예약페이지
 <div>
  <Calander onChange={onDateChange} value={date}/>
 </div>
 <button className="border border-black" onClick={()=>onReservation(id, date)}>예약하기</button>
</div>
  );
}

