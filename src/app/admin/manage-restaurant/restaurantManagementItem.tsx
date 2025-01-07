'use client'

import React, { useEffect, useState } from "react";
import parse from "html-react-parser"
import AdminButton from "./adminButton";
import Link from "next/link";
import {User, Restaurant} from '../../common/types'
import fetchRestaurantList from "../../hooks/fetchRestaurantList";


const AdminRestaurantList: React.FC = () => {
    const [pageToggle, setPageToggle] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const {restaurantList, setRestaurantList} = fetchRestaurantList(pageToggle) // 커스텀훅 : 전체식당 리스트

    const test = { // 유저정보 하드코딩용
      id : 2
    }


/*     useEffect(()=>{
      const fetchUser = async()=>{
        try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/info`,{
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
    <>
    {restaurantList.map((restaurant, index) => ( // 43번째줄 변수명 변경
      <article key={index} className="border border-black w-[40%] h-[60%] flex flex-col justify-between p-4">
        <AdminButton id={restaurant.id} setPageToggle={setPageToggle}/>
        <figure className="w-[100%] h-[80%]">
        <img src={restaurant.thumbnail} ></img>
       <h2>{parse(restaurant.content)}</h2>
       </figure>
       <Link className="text-md font-semibold w-[100%]" href={`restaurant/${restaurant.id}`}>{restaurant.name}</Link>
      </article>
    ))}
    </>
  );
};

export default AdminRestaurantList;
