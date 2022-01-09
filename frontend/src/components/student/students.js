import React, { useEffect } from "react";
import { Container, Grid, Fab } from "@mui/material";

import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import StudentItem from "./student-item";
import { getStudents } from "../../actions/studentAction";
import { useDispatch, useSelector } from "react-redux";

const Students = () => {
  const navigate = useNavigate();
  const students = useSelector((store) => store.student.students);
  console.log(students);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudents());
  }, []);
  return (
    <Container sx={{ py: 2 }}>
      <Fab
        onClick={() => navigate("/students/add")}
        color="secondary"
        sx={{
          position: "fixed",
          right: 30,
          bottom: 20,
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      >
        <Add />
      </Fab>
      <Grid container spacing={2}>
        {students.map((student) => (
          <StudentItem key={student._id} student={student} />
        ))}
      </Grid>
    </Container>
  );
};

export default Students;
