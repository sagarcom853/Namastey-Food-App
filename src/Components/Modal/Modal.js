import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";


const Modal = ({ modalTitle = '', modalContent = "", showModal, setShowModal }) => {
    const darkMode = useSelector((store) => store.cart?.dark)
    // console.log('typoofmodal content', typeof (modalContent))

    return (
        <div >
            {showModal && (
                <div>
                    {/* HTML structure for modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        {/* // Modal Overlay // */}
                        <div className="fixed inset-0 bg-black opacity-90 shadow-lg">
                        </div>
                        <div className={`rounded-lg p-8 z-10 ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                            <div className="text-xl font-semibold mb-4 text-center">{modalTitle}</div>

                            {typeof (modalContent) !== 'object' ?
                                <div className={`mb-4 border-2 p-2 ${darkMode ? 'border-gray-100' : 'border-black outline-none'}`}>{modalContent}</div>
                                :
                                <div className={`mb-4 border-2 p-2 ${darkMode ? 'border-gray-100 color-white' : 'border-black outline-none'}`}>
                                    <div className='flex flex-col mt-2 flex-wrap justify-center items-center w-96 mx-auto'>
                                        <div className='mb-1 mx-auto  '>
                                            <Link to={`/restaurant/${modalContent.info.id}`}>
                                                <img
                                                    alt='Food'
                                                    // loading='lazy'
                                                    rel="preconnect"
                                                    className=' h-full w-full pt-4 hover:border-black object-contain '
                                                    src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${modalContent.info.cloudinaryImageId}`}
                                                />
                                            </Link>
                                        </div>
                                        <div className='text-sm text-gray-600'>
                                            {modalContent.info.cuisines?.join(", ")}
                                        </div>
                                        <div className='mt-4 text-gray-600'>
                                            <ul className='flex flex-row flex-wrap gap-2 justify-start items-center '>
                                                <li className='text-sm text-gray-600'>
                                                    {modalContent.info.sla.deliveryTime} MINS
                                                </li>
                                                <li className='text-sm text-gray-600'>
                                                    {modalContent.info.costForTwo}
                                                </li>
                                                <li className={` ${Number(modalContent.info?.avgRating) > 4 ? "text-green-900" : "text-pink-900"}`}>

                                                </li>
                                                {modalContent.info.isOpen ? <li className='text-sm bg-green-100 p-1 rounded-md hover:bg-green-200 text-gray-600'>
                                                    OPEN
                                                </li> : <li className='text-sm bg-gray-300 p-1 rounded-md hover:bg-gray-600 hover:text-white text-gray-600'>
                                                    CLOSED
                                                </li>}

                                            </ul>
                                        </div>




                                    </div>
                                </div>

                            }
                            <div className="flex justify-center">
                                <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400" onClick={() => setShowModal(false)} >Close</button>
                                {/* <button className="px-4 py-2 bg-blue-500 text-white rounded ml-4 hover:bg-blue-600">Save</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}

export default Modal