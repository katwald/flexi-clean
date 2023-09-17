import React from "react";

import "./Modal.scss";

const Modal = ({ title, children, setShowModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div></div>
          <h4 className="modal-title">{title}</h4>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
