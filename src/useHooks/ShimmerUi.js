import React from "react";
import { useSelector } from "react-redux";

const ShimmerUi = () => {
  let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const darkMode = useSelector((store)=>store.cart?.dark)
  return (
    <div className={`flex flex-wrap mx-4 lg:justify-start gap-5 mb-4 sm:justify-center items-center md:justify-start bg-green-100`}>
      {cards.map((card) => {
        return (
          <div
            key={card}
            className='border-none hover:border-black w-72 h-80 p-4 mt-4 hover:shadow-2xl bg-gray-100 '
          >
            <div className='h-40 w-60 pt-2 bg-gray-200 mx-auto mt-2 hover:border-black'></div>
            <div className="mx-4 flex flex-wrap mt-2 gap-4">
              <div className="h-8 w-8 rounded-full hover:border-black bg-gray-200 hover:shadow-md"></div>
              <div className='h-6 w-32 bg-gray-200 hover:shadow-md'></div>
            </div>
            <div className="flex justify-end flex-wrap ">
              <div className='h-6 w-44 mx-4 bg-gray-200 hover:border-black hover:shadow-md  mt-2'></div>
              <div className='h-6 w-44 mx-4 bg-gray-200 hover:border-black  hover:shadow-md  mt-2'></div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShimmerUi;
