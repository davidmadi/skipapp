import React, { Component } from "react";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
import AuthScreen from "./AuthScreen.js";
import IndexApp from "../Index/index.js";

//store = createStore(ReducerFunction);

const AuthScreenRouter = DrawerNavigator(
  {
    //HomeIndex : {screen : HomeIndex },//remove
    AuthScreen: { screen: AuthScreen },
    IndexApp: { screen: IndexApp }
    //Chat: { screen: props => <MainScreenNavigator {...props} /> },
    //ProfileScreen: { screen: ProfileScreen },
    //Products: { screen: props => <ListProductsScreen {...props}/> }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

export default AuthScreenRouter;
