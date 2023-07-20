import React from 'react'

const TotalRestaurants = ({RestaurantData}) => {
    let length = RestaurantData.length
  return (
    <>
<div className='text-3xl p-0 ml-10  text-gray-700 font-bold'>{ length} restaurants</div>
<div className='text-gray-700 p-0 ml-10 -mt-2 w-full'>----------------------------------</div>
    </>
  )
}

export default TotalRestaurants