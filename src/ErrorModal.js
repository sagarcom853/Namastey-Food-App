import React from 'react'
import Modal from "react-modal"
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

const ErrorModal = ({display}) => {
  return (
    <Modal
    isOpen={display}
    style={customStyles}
    contentLabel="Network lost"
  >
    <div>You appear to be Offline! Please check your internet Connection </div>
  </Modal>
  )
}

export default ErrorModal