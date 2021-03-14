import React from "react";
import { Button } from '@material-ui/core';

// Stateless Functional Component

const NavBar = ({ toggleManagePowers , toggleManageArch, toggleManageStats}) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-brand" padding="normal">
        <Button
          color="primary"
          variant="contained"
          onClick={toggleManagePowers}>Powers</Button> 
          &nbsp;
          <Button
          color="primary"
          variant="contained"
          onClick={toggleManageArch}>Archetype/Level</Button>
                    &nbsp;
        <Button
          color="primary"
          variant="contained"
          onClick={toggleManageStats}>Stats</Button>
      </div>
    </nav>
  );
};

export default NavBar;
