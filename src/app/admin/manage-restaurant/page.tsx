'use client'

import React, { useEffect, useState } from "react";
import AdminRestaurantList from "./restaurantManagementItem";
import Link from "next/link";
import fetchUserInfo from "@/app/hooks/fetchUserInfo";


const Restaurant: React.FC = () => {
  const {user, setUser} = fetchUserInfo()

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
