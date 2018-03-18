import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import MainScreenNavigator from "../ChatScreen/index.js";
import ProfileScreen from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
import ListItemsScreen from "../ListItems/ListItemsScreen.js";
import ListSubItemsScreen from "../ListSubItems/ListSubItemsScreen.js";

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Chat: { screen: MainScreenNavigator },
    ProfileScreen: { screen: ProfileScreen },
    ListItems : {screen : ListItemsScreen },
    ListSubItems : {screen: ListSubItemsScreen}
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
