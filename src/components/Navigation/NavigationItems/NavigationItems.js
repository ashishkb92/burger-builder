import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems} >
      <NavigationItem link="/" active> Burger Builder </NavigationItem>
      <NavigationItem> Checkout </NavigationItem>
    </ul>
  );
};

export default navigationItems;