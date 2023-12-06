import React from 'react'
import { useSelector } from 'react-redux'

const Modal = ({ modalTitle = '', modalContent = "", showModal, setShowModal }) => {
    const darkMode = useSelector((store) => store.cart?.dark)

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
                            <div className={`mb-4 border-2 p-2 ${darkMode ? 'border-gray-100' : 'border-black outline-none'}`}>{modalContent}</div>
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