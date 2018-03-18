import React, { Component } from "react";
import MainScreenNavigator from "../ChatScreen/index.js";
import ProfileScreen from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator, TabNavigator } from "react-navigation";
import {createStore} from 'redux';
import ReducerFunction from "../Reducers/OrderReducer.js";
import ListProductsScreen from "../ListProducts/ListProductsScreen.js";
import ListSubItemsScreen from "../ListSubItems/ListSubItemsScreen.js";
import AuthScreen from "./AuthScreen.js";
import HomeScreen from "../HomeScreen/HomeScreen.js";
import HomeIndex from "../HomeScreen/index.js";

//store = createStore(ReducerFunction);

const AuthScreenRouter = DrawerNavigator(
  {
    //HomeIndex : {screen : HomeIndex },//remove
    AuthScreen: { screen: AuthScreen },
    Home: { screen: HomeIndex },
    Chat: { screen: MainScreenNavigator },
    ProfileScreen: { screen: ProfileScreen },
    Products: { screen: props => <ListProductsScreen {...props}/> },
    HomeIndex : {screen : HomeIndex }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

export default AuthScreenRouter;
