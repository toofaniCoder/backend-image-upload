import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import { createStudent, uploadProfile } from "../../actions/studentAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student = { name, email, phone };
    const originalPromiseResult = await dispatch(
      createStudent(student)
    ).unwrap();

    const formData = new FormData();
    formData.append("profile", profile);

    await dispatch(
      uploadProfile({ id: originalPromiseResult.data._id, profile: formData })
    );
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <TextField
            id="outlined-basic"
            label="Full Name"
            placeholder="Enter Your Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="E-mail"
            placeholder="Enter Your E-mail Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Phone"
            placeholder="Enter Your Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => setProfile(e.target.files[0])}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
        </CardContent>
        <CardActions>
          <Button type="submit" size="small">
            Create Student
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default AddStudent;
