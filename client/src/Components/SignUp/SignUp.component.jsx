import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormInput from "../FormInput/FormInput.component";
import { Button } from "@material-ui/core";
import { signupUserStart } from "../../Redux/User/user.action";
import { connect } from "react-redux";
import { selectSignupError } from "../../Redux/User/user.selector";
import { createStructuredSelector } from "reselect";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    border: "2px solid darkgrey"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 300
  },
  error: {
    border: "2px solid crimson",
    background: "white",
    color: "darkred",
    fontSize: "larger",
    borderRadius: "5px"
  }
}));

function SignUp(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    showPassword: false
  });

  const handleChange = property => event => {
    setValues({ ...values, [property]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onSubmit = event => {
    event.preventDefault();
    props.dispatch(
      signupUserStart({
        name: values.name,
        email: values.email,
        password: values.password
      })
    );
  };

  return (
    <div className={classes.root}>
      <div style={{ alignSelf: "center", margin: "auto" }}>SignUp Form</div>

      <div>
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <FormInput
            id="signup-name"
            name="Name"
            type="text"
            value={values.name}
            onChange={handleChange("name")}
          />
          <FormInput
            id="signup-email"
            name="Email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
          />
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {props.signUpError ? (
            <span className={classes.error}>{props.signUpError}</span>
          ) : null}
          <Button type="submit" style={{ backgroundColor: "darkcyan" }}>
            SignUp
          </Button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  signUpError: selectSignupError
});

export default connect(mapStateToProps)(SignUp);
