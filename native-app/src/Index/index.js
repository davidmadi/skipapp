import React, { Component } from "react";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator, TabNavigator } from "react-navigation";
import PurchaseIndex from '../PurchaseScreen/index';
import ProfileScreen from "../ProfileScreen/ProfileScreen.js";

const IndexApp  = DrawerNavigator(
  {
    Purchase: { screen: PurchaseIndex },
    Profile: { screen: ProfileScreen },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

export default IndexApp;
