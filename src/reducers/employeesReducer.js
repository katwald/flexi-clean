import { createSlice } from "@reduxjs/toolkit";
import employeesService from "../services/employees";

const initialState = {
  firstName: "Jane",
  lastName: "Doe",
  email: "janeDoe@gmail.com",
  contact: "0451044544",
  userType: "superVisor",
};

const employeeSlice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {
    setEmployees(state, action) {
      return action.payload;
    },
    appendEmployee(state, action) {
      state.push(action.payload);
    },
    removeEmployee(state, action) {
      const id = action.payload;
      const updatedUsers = state.filter((employee) => employee.id !== id);
      return updatedUsers;
    },
  },
});

export const { setEmployees, appendEmployee, removeEmployee } =
  employeeSlice.actions;

export const initializeEmployees = () => {
  return async (dispatch) => {
    const employees = await employeesService.getAll();
    console.log("aaaa", employees);
    dispatch(setEmployees(employees));
  };
};

export const createEmployees = (bookingObject) => {
  const { firstName, lastName, email, contact } = bookingObject;
  const obj = {
    firstName,
    lastName,
    email,
    contact,
    userType: "worker",
  };
  return async (dispatch) => {
    const response = await employeesService.createNew(obj);
    dispatch(appendEmployee(response));
  };
};

export const DeleteEmployee = (id) => {
  return async (dispatch) => {
    await employeesService.remove(id);
    dispatch(removeEmployee(id));
  };
};

export default employeeSlice.reducer;
