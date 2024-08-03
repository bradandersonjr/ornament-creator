import React from 'react';
import { Navbar as FlowbiteNavbar, DarkThemeToggle } from 'flowbite-react';

function Navbar() {
  return (
    <FlowbiteNavbar fluid rounded className="bg-white dark:bg-gray-800">
      <FlowbiteNavbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Ornament Creator
        </span>
      </FlowbiteNavbar.Brand>
      <FlowbiteNavbar.Toggle />
      <FlowbiteNavbar.Collapse>
        <DarkThemeToggle />
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}

export default Navbar;