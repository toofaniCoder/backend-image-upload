import { createReducer } from "@reduxjs/toolkit";
import {
  getStudent,
  clearStudent,
  createStudent,
  updateStudent,
  removeStudent,
  getStudents,
} from "../actions/studentAction";

const initialState = {
  students: [],
};

const studentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getStudents.fulfilled, (state, action) => {
      state.students = action.payload.data;
    })
    .addCase(createStudent.fulfilled, (state, action) => {
      state.students = [action.payload, ...state.students];
    })
    .addCase(getStudent.fulfilled, (state, action) => {
      state.student = action.payload.data;
    })

    .addCase(updateStudent.fulfilled, (state, action) => {
      state.students = state.students.map((student) =>
        student._id == action.payload.data.id ? action.payload.data : student
      );
    })
    .addCase(removeStudent.fulfilled, (state, action) => {
      state.students = state.students.filter(
        (student) => student._id != action.payload
      );
    });
});

// const studentReducer = createReducer(initialState, {
//   [createStudent.type]: (state, action) => {
//     state.students = [action.payload, ...state.students];
//   },
//   [findStudent.type]: (state, action) => {
//     state.student = state.students.find(
//       (student) => student.id == action.payload
//     );
//   },
//   [clearStudent.type]: (state, action) => {
//     state.student = {
//       firstName: "",
//       lastName: "",
//       email: "",
//       address: "",
//       phone: "",
//     };
//   },
//   [updateStudent.type]: (state, action) => {
//     state.students = state.students.map((student) =>
//       student.id == action.payload.id ? action.payload : student
//     );
//   },
//   [removeStudent.type]: (state, action) => {
//     state.students = state.students.filter(
//       (student) => student.id != action.payload
//     );
//   },
// });

export default studentReducer;
