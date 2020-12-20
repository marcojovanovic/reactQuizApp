import React from 'react'
//import ReactDOM from "react-dom";

import { QuizzContext } from './context';



function Modal() {

  const { showModal, openModal, closeModal, questions, index, correct } = React.useContext(
    QuizzContext
  );

  return  (
    <div className='modal-container isOpen'>
      <div className='modal-content'>
        <h2>End</h2>
        <p>Tacno si odgovorio na {(correct / questions.length) * 100}% pitanja </p>
        <button onClick={closeModal} className='close-btn'>Jovo Nanovo</button>
      </div>
    
   
    </div>
    
  )
}

export default Modal
