import React from "react";
import { useSelector } from "react-redux";

import CreateEmployeeForm from "../Forms/CreateEmployeeForm";

const EmployeesList = () => {
  const employeesList = useSelector((state) => state.employees);
  const renderEmployees = () =>
    employeesList &&
    employeesList.map((employee) => (
      <li key={Number(employee.id)}>{`${employee.firstName || "empty"} ${
        employee.lastName || "empty"
      }`}</li>
    ));
  return (
    <div>
      <div>
        <CreateEmployeeForm />
      </div>
      <div>
        <h4>Employees List</h4>
        <ul>{renderEmployees()}</ul>
      </div>
    </div>
  );
};

export default EmployeesList;
