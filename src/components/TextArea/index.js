import React from "react";
import "./index.scss";

const TextArea = ({ label, ...rest }) => {
  return (
    <div className="text-area">
      <div className="text-area__label">
        <label>{label}</label>
      </div>
      <textarea className="text-area__field" {...rest} />
    </div>
  );
};

export default TextArea;
