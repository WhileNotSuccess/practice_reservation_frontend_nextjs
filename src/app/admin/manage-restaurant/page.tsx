'use client'

import React, { useEffect, useState } from "react";
import RestaurantList from "../../home/restaurantItem";
import Link from "next/link";
import router from "next/router";

interface Restaurant {
  id : number;
  name: string;
  content: string;
  thumbnail : string
}

interface User {
  id : number;
  name : string;
  googleId : string;
  phone : string
}

const Restaurant: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const test = {
    id : 1
  } 

/*     useEffect(()=>{
      const fetchUser = async()=>{
        try{
          const response = await fetch("http://localhost:3009/user/info",{
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
    <div className="h-screen w-screen flex justify-evenly flex-wrap gap-5 mt-[4%]">
      <div className="w-[100%] ml-10 ">
      {test.id === 1 && <Link href={"/admin/append-restaurant"}>추가</Link>}
      </div>
      
      <RestaurantList/>
    </div>
  );
};

export default Restaurant;
