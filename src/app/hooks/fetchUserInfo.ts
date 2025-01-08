'use client'

import { useEffect, useState } from "react"
import { User } from "../common/types"
import useCustomFetch from "../lib/customFetch"



const fetchUserInfo = () =>{ // 유저정보를 가져오는 함수
  const [user, setUser] = useState<User | null>(null)
  const customFetch = useCustomFetch()

  useEffect(()=>{
    const fetchUser = async () =>{
      try{
        const data: User = await customFetch('/user/info',{
          method : "GET"
        })
        setUser(data)
      }catch(error){
        alert("유저정보를 가져올수 없어요")
        console.error("유저정보를 가져올수 없어요",error)
      }
    }
    fetchUser()
  },[])
  return {user, setUser}
}

export default fetchUserInfo