'use client'

import { useEffect, useState } from "react";
import {Restaurant} from "../common/types"
import useCustomFetch from "../lib/customFetch";

const fetchRestaurantList = (pageToggle : boolean)=>{ // 전체식당을 불러오는 함수
      const [restaurantList, setRestaurantList] = useState<Restaurant[]>([])
      const customFetch = useCustomFetch()

      useEffect(() => { 
        const fetchRestaurants = async () => {
          try {
            const data: Restaurant[] = await customFetch('/restaurant', {
              method : "GET"
            })
            setRestaurantList(data);
          } catch (error) {
            alert("식당정보를 가져올수 없어요")
            console.error("식당을 가져올 수 없어요:", error);
          }
        };
        fetchRestaurants()
      },[pageToggle])
      return {restaurantList, setRestaurantList}
}

export default fetchRestaurantList