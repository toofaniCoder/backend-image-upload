import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStudent = createAsyncThunk(
  "students/getStudent",
  async (studentId) => {
    const { data } = await axios.get(`/students/${studentId}`);
    return data;
  }
);

export const getStudents = createAsyncThunk(
  "students/getStudents",
  async () => {
    const { data } = await axios.get("/students");
    return data;
  }
);

export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (student) => {
    const { data } = await axios.post("/students", student);
    return data;
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, ...rest }) => {
    const { data } = await axios.put(`/students/${id}`, rest);
    return data;
  }
);

export const removeStudent = createAsyncThunk(
  "students/removeStudent",
  async (studentId) => {
    await axios.delete(`/students/${studentId}`);
    return studentId;
  }
);

export const uploadProfile = createAsyncThunk(
  "students/uploadProfile",
  async ({ id, profile }) => {
    const { data } = await axios.post(`/students/${id}/profile`, profile);
    return data;
  }
);
