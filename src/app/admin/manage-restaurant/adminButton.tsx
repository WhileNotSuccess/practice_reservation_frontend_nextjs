
import useCustomFetch from "@/app/lib/customFetch";
import Link from "next/link";
import React from "react";

interface AdminButtonProps{
  id : number;
  setPageToggle : React.Dispatch<React.SetStateAction<boolean>> // useState를 보내줄때 사용하는 타입
}

export default function AdminButton({id,setPageToggle}:AdminButtonProps) {
  const customFetch = useCustomFetch()

  const onDelete = async(id : number)=>{ // 관리자가 식당을 삭제하는 함수
    try{
      const data = await customFetch(`/restaurant/${id}`,{
        method:'DELETE',
      })
      setPageToggle(prev => !prev)
      console.log(data, "삭제성공했어요")
    }
    catch(error){
      alert("식당을 삭제하지 못했어요")
      console.error(error, "삭제실패했어요")
    }
  }

  return (
    <section className="w-full h-[7%] flex content-center gap-2 mb-4 border border-black">
      <Link href={`/admin/update-restaurant/${id}`} className="border border-black">수정</Link>
      <button className="border border-black" onClick={()=>{onDelete(id)}}>삭제</button>
      <Link href={`/admin/restaurant-reservation/${id}`} className="border border-black">예약확인</Link>
    </section>
  );
}

