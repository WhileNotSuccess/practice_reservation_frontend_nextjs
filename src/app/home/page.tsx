'use client'
import React, { useEffect, useState } from "react";
import AdminButton from "../admin/manage-restaurant/adminButton";
import RestaurantList from "./restaurantItem";
import Link from "next/link";

interface Restaurant {
  name: string;
  content: string;
  thumbnail : string
}

const Restaurant: React.FC = () => {
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
    <div className="h-screen w-screen flex justify-evenly flex-wrap gap-5 mt-[4%]">

      {restaurantList.map((restaurant, index) => (
        <div key={index} className="border border-black w-[40%] h-[60%] flex flex-col justify-between p-4">
          <RestaurantList restaurant={restaurant} />
        </div>
      ))}
    </div>
  );
};

export default Restaurant;
