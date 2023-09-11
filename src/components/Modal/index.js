import React from "react";

import "./Modal.css";

const Modal = ({ children, setShowModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Modal title</h4>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">Modal footer</div>
      </div>
    </div>
  );
};

export default Modal;
