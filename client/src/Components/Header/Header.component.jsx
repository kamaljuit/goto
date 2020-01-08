import React from "react";
import { connect } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { logoutUser } from "../../Redux/User/user.action";
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
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            GoTo
          </Typography>

          <div className={classes.grow} />

          {/* {props.user ? (
            
//Complete this feature later


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
            aria-label="open drawer"
          >
            {props.user ? (
              <span
                onClick={() => {
                  props.dispatch(logoutUser());
                }}
              >
                SignOut <AccountCircle />
              </span>
            ) : (
              <span onClick={() => <Link to="/signup" />}>SignIn</span>
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
