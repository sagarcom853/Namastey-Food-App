import React, { useEffect, useState } from 'react'

const ProgressBar = ({ value = 20, width='w-128', textColor = 'black' }) => {

    // let [value, setValue] = useState(0)
    // useEffect(() => {
    //     setTimeout(() => {
    //         setValue((val) => val + 1)
    //     }, 100)
    // }, [value])

    // useEffect(() => {
    //     let val = Math.min(100, Math.max(0, value))
    //     setValue(val)
    // }, [value])

    // console.log("value",`${Math.floor(value)}%`)
    return (
        <div className='flex flex-wrap items-center flex-col my-4'>
            <div className='text-lg text-white font-bold mb-2'>Progress Bar</div>
            <div className={`flex flex-wrap flex-row h-8 rounded-3xl border-solid border-2 border-black relative overflow-hidden ${width}`} >
                <span className='bg-green-200 h-full' style={{ width: `${value}%` }}>
                    <span style={{ marginLeft: `${value-10}%` }} className={`text-${textColor} overflow-hidden` }>{value.toFixed()}%</span>
                    {/* <span className="absolute inset-0 flex items-center justify-center text-white">
                        {value.toFixed()}%
                    </span> */}
                </span>
            </div>
            {/* <div className='flex flex-wrap flex-start'>
                <span className=' w-128 h-8 rounded-lg border-solid border-2 border-black'></span>
                <div>{value}%</div>

            </div> */}
        </div>
    )
}

export default ProgressBar
