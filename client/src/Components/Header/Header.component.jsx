/**
 * Header Component which reacts to the User's Authentication status.
 * Independent and a Top Level Component and depends only on the user's authentication status
 *
 * TODO FOR FUTURE ==> Implement the Upgrade button and set it's onclick handler
 */

import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { logoutUserStart } from "../../Redux/User/user.action";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
}));
function Header(props) {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{ backgroundColor: "darkcyan", fontSize: "20px" }}
      >
        <Toolbar style={{ minHeight: "unset" }}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
            <span style={{ margin: "0px 10px" }}>GoTo</span>
          </IconButton>
          <div className={classes.grow} />

          {/* {props.user ? (
          
            <div>
              <IconButton
                edge="start"
                className={props.user.membership}
                color="inherit"
                aria-label="open drawer"
              >
                {props.user.membership === "free" ? (
                  <span>Upgrade</span>
                ) : (
                  <span>{props.user.membership.toUpper()}</span>
                )}
              </IconButton>
            </div>
          ) : null} */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => {
              props.dispatch(logoutUserStart());
            }}
            aria-label="open drawer"
          >
            {props.user ? (
              <span>
                SignOut <AccountCircle />
              </span>
            ) : (
              <span>SignIn</span>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.User.user
  };
};

export default connect(mapStateToProps)(Header);
