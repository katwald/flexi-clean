import React from "react";
import { useDispatch } from "react-redux";

import { createEmployees } from "../../../reducers/employeesReducer";
import useField from "../../../hooks/useField";

import Button from "../../Button";

import "./index.scss";

const CreateEmployeeForm = () => {
  const dispatch = useDispatch();

  const firstName = useField("name");
  const lastName = useField("lastName");
  const contactNumber = useField("contact");
  const email = useField("email");
  const handleCreateUser = (e) => {
    e.preventDefault();
    const obj = {
      firstName: firstName.value,
      lastName: lastName.value,
      contact: contactNumber.value,
      email: email.value,
    };
    dispatch(createEmployees(obj));
    firstName.reset();
    lastName.reset();
    contactNumber.reset();
  };

  return (
    <div className="employee-form">
      <form onSubmit={handleCreateUser}>
        <h4>Create new worker</h4>
        <div>
          <div>
            <label>FirstName:</label>
          </div>
          <input {...firstName} />
        </div>
        <br />
        <div>
          <div>
            <label>Last Name:</label>
          </div>
          <input {...lastName} />
        </div>
        <br />

        <div>
          <div>
            <label>email:</label>
          </div>
          <input {...email} />
        </div>
        <br />

        <div>
          <div>
            <label>contact:</label>
          </div>
          <input {...contactNumber} />
        </div>
        <br />

        <Button primary type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
