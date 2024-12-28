'use client'

import React, { useEffect, useState } from "react";
import parse from "html-react-parser"
import AdminButton from "../admin/manage-restaurant/adminButton";


interface Restaurant {
  content: string;
  name: string;
  thumbnail : string
}

interface RestaurantListProps {
  user: string; 
}

const RestaurantList: React.FC<RestaurantListProps> = ({user}) => {
    const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  
    useEffect(() => { // admin/manage-restaurant/page.tsx와 같이 사용하는 식당불러오는 함수라 다른파일에 빼는 방법?
      const fetchRestaurants = async () => {
        try {
          const response = await fetch("http://localhost:3001/restaurants", { 
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
    }, []);
  
  return (
    <>
    {restaurantList.map((restaurant, index) => (
      <div key={index} className="border border-black w-[40%] h-[60%] flex flex-col justify-between p-4">
        {user === "admin" && <AdminButton/>}
        <img src={restaurant.thumbnail} className="w-[100%] h-[80%]"></img>
       <h2>{parse(restaurant.content)}</h2>
       <h2 className="text-md font-semibold w-[100%]">{restaurant.name}</h2>
      </div>
    ))}
    </>
  );
};

export default RestaurantList;
