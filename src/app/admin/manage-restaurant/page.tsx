'use client'
import React, { useEffect, useState } from "react";
import AdminButton from "../manage-restaurant/adminButton";
import RestaurantList from "../../home/restaurantItem";
import Link from "next/link";

interface Restaurant {
  name: string;
  content: string;
  thumbnail : string
}

const Restaurant: React.FC = () => {
  const user = "admin"; 
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);


  useEffect(() => { // 2번사용되서 차라리 다른 파일에 useeffect만 넣어서 함수만 불러쓸수 있게 바꿔야하나??
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
      <div className="w-[100%] ml-10 ">
      {user === "admin" && <Link href={"/admin/append-restaurant"}>추가</Link>}
      </div>
      {restaurantList.map((restaurant, index) => (
        <div key={index} className="border border-black w-[40%] h-[60%] flex flex-col justify-between p-4">
          {user === "admin" && <AdminButton />}
          <RestaurantList restaurant={restaurant} />
        </div>
      ))}
    </div>
  );
};

export default Restaurant;
