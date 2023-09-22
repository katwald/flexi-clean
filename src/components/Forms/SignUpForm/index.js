import React from "react";
import { useDispatch } from "react-redux";

import { signup } from "../../../reducers/authReducer";
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

  const firstName = useField("name");
  const lastName = useField("lastName");
  const contactNumber = useField("contact");
  const email = useField("email");
  const userName = useField("username");
  const password = useField("password");
  const handleCreateUser = (e) => {
    e.preventDefault();
    const obj = {
      firstName: firstName.value,
      lastName: lastName.value,
      contact: contactNumber.value,
      userName: userName.value,
      email: email.value,
      password: password.value,
    };
    try {
      dispatch(signup(obj));
      dispatch(setNotification(`${firstName.value} successfully added. `));
      dispatch(setNotificationType("success"));

      firstName.reset();
      lastName.reset();
      email.reset();
      password.reset();
      contactNumber.reset();
    } catch (error) {
      dispatch(setNotification("oops !! some thing wen wrong"));
    }
  };

  return (
    <form onSubmit={handleCreateUser}>
      <div className="employee-form">
        <div className="employee-form__input">
          <Input label="FirstName" {...firstName} />
        </div>
        <div className="employee-form__input">
          <Input label="Last Name" {...lastName} />
        </div>

        <div className="employee-form__input">
          <Input type="email" label="email" {...email} />
        </div>
        <div className="employee-form__input">
          <Input type="text" label="email" {...password} />
        </div>

        <div className="employee-form__input">
          <Input label="contact" {...contactNumber} />
        </div>
        <div className="employee-form__button">
          <Button primary type="submit">
            create
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateEmployeeForm;
