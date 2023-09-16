import React from "react";
import classNames from "classnames";

import "./index.scss";

const Button = ({
  primary,
  secondary,
  warning,
  outline,
  danger,
  disabled,
  rounded,
  small,
  medium,
  large,
  icon,
  children,
  ...rest
}) => {
  const classes = classNames(rest.className, {
    primary: primary,
    secondary: secondary,
    warning: warning,
    danger: danger,
    disable: disabled,
    rounded: rounded,
    outline: outline,
    "btn--small": small,
    "btn--medium": medium,
    "btn--large": large,
    "btn__outline--primary": primary && outline,
    "btn__outline--warning": warning && outline,
    "btn__outline--danger": outline && danger,
  });
  return (
    <button {...rest} className={`btn btn__${classes}`}>
      <span className={`btn__${icon}`}>{icon}</span>
      {children}
    </button>
  );
};

export default Button;
