'use client'

import React, { useEffect, useState } from "react";
import AdminRestaurantList from "./restaurantManagementItem";
import Link from "next/link";
import router from "next/router";
import {User} from "../../common/types"


const Restaurant: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const test = {
    id : 1
  } 

/*     useEffect(()=>{
      const fetchUser = async()=>{
        try{
          const response = await fetch("${process.env.NEXT_PUBLIC_BACKEND_URL}/user/info",{
            method: "GET",
            headers: {"Content-Type" : "application/json"}
          })
          const data : User = await response.json()
          setUser(data)
        }
        catch(error){
          console.error("유저정보를 가져올수 없어요", error)
        }
      }
      fetchUser()
    },[]) */

  return (
    <main className="h-screen w-screen flex justify-evenly flex-wrap gap-5 mt-[4%]">
      <nav className="w-[100%] ml-10 ">
      <Link href={"/admin/append-restaurant"}>추가</Link>
      </nav>
      
      <AdminRestaurantList/>
    </main>
  );
};

export default Restaurant;
