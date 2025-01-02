'use client'

import React, { useEffect, useState } from "react";
import parse from "html-react-parser"
import AdminButton from "../admin/manage-restaurant/adminButton";


interface Restaurant {
  id : number;
  content: string;
  name: string;
  thumbnail : string
}

interface RestaurantListProps {
  user: string; 
}

const RestaurantList: React.FC<RestaurantListProps> = ({user}) => {
    const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
    const [pageTogle, setPageTogle] = useState(true)
  
    useEffect(() => { 
      const fetchRestaurants = async () => {
        try {
          const response = await fetch("http://localhost:3009/restaurant", { 
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const data: Restaurant[] = await response.json();
          setRestaurantList(data);
        } catch (error) {
          console.error("식당을 가져올 수 없어요:", error);
        }
      };
  
      fetchRestaurants();
    }, [pageTogle]);

    const onDelete = async(id : number)=>{
      await fetch(`http://localhost:3009/restaurant/${id}`,{
        method:'DELETE',
        headers :{
          'Content-Type' : 'application/json'
        }
      })
      .then(res=>{
        setRestaurantList((prevList) =>  // 더미코드 식당이 제대로 지워지는지확인용
          prevList.filter((restaurant) => restaurant.id !== id)
        );
        setPageTogle(!pageTogle)
        console.log(res, "삭제성공했어요")
      }).catch(e=>{
        console.log(e, "삭제 실패했어요")
      })
    }
  
  return (
    <>
    {restaurantList.map((restaurant, index) => (
      <div key={index} className="border border-black w-[40%] h-[60%] flex flex-col justify-between p-4">
        {user === "admin" && <AdminButton id={restaurant.id} onDelete={onDelete}/>}
        <img src={restaurant.thumbnail} className="w-[100%] h-[80%]"></img>
       <h2>{parse(restaurant.content)}</h2>
       <h2 className="text-md font-semibold w-[100%]">{restaurant.name}</h2>
      </div>
    ))}
    </>
  );
};

export default RestaurantList;
