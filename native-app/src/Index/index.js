import React, { Component } from "react";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator, TabNavigator } from "react-navigation";
import StoresIndex from "../StoresScreen/index.js";
import ProfileScreen from "../ProfileScreen/ProfileScreen.js";

const IndexApp  = DrawerNavigator(
  {
    Purchase: { screen: StoresIndex },
    Profile: { screen: ProfileScreen },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

export default IndexApp;
