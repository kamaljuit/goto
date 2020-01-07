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
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 200
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
      <div>
        <form onSubmit={onSubmit}>
          <FormInput
            id="signup-name"
            name="Name"
            type="text"
            value={values.name}
            handleChange={handleChange("name")}
          />
          <FormInput
            id="signup-email"
            name="Email"
            type="email"
            value={values.email}
            handleChange={handleChange("email")}
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
          {props.signUpError ? <span>{props.signUpError}</span> : null}
          <Button onClick={onSubmit}>SignUp</Button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  signUpError: selectSignupError
});

export default connect(mapStateToProps)(SignUp);
