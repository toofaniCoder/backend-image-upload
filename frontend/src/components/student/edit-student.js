import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import { getStudent, updateStudent } from "../../actions/studentAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getStudent(id))
      .unwrap()
      .then(({ data }) => {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
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
