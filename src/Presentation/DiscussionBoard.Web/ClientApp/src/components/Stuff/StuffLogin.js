import React, { useState } from 'react';
// import { connect } from 'react-redux';

// import history from '../../../history';
// import { requestSignIn } from '../../../store/actions';
// import { Button, Container, Row, Col, FormControl, Dropdown } from 'react-bootstrap'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

//import Logo from '../../../../public/images/ic-logo-dark.png';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black'
  },
  image: {
    backgroundImage:
      'url(https://media.giphy.com/media/kz76j0UjtPoE4WyhQn/giphy.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: 'orange'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function StuffLogin() {

  const classes = useStyles();
  const [inputs, setInputs] = useState({
    login: '',
    password: ''
  })
  const [keepLogged, setKeepLogged] = useState(false)

  const { login, password } = inputs

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    console.log(`${login}`)
  }

  // const loginUser = () => {
  //   const { login, password } = this.inputs;
  //   const { requestSignIn } = this.props;

  //   requestSignIn({ login, password });
  // };

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <div>
            <img src={Logo} style={{ width: 300 }} />
          </div> */}
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              value={login}
              onChange={e => handleChange(e)}
              name='login'
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              value={password}
              onChange={e => handleChange(e)}
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              value='Log In'
              className={classes.submit}
              //onClick={() => this.loginUser}
            >
              Sign In 🙂
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant='body2'
                  //onClick={() => history.push('/registration')}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

// const mapDispatchToProps = dispatch => ({
//   requestSignIn: data => dispatch(requestSignIn(data))
// });

//export default connect(null, mapDispatchToProps)(Login);
export default StuffLogin;