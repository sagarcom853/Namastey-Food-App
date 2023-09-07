import React from "react";
import Scanner from "./Scanner1";

const BarCode = () => {
  return (
    <div className='mx-4 m-4 bg-gray-100 shadow-2xl'>
      <div className='mb-4'>
        <h3 className='font-md align-center text-center text-4xl text-orange-800'>
          Scan Now!* Improve your frontend Skills by building projects
        </h3>
        <p className='text-center text-md font-md text-gray-800'>
          Scan the QR code to visit Frontend Mentor and take your coding skills
          to the next level
        </p>
      </div>
      <div className='flex flex-wrap gap-5 justify-center'>
        <div className='lg:w-2/6 h-2/3 sm:w-full md:w-full rounded-lg'>
          <img src='image-qr-code.png' alt='scanner' />
        </div>
        <div className='lg:w-2/6 h-2/3 sm:w-full md:w-full rounded-lg'>
          <img src='scanner logo.jpg' alt='scanner-logo' />
        </div>
        <div>
        <Scanner/>
      </div>
      </div>
   
    </div>
  );
};

export default BarCode;
