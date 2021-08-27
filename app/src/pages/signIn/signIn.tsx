import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import Auth from '../../components/auth/auth';
import SnackBar from "../../components/shared/snackbar/snackbar";

import { useHistory } from "react-router-dom";
import ROUTES from "../../constants/routes";
import http from '../../HTTP/http';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));





export default function SignIn() {

  const history = useHistory();
  const classes = useStyles();
  const { register, handleSubmit, errors, watch } = useForm();


  const [input, setInput] = useState({email: '', password: ''});
  const [message, setMessage] = useState({});


  

  const onSubmit = async ()=> {

  //  console.log('Sending request to: ' + process.env.API_URL)
    const requestBody1 = `query {
        login(email: "${input.email}", password:"${input.password}") {
          token
          userId
          tokenExpiration
        } 
      }`
    
      const requestBody = http.user.signInAndReturnFields('token userId tokenExpiration', {email: input.email, password: input.password})
      console.log(requestBody)
      //const variables = {email: input.email, password: input.password}


    Auth.login(requestBody,
      user => { 
        setMessage({msg: 'Login succesfull', type: 'success', key: Math.random()});
        history.push('/home');
    }, // on succes
      error => {
        setMessage({msg: error, type: 'error', key: Math.random()}) 
      }// on failure
      )

  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}
          onSubmit ={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event)=> setInput({...input, email: event.target.value})}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event)=> setInput({...input, password: event.target.value})}

          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={ROUTES.SIGNUP} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>


      { message.msg ? <SnackBar key={message.key} type={message.type} message={message.msg}/> : null}

    </Container>
  );
}