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
import ProductsScreen from './ProductsScreen';
import CousinesScreen from './CousinesScreen';
import StoresScreen from './StoresScreen.js';

export default storeStack = StackNavigator({
  stores : StoresScreen,
  products : ProductsScreen,
  cousines : CousinesScreen,
},
{
  headerMode : 'none'
});

