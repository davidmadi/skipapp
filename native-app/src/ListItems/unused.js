import React, { Component } from "react";
import HomeScreen from "../HomeScreen/HomeScreen.js";
import MainScreenNavigator from "../ChatScreen/index.js";
import ProfileScreen from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { TabNavigator } from "react-navigation";
import ListItemsScreen from "./ListItemsScreen.js";

const ListItemsScreenRouter = TabNavigator(
  {
    Home: { screen: HomeScreen },
    ListItems : {screen : ListItemsScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default ListItemsScreenRouter;
