import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import MadeWithLove from 'components/shared/MadeWithLove';

import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

import postApiRegister from "libs/postApiRegister";

import {
  K_ROUTE_LOGIN,
  K_ROUTE_BY_NAME,
  K_CODE_REGISTER_SUCCESS
} from "utils/constants";

class RegisterForm extends React.Component {
  state = {
    username: null,
    password: null,
    helperText: ""
  };

  handleSubmit() {
    const { username, password } = this.state;

    this.setState({helperText: "Registering..."});
    postApiRegister(username, password).then(response => {
      const isRegisterSuccess = response.code === K_CODE_REGISTER_SUCCESS;
      this.setState({
        helperText: isRegisterSuccess
          ? "Registration successful! Login to continue"
          : response.status
      });
    });
  }

  renderTitle() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          ITB NIM Finder
        </Typography>
        <Typography component="h2" variant="h4">
          Register
        </Typography>
      </React.Fragment>
    );
  }

  renderForm() {
    const { helperText } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={event => {
            this.setState({ username: event.target.value });
          }}
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.handleSubmit();
              event.preventDefault();
            }
          }}
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
          onChange={event => {
            this.setState({ password: event.target.value });
          }}
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.handleSubmit();
              event.preventDefault();
            }
          }}
          helperText={helperText}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={() => this.handleSubmit()}
        >
          Register
        </Button>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Link href={K_ROUTE_LOGIN} variant="body2">
              {"Already have an account? Login"}
            </Link>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  render() {
    const { classes, getToken } = this.props;

    return getToken() ? (
      <Redirect to={K_ROUTE_BY_NAME} />
    ) : (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {this.renderTitle()}
          {this.renderForm()}
        </div>
        <MadeWithLove />
      </Container>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  setToken: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired
};

export default withStyles(styles)(RegisterForm);
