'use client'

import React, { useState } from "react";
import parse from "html-react-parser"
import Link from "next/link";
import fetchRestaurantList from "../hooks/fetchRestaurantList";
import fetchUserInfo from "../hooks/fetchUserInfo";


const RestaurantList: React.FC = () => {
    const [pageToggle, setPageToggle] = useState(true)
    const {user, setUser} = fetchUserInfo()
    const {restaurantList, setRestaurantList} = fetchRestaurantList(pageToggle)
  
  return (
    <>
    {restaurantList.map((restaurant, index) => (
      <article key={index} className="border border-black w-[40%] h-[60%] flex flex-col justify-between p-4">
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

export default RestaurantList;
