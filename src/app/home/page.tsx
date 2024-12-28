import React, { useEffect, useState } from "react";
import RestaurantList from "./restaurantItem";

interface Restaurant {
  name: string;
  content: string;
  thumbnail : string
}

const Restaurant: React.FC = () => {
  const user = "user"
  return (
    <div className="h-screen w-screen flex justify-evenly flex-wrap gap-5 mt-[4%]">
      <RestaurantList user={user}/>
    </div>
  );
};

export default Restaurant;
