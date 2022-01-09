import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import {
  getStudent,
  updateStudent,
  uploadProfile,
} from "../../actions/studentAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const EditStudent = () => {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getStudent(id))
      .unwrap()
      .then(({ data }) => {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setProfile(data.profile);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateStudent({ id, name, email, phone }));
    navigate("/");
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("profile", file);
    const profileResult = await dispatch(
      uploadProfile({ id, profile: formData })
    ).unwrap();
    setProfile(profileResult.data.file);
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
          <Paper
            sx={{
              width: 240,
              height: 135,
              background: `url(${profile})`,
              backgroundSize: "cover",
              mb: 1,
            }}
          ></Paper>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => handleUpload(e.target.files[0])}
            />
            <Button variant="contained" component="span">
              Update Picture
            </Button>
          </label>
        </CardContent>
        <CardActions>
          <Button type="submit" size="small">
            Update Student
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default EditStudent;
