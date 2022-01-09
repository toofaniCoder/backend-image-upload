import React from "react";
import { Paper, Grid, Typography, Button, Box, Stack } from "@mui/material";
import { CreateOutlined, DeleteOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { removeStudent } from "../../actions/studentAction";
import { useDispatch, useSelector } from "react-redux";

const UserName = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  fontWeight: 700,
  letterSpacing: 2.5,
  textAlign: "center",
  margin: 0,
  color: theme.palette.primary.main,
}));

const UserEmail = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  textAlign: "center",
  marginTop: "-2px",
  fontSize: "0.9rem",
}));

const buttonGroupStyle = {
  display: "flex",
  alignItems: "flex-start",
  "& > button": {
    borderRadius: 0,
    textTransform: "capitalize",
    flex: 1,
    "&:nth-child(1)": {
      borderTopLeftRadius: 15,
    },
    "&:nth-child(2)": {
      borderBottomRightRadius: 15,
    },
  },
};

const StudentItem = ({ student }) => {
  const { _id, name, email, profile } = student;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper
        sx={{
          p: 1,
          borderTopLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <Stack spacing={1.5}>
          <img src={profile} alt="user" style={{ borderTopLeftRadius: 15 }} />
          <div>
            <UserName>{name}</UserName>
            <UserEmail>{email}</UserEmail>
          </div>
          <Box sx={buttonGroupStyle}>
            <Button
              startIcon={<DeleteOutline />}
              color="success"
              onClick={() => dispatch(removeStudent(_id))}
            >
              remove
            </Button>
            <Button
              startIcon={<CreateOutlined />}
              color="primary"
              onClick={() => navigate(`/students/${_id}/edit`)}
            >
              edit profile
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default StudentItem;
