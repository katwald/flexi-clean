import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  DeleteEmployee,
  initializeEmployees,
} from "../../reducers/employeesReducer";

import CreateEmployeeForm from "../Forms/CreateEmployeeForm";
import Button from "../Button";

import "./index.scss";

const EmployeesList = () => {
  const dispatch = useDispatch();
  const employeesList = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(initializeEmployees());
  }, []);

  const renderEmployees = () =>
    employeesList &&
    employeesList.map((employee) => (
      <li key={Number(employee.id)}>
        {`${employee.firstName || "empty"} ${employee.lastName || "empty"}`}{" "}
        <span>{employee.contact}</span>{" "}
        <span>
          <Button
            danger
            small
            outline
            onClick={() => dispatch(DeleteEmployee(employee.id))}
          >
            remove
          </Button>
        </span>
      </li>
    ));
  return (
    <div className="employee-list">
      <div>
        <CreateEmployeeForm />
      </div>
      <div>
        <hr />
        <h4>Employees List</h4>
        <ul>{renderEmployees()}</ul>
      </div>
    </div>
  );
};

export default EmployeesList;
