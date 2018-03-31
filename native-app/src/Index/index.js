import React, { Component } from "react";
import MainScreenNavigator from "../ChatScreen/index.js";
import ProfileScreen from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator, TabNavigator } from "react-navigation";
import {createStore} from 'redux';
import ReducerFunction from "../Reducers/OrderReducer.js";
import ListProductsScreen from "../ListProducts/ListProductsScreen.js";
import ListSubItemsScreen from "../ListSubItems/ListSubItemsScreen.js";
import StoresIndex from "../StoresScreen/index.js";

//store = createStore(ReducerFunction);

const IndexApp  = DrawerNavigator(
  {
    Purchase: { screen: StoresIndex },
    //Chat: { screen: props => <MainScreenNavigator {...props} /> },
    //ProfileScreen: { screen: ProfileScreen },
    //Products: { screen: props => <ListProductsScreen {...props}/> }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

export default IndexApp;
