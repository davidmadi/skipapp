import React, { Component } from "react";
import MainScreenNavigator from "../ChatScreen/index.js";
import ProfileScreen from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import ListItemsScreen from "../ListItems/ListItemsScreen.js";
import ListSubItemsScreen from "../ListSubItems/ListSubItemsScreen.js";
import AuthScreen from "./AuthScreen.js";
import HomeScreen from "../HomeScreen/HomeScreen.js";

const AuthScreenRouter = DrawerNavigator(
  {
    //ListItemsScreen : {screen : ListItemsScreen },//remove
    AuthScreen: { screen: AuthScreen },
    Home: { screen: HomeScreen },
    Chat: { screen: MainScreenNavigator },
    ProfileScreen: { screen: ProfileScreen },
    ListItemsScreen : {screen : ListItemsScreen },
    ListSubItems : {screen: ListSubItemsScreen}
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default AuthScreenRouter;
