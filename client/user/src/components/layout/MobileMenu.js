import React, { useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { AuthContext } from "../../context/auth/AuthContext";

const MobileMenu = ({
  mobMenuAnchor,
  setMobMenuAnchor,
  darkTheme,
  setDarkTheme,
  setAuthDialogOpen,
}) => {
  const { isAuth, logoutUser } = useContext(AuthContext);

  const handleClose = () => {
    setMobMenuAnchor(null);
  };

  const handleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleLogout = () => {
    logoutUser();
    setMobMenuAnchor(null);
  };

  const handleLogin = () => {
    setAuthDialogOpen(true);
    setMobMenuAnchor(null);
  };

  return (
    <Menu
      id='simple-menu'
      anchorEl={mobMenuAnchor}
      keepMounted
      open={Boolean(mobMenuAnchor)}
      onClose={handleClose}
    >
      {isAuth ? (
        <div>
          <MenuItem onClick={handleTheme}>
            {darkTheme ? "Light Theme" : "DarkTheme"}
          </MenuItem>
          <MenuItem onClick={handleClose}>Cart</MenuItem>
          <MenuItem onClick={handleClose}>Account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleTheme}>
            {darkTheme ? "Light Theme" : "DarkTheme"}
          </MenuItem>
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        </div>
      )}
    </Menu>
  );
};

export default MobileMenu;
