
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdminButtonProps{
  id : number;
  onDelete : (id:number)=>void;
}

export default function AdminButton({id, onDelete}:AdminButtonProps) {

  return (
    <div className="w-full h-[7%] flex content-center gap-2 mb-4 border border-black">
      <Link href={`/admin/append-restaurant/${id}`} className="border border-black">수정</Link>
      <button className="border border-black" onClick={()=>{onDelete(id)}}>삭제</button>
      <Link href={`/admin/restaurant-reservation/${id}`} className="border border-black">예약확인</Link>
    </div>
  );
}

