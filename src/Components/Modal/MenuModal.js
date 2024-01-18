import React from 'react'
import Modal from "react-modal"
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const MenuModal = ({ showModal, onChange }) => {
    return (
        <Modal
            isOpen={showModal}
            style={customStyles}
            contentLabel="Add required addons"
        >
            <div>You appear to be Offline! Please check your internet Connection </div>
            <button onClick={onChange}>close</button>

        </Modal>
    )
}

export default MenuModal