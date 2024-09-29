import React from "react";

import "./index.scss";

function Input({ label, error, ...rest }) {
  return (
    <div className="input">
      <div className="input__label">{label}</div>
      <input className="input__field" {...rest} />
      {error && <p className="input__error">Input field cannot be empty</p>}
    </div>
  );
}

export default Input;
