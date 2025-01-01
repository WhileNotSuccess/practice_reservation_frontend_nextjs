import React, { useEffect, useState } from "react";
// import AdminButton from "../manage-restaurant/adminButton";
import RestaurantList from "../../home/restaurantItem";
import Link from "next/link";
import router from "next/router";

interface Restaurant {
  id : number;
  name: string;
  content: string;
  thumbnail : string
}

const Restaurant: React.FC = () => {
  const user = "admin"; 

  useEffect(()=>{
    if(user !=="admin"){
      alert("관리자가 아닙니다.")
      router.push("/")
    }
  })

  return (
    <div className="h-screen w-screen flex justify-evenly flex-wrap gap-5 mt-[4%]">
      <div className="w-[100%] ml-10 ">
      {user === "admin" && <Link href={"/admin/append-restaurant"}>추가</Link>}
      </div>
      
      <RestaurantList user={user}/>
    </div>
  );
};

export default Restaurant;
