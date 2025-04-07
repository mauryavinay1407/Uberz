import { MapPin } from 'lucide-react';
import React from 'react'

const LocationSearchPannel = () => {

    const locations = [
        "12A, Near Gupta's bakery, MG Road, Indore",
        "18B, Opposite Nair's Bookstore, Civil Lines, Kanpur",
        "25C, Beside Batra's Clinic, Rajiv Nagar, Lucknow",
        "30D, Near Sharma's Tea Stall, Kormangala, Bangalore",
        "7E, Opp. Malhotra Electronics, Sector 22, Chandigarh",
        "42F, Near Khan's Garage, FC Road, Pune",
        "15G, Next to Roy's Florist, Salt Lake, Kolkata",
        "9H, Opp. Desai Dairy, Satellite Road, Ahmedabad"
    ];

  return (
    <div>
    {
        locations.map((elem, idx) => (
            <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                <h2 className='bg-[#eee] h-8 flex items-center justify-center w-8 p-2 rounded-full'><MapPin /></h2>
                <h4 className='font-medium'>{elem}</h4>
            </div>
        ))
    }
</div>
  )
}

export default LocationSearchPannel