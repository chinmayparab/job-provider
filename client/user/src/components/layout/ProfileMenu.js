import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { AuthContext } from "../../context/auth/AuthContext";

const ProfileMenu = ({ profileMenuAnchor, setProfileMenuAnchor }) => {
  return (
    <Menu
      keepMounted
      anchorEl={profileMenuAnchor}
      open={Boolean(profileMenuAnchor)}
      onClose={() => setProfileMenuAnchor(null)}
    >
      <div>
        <MenuItem>HELLO</MenuItem>
        <MenuItem component={Link} to='/resume'>
          Resume
        </MenuItem>
        <MenuItem component={Link} to='/applied-jobs'>
          Applied Jobs
        </MenuItem>
        <MenuItem component={Link} to='/applied-courses'>
          Applied Courses
        </MenuItem>
        {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
      </div>
    </Menu>
  );
};

export default ProfileMenu;
