'use client'

import { useEffect, useState } from "react";

interface Reservation {
    id: string;
    restaurantId: number;
    date: string;
    userId: number;
    userName: string;
}

const ReservationItem = ({ item }: { item: Reservation }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="bg-white py-4 w-3/4 mx-auto mb-4 overflow-hidden rounded-xl">
            <div className="flex flex-col items-center">
                <div className={`transition-all duration-300 ${isExpanded ? 'max-h-screen' : 'max-h-0 overflow-hidden'} w-full`}>
                    {isExpanded && (
                        <div className="mb-0">
                            <div className="font-bold ml-3 mt-1">{item.userName}</div>
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center w-full">
                    <div className="ml-3 mt-1">
                        <div>{item.date}</div>
                    </div>
                    <button
                        className="px-4 py-2 rounded"
                        onClick={toggleExpand}
                    >
                        {isExpanded ? '⌄' : '⌃'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Test() {
    const [reservationData, setReservationData] = useState<Reservation[]>([]);

    async function fetchData() {
        const response = await fetch('http://localhost:3002/reservations');
        const reservationList = await response.json();
        setReservationData(reservationList);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (

            <div className="w-full space-y-7">
                <h4 className="text-6xl font-bold ml-48 mb-16">가게 이름</h4>
                {reservationData.map((item: Reservation) => (
                    <ReservationItem key={item.id} item={item} />
                ))}
            </div>

    );
}

export default Test;
