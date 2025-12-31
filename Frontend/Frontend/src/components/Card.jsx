import React from 'react'
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Card({thumbnail, title, category, price, id, reviews}) {
  
   const avgRating = React.useMemo(() => {
      if(!reviews || reviews.length === 0){
        return "0.0"
      }
      const total = reviews.reduce((sum, review) => sum + review.rating, 0)
      const avg = (total / reviews.length).toFixed(1)
      return avg
    }, [reviews])

  const navigate = useNavigate()

  return (
    <div className='max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-gray-300 cursor-pointer' onClick={()=>navigate(`/viewcourse/${id}`)}>
        
        <img src={thumbnail} alt=""  className='w-full h-48 object-cover'/>

    <div className='p-5 space-y-2'>
        <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
        <span className='px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 capitalize text-xs'>{category}</span>
        <div className='flex justify-between text-sm text-gray-600 mt-3 px-[10px]'>
            <span className='font-semibold text-gray-800'>₹{price}</span>
            <span className='flex items-center gap-1 '>
              <FaStar className='text-yellow-500'/>
              {avgRating}
              <span className='text-gray-400 text-xs ml-1'>({reviews?.length || 0})</span>
            </span>
        </div>
    </div>
    </div>
  )
}

export default Card