import React, { useState } from 'react';
import {
  CssBaseline,
  Container,
  Typography,
  TextField,
  Button
} from '@material-ui/core';

function SignIn({ failedLogIn, validate }) {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ noUsername, setNoUsername ] = useState(false)
  const [ noPassword, setNoPassword ] = useState(false)

  function getPasswordHelperText() {
    if (noPassword) return 'Please enter a password.';
    if (failedLogIn) return 'Please enter a valid username/password';
    return '';
  }
  
  function doSignIn(e) {
    e.preventDefault();
    setNoUsername(!username)
    setNoPassword(!password)

    if (username && password) {
      validate({ username, password });
    }
  }

  return (
    <Container component="main" maxWidth="xs" className="signin-form">
      <CssBaseline />
      <Typography component="h1" variant="h5">Sign in</Typography>
      <form method="POST">
        <TextField 
          inputProps={{ "data-testid": "username" }}
          className="signin-form__username"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          error={noUsername}
          helperText={noUsername ? 'Please provie a username.' : ''}
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField 
          className="signin-form__password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          type="password"
          label="Password"
          name="password"
          autoComplete="password"
          error={noPassword || failedLogIn}
          helperText={getPasswordHelperText()}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="signin-form__submit"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={(e) => doSignIn(e)}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
}

export default SignIn;
