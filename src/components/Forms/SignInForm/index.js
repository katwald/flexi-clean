import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../../reducers/authReducer";
import {
  setNotification,
  setNotificationType,
} from "../../../reducers/notificationReducer";

import useField from "../../../hooks/useField";

import Button from "../../Button";
import Input from "../../Input";

import "./index.scss";

const CreateEmployeeForm = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const email = useField("email");
  const password = useField("password");
  const handleCreateUser = (e) => {
    e.preventDefault();
    const credentials = {
      email: email.value,
      password: password.value,
    };
    dispatch(login(credentials));
    dispatch(setNotification("login successfull."));
    dispatch(setNotificationType("success"));
    Navigate("/bookings");

    email.reset();
    password.reset();
  };

  return (
    <div className="login-form">
      <h1 className="login-form__header">Sign In</h1>
      <form onSubmit={handleCreateUser}>
        <div className="login-form__input">
          <Input type="mail" label="Email" {...email} />
        </div>
        <div className="login-form__input">
          <Input type="text" label="Password" {...password} />
        </div>
        <div className="login-form__button">
          <Button primary type="submit">
            create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
