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
import { LOGIN_USER } from "../../graphql/mutations";

function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({ email: "", password: "" });
  const { email, password } = auth;

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("jwt", data.loginUser.token);
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
    loginUser({
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
            <Alert severity='success'>
              {data.loginUser.token} successfully registered
            </Alert>
          )}
          {error && <Alert severity='error'>{error.message}</Alert>}
          <Typography variant='h5'>Log in</Typography>
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
            Log in
          </Button>
          <Link className='link-to-sign' to='/register'>
            Do not have an account
          </Link>
        </Stack>
      </Box>
    </div>
  );
}

export default Login;
