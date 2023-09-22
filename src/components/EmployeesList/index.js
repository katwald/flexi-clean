import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteEmployee,
  initializeEmployees,
} from "../../reducers/employeesReducer";
import {
  setNotification,
  setNotificationType,
} from "../../reducers/notificationReducer";

import CreateEmployeeForm from "../Forms/SignUpForm";
import Button from "../Button";
import Modal from "../Modal";
import Notification from "../Notification";

import "./index.scss";

const EmployeesList = () => {
  const dispatch = useDispatch();
  const employeesList = useSelector((state) => state.employees);
  const notification = useSelector((state) => state.notification);

  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    dispatch(initializeEmployees());
  }, []);

  const handleDeleteEmployee = (id, name) => {
    if (
      window.confirm(`Are you sure you want delete  ${name}  employee List ? `)
    ) {
      dispatch(deleteEmployee(id));
      dispatch(setNotification(`${name}  has been successfully deleted. `));
      dispatch(setNotificationType("success"));
    }
  };
  const renderEmployees = () =>
    employeesList &&
    employeesList.map((employee) => (
      <tr key={Number(employee.id)}>
        <td data-label=" Name">
          {`${employee.firstName} ${employee.lastName} `}
        </td>
        <td data-label="Contact">{employee.contact}</td>
        <td data-label="email">{employee.email}</td>
        <td data-label="Action ">
          <span className="employee-list__body__button">
            <Button
              danger
              small
              onClick={() =>
                handleDeleteEmployee(employee.id, employee.firstName)
              }
            >
              remove
            </Button>
          </span>
        </td>
      </tr>
    ));
  const { message, messageType } = notification;
  return (
    <div className="employee-list">
      {message && messageType && (
        <Notification message={message} messageType={messageType} />
      )}
      <div className="employee-list__header">
        <div></div>
        <h1 className="employee-list__title">Employees List </h1>
        <Button primary large onClick={() => setModalOpen(!modalOpen)}>
          Add
        </Button>
        {modalOpen && (
          <Modal setShowModal={setModalOpen} title={"Add Employee"}>
            <CreateEmployeeForm />
          </Modal>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Contact</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{renderEmployees()}</tbody>
      </table>
    </div>
  );
};

export default EmployeesList;
