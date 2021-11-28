import {
  AppBar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import { Add, Apps } from "@material-ui/icons";
import React from "react";
import { useStyles } from "./style";
import { CreateClass, JoinClass } from "..";
import { useLocalContext } from "../../Context/context";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

function Appbar({ children }) {
  const classes = useStyles();
  const {
    setCreateClassDialog,
    setJoinClassDialog,
    loggedInUser,
    logout,
    userType,
  } = useLocalContext();

  const [anchorE1, setAnchorE1] = React.useState(null);
  const handleClick = (e) => {
    // console.log("here");
    setAnchorE1(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  const handleCreate = () => {
    handleClose();
    setCreateClassDialog(true);
  };

  const handleJoin = () => {
    handleClose();
    setJoinClassDialog(true);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
            {children}
            <span>Submission Tool</span>
          </div>

          <div className={classes.header__wrapper__right}>
            <Add className={classes.icon} onClick={handleClick} />
            <Apps className={classes.icon} />
            <Menu
              id="simple-menu"
              anchorEl={anchorE1}
              keepMounted
              open={Boolean(anchorE1)}
              onClose={handleClose}
            >
              {userType === "Student" ? (
                <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              ) : (
                <MenuItem onClick={handleCreate}>Create Class</MenuItem>
              )}
            </Menu>

            <div>
              <Avatar src={loggedInUser?.photoURL} className={classes.icon} />
            </div>

            <Link to="/">
              <Button className={classes.btn} onClick={logout}>
                Logout
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass />
      <JoinClass />
    </div>
  );
}

export default Appbar;
