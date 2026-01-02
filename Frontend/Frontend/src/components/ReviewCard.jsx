import React from 'react'
import { FaStar, FaRegStar } from "react-icons/fa"

function ReviewCard({ comment, rating, photoUrl, name, description, courseTitle }) {

  if (!courseTitle || !comment || !name) return null   

  const safeRating = Number(rating) || 0
  const safeImage = photoUrl || "/user.png"  

  return (
    <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full'>
      
      {/* Rating */}
      <div className='flex items-center mb-3 text-yellow-400 text-sm'>
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            {index < safeRating ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>

      {/* Content */}
      <p className='text-gray-700 text-sm font-semibold'>
        Review for: {courseTitle}
      </p>

      <p className='text-gray-700 text-sm mb-5 mt-2'>
        {comment}
      </p>

      {/* User */}
      <div className='flex items-center gap-2'>
        <img
          src={safeImage}
          alt={name}
          className='w-10 h-10 rounded-full object-cover'
          onError={e => e.target.src = "/user.png"}
        />
        <div>
          <h2 className='font-semibold text-gray-800 text-sm'>
            {name}
          </h2>
          <p className='text-xs text-gray-500'>
            {description || "Student"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
