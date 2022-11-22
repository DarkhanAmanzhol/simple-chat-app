import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import "./login-register.css";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";

import { REGISTER_USER } from "../../graphql/mutations";

function Register({ setLoggedIn }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = auth;

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    onCompleted(data) {
      localStorage.setItem("jwt", data.registerUser.token);
      setLoggedIn(true);
      navigate("/");
    },
  });

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <Box textAlign='center'>
          <CircularProgress />
          <Typography variant='h5'>Authenticating...</Typography>
        </Box>
      </Box>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(auth);
    registerUser({
      variables: {
        user: auth,
      },
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAuth({ ...auth, [name]: value });
  };

  return (
    <div className='sign-in-up-container'>
      <Box component='form' onSubmit={handleSubmit} sx={{ width: "500px" }}>
        <Stack direction='column' spacing={3}>
          {data && (
            <Alert severity='success'>User successfully registered</Alert>
          )}
          {error && <Alert severity='error'>{error.message}</Alert>}

          <Typography variant='h5'>Register</Typography>
          <TextField
            name='firstName'
            type='name'
            value={firstName}
            label='Name'
            variant='standard'
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            name='lastName'
            type='surname'
            value={lastName}
            label='Surname'
            variant='standard'
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            name='email'
            type='email'
            value={email}
            label='email'
            variant='standard'
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            name='password'
            type='password'
            value={password}
            label='password'
            variant='standard'
            onChange={handleChange}
            required
          ></TextField>
          <Button variant='contained' type='submit'>
            Register
          </Button>
          <Link className='link-to-sign' to='/login'>
            Already have an account
          </Link>
        </Stack>
      </Box>
    </div>
  );
}

export default Register;
