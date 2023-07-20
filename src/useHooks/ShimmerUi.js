import React from "react";

const ShimmerUi = () => {
  let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className='flex flex-wrap mx-4 lg:justify-start gap-5 mb-4 sm:justify-center md:justify-start'>
      {cards.map((card) => {
        return (
          <div
            key={card}
            className='border-none hover:border-black w-72 h-80 p-4 mt-4 hover:shadow-2xl bg-gray-100 '
          >
            <div className='h-40 w-60 pt-2 bg-gray-200 mx-auto mt-2 hover:border-black'></div>
          </div>
        );
      })}
    </div>
  );
};

export default ShimmerUi;
