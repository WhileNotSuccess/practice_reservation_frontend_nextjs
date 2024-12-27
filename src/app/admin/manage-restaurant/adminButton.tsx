'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminButton() {
  const id = 1;
  const a = useRouter()

  const onDelete = async(id : number)=>{
    await fetch(`http://localhost:3001/restaurant/${id}`,{
      method:'DELETE',
      headers :{
        'Content-Type' : 'application/json'
      }
    })
    .then(res=>{
      console.log(res, "삭제성공했어요")
    }).catch(e=>{
      console.log(e, "삭제 실패했어요")
    })
  }

  return (
    <div className="w-full h-[7%] flex content-center gap-2 mb-4 border border-black">
      <Link href={`/admin/append-restaurant/${id}`} className="border border-black">수정</Link>
      <button className="border border-black" onClick={()=>{onDelete(id)}}>삭제</button>
      <Link href={`/admin/restaurant-reservation/${id}`} className="border border-black">예약확인</Link>
    </div>
  );
}

