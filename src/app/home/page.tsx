import React from "react";
import RestaurantList from "./restaurantItem";

export default function Restaurant() {


  return (
    <div className="h-screen w-screen flex justify-evenly flex-wrap gap-5 mt-[4%]">
      <RestaurantList/>
    </div>
  );
}
