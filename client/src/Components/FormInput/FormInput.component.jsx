/**
 *
 * Material UI Input component modified for Project's Use Case but accepts same parameters
 * As Material UI Input component
 */
import React from "react";
import clsx from "clsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    width: 300
  }
}));

const FormInput = props => {
  const classes = useStyles();

  return (
    <FormControl className={clsx(classes.margin, classes.textField)}>
      <InputLabel htmlFor={props.id}>{props.name}</InputLabel>
      <Input {...props} />
    </FormControl>
  );
};

export default FormInput;
