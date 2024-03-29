import React from 'react'
export default function Card(props) {
    return (
        <div className="-mt-40 font-semibold">
            <img src={props.src} alt="" className='h-50 w-50'/>
            <h2 className='mt-2'>{props.h2}</h2>
            <p>{props.para1}<br/>{props.para2}</p>
        </div>
    )
}
