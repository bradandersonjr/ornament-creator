import React from 'react';
import { Footer as FlowbiteFooter } from 'flowbite-react';

function Footer() {
  return (
    <FlowbiteFooter container className="bg-white dark:bg-gray-800">
      <FlowbiteFooter.Copyright href="#" by="Ornament Creator™" year={2023} />
    </FlowbiteFooter>
  );
}

export default Footer;