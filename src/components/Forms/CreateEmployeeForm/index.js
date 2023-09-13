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
            <label>FirstName:</label>
          </div>
          <input {...email} />
        </div>
        <br />

        <div>
          <div>
            <label>FirstName:</label>
          </div>
          <input {...contactNumber} />
        </div>
        <br />

        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
