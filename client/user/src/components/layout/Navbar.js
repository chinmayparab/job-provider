import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import LanguageIcon from "@material-ui/icons/Language";
import MenuIcon from "@material-ui/icons/Menu";
import UserIcon from "@material-ui/icons/Person";
import LightThemeIcon from "@material-ui/icons/WbSunny";
import DarkThemeIcon from "@material-ui/icons/NightsStay";
import MoreIcon from "@material-ui/icons/MoreVert";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";

import Sidebar from "./Sidebar";
import AuthDialog from "../auth/AuthDialog";
import MobileMenu from "./MobileMenu";
import ProfileMenu from "./ProfileMenu";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.icons,
  },
  title: {
    flexGrow: 1,
    textDecorationLine: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  authDivDesktop: {
    paddingLeft: theme.spacing(4),
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  authDivMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  iconColor: {
    color: theme.palette.icons,
  },
}));

const Navbar = ({ darkTheme, setDarkTheme }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [mobMenuAnchor, setMobMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const { authToken, logout } = useContext(AuthContext);
  const [isHindi, setHindi] = useState(false);

  const handleMobMenu = (e) => {
    setMobMenuAnchor(e.currentTarget);
  };

  const handleLangChange = () => {
    setHindi(!isHindi);
    if (isHindi) {
      i18n.changeLanguage("hi");
    } else {
      i18n.changeLanguage("en");
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position='fixed'>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div className={classes.authDivMobile}>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='secondary'
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Typography
            component={Link}
            to='/'
            color='inherit'
            variant='h6'
            className={classes.title}
          >
            {t("JobSetu")}
          </Typography>

          <div className={classes.authDivDesktop}>
            <Button
              component={Link}
              to='/courses'
              className={classes.iconColor}
            >
              {t("Courses")}
            </Button>
            <Tooltip title='Switch Language'>
              <IconButton
                className={classes.iconColor}
                onClick={handleLangChange}
              >
                <LanguageIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={darkTheme ? "Light Theme" : "Dark Theme"}>
              <IconButton
                className={classes.iconColor}
                onClick={() => setDarkTheme(!darkTheme)}
              >
                {darkTheme ? <LightThemeIcon /> : <DarkThemeIcon />}
              </IconButton>
            </Tooltip>
            {authToken ? (
              <>
                <Tooltip title='Account'>
                  <IconButton
                    onClick={(e) => setProfileMenuAnchor(e.currentTarget)}
                    className={classes.iconColor}
                  >
                    <UserIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Logout'>
                  <IconButton
                    onClick={() => logout()}
                    className={classes.iconColor}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Button
                onClick={() => setAuthDialogOpen(true)}
                className={classes.iconColor}
              >
                {t("Login")}
              </Button>
            )}
          </div>
          <div className={classes.authDivMobile}>
            <IconButton className={classes.iconColor} onClick={handleMobMenu}>
              <MoreIcon />
            </IconButton>
            {Boolean(mobMenuAnchor) ? (
              <MobileMenu
                mobMenuAnchor={mobMenuAnchor}
                setMobMenuAnchor={setMobMenuAnchor}
                darkTheme={darkTheme}
                setDarkTheme={setDarkTheme}
                setAuthDialogOpen={setAuthDialogOpen}
              />
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
      <AuthDialog
        authDialogOpen={authDialogOpen}
        setAuthDialogOpen={setAuthDialogOpen}
      />

      <ProfileMenu
        profileMenuAnchor={profileMenuAnchor}
        setProfileMenuAnchor={setProfileMenuAnchor}
      />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
};

export default Navbar;
