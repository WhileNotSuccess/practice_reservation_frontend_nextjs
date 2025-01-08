'use client'

import React, { useState } from "react";
import parse from "html-react-parser"
import AdminButton from "./adminButton";
import Link from "next/link";
import fetchRestaurantList from "../../hooks/fetchRestaurantList";


const AdminRestaurantList: React.FC = () => {
    const [pageToggle, setPageToggle] = useState(true)
    const {restaurantList, setRestaurantList} = fetchRestaurantList(pageToggle) // 커스텀훅 : 전체식당 리스트

  return (
    <>
    {restaurantList.map((restaurant, index) => ( // thumbnail이 없는주소라 화면에는 문제 없지만 에러가 뜸
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
