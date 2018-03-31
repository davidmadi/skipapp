import React from "react";
import { StatusBar } from "react-native";
import { StackNavigator } from "react-navigation";
import {
  Thumbnail,
  Image,
  List,
  ListItem,
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Label
} from "native-base";
import ListProductsScreen from "../ListProducts/ListProductsScreen.js";
import StoresScreen from './StoresScreen.js';

export default storeStack = StackNavigator({
  stores : StoresScreen,
  products : ListProductsScreen
},
{
  headerMode : 'none'
});

