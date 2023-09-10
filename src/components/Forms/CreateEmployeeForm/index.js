import React from "react";
import { useDispatch } from "react-redux";

import useField from "../../../hooks/useField";
import { createEmployees } from "../../../reducers/employeesReducer";

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
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 30,
      }}
    >
      <form onSubmit={handleCreateUser}>
        <h4>Create new worker</h4>
        <div>
          FirstName:
          <input {...firstName} />
        </div>
        <br />
        <div>
          LastName:
          <input {...lastName} />
        </div>
        <br />

        <div>
          Email:
          <input {...email} />
        </div>
        <br />

        <div>
          contact
          <input {...contactNumber} />
        </div>
        <br />

        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
