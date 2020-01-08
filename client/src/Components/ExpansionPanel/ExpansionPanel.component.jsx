import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: "24px",
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function Panel(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel style={{ backgroundColor: "lightslategrey" }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="Expansion-header"
        >
          <Typography className={classes.heading}>{props.heading}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{props.children}</ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
