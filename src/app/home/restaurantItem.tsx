import React from "react";
import parse from "html-react-parser"

interface Restaurant {
  content: string;
  name: string;
  thumbnail : string
}

interface RestaurantListProps {
  restaurant: Restaurant;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurant }) => {
  return (
    <div className="w-[100%] h-[100%]">
      <img src={restaurant.thumbnail} className="w-[100%] h-[80%]"></img>
      <h2>{parse(restaurant.content)}</h2>
      <h2 className="text-md font-semibold w-[100%]">{restaurant.name}</h2>
    </div>
  );
};

export default RestaurantList;
