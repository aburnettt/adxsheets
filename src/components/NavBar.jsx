import React from "react";
import { Button } from '@material-ui/core';
import ManagePowersPanel from "./ManagePowersPanel";

// Stateless Functional Component

const NavBar = ({ toggleManagePowers , toggleManageArch}) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-brand">
        <Button
          color="primary"
          variant="contained"
          onClick={toggleManagePowers}> Powers </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={toggleManageArch}> Archetype/Level </Button>
      </div>
    </nav>
  );
};

export default NavBar;
