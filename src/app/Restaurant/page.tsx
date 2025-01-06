'use client'; 

import { useRouter } from 'next/navigation'; 
const Restaurant = () => {
  const router = useRouter();

  const moveButton = () => {
    router.push('/AppendRestaurant'); 
  };

  return (
    <button onClick={moveButton}>
      추가
    </button>
  );
}

export default Restaurant;
