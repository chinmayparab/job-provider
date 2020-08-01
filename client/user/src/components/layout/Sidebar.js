import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ComponentIcon from "@material-ui/icons/Extension";
import TemplatesIcon from "@material-ui/icons/Web";
import HomeIcon from "@material-ui/icons/Home";
import ProductIcon from "@material-ui/icons/ImportantDevices";

import { AuthContext } from "../../context/auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: 250,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 250,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  iconColor: {
    color: theme.palette.iconsAlt,
  },
}));

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const classes = useStyles();
  const { isAuth } = useContext(AuthContext);

  const handleClickAway = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant='temporary'
        anchor='left'
        open={sidebarOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{ onBackdropClick: handleClickAway }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setSidebarOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => setSidebarOpen(false)}
            component={Link}
            to='/'
          >
            <ListItemIcon className={classes.iconColor}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem
            button
            onClick={() => setSidebarOpen(false)}
            component={Link}
            to='/courses'
          >
            <ListItemIcon className={classes.iconColor}>
              <TemplatesIcon />
            </ListItemIcon>
            <ListItemText primary='Courses' />
          </ListItem>
          {isAuth && (
            <>
              <ListItem
                button
                onClick={() => setSidebarOpen(false)}
                component={Link}
                to='/resume'
              >
                <ListItemIcon className={classes.iconColor}>
                  <ProductIcon />
                </ListItemIcon>
                <ListItemText primary='Create Resume' />
              </ListItem>
              <ListItem
                button
                onClick={() => setSidebarOpen(false)}
                component={Link}
                to='/applied-jobs'
              >
                <ListItemIcon className={classes.iconColor}>
                  <ComponentIcon />
                </ListItemIcon>
                <ListItemText primary='Applied Jobs' />
              </ListItem>
              <ListItem
                button
                onClick={() => setSidebarOpen(false)}
                component={Link}
                to='/applied-courses'
              >
                <ListItemIcon className={classes.iconColor}>
                  <ComponentIcon />
                </ListItemIcon>
                <ListItemText primary='Applied Courses' />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
