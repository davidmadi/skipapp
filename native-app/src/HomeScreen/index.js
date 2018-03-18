import React, { Component } from "react";
import { TabNavigator } from "react-navigation";
import {
  Footer,
  FooterTab,
  Button,
  Text,
  Icon,
  Body,
  Container
} from "native-base";
import {createStore} from 'redux';
import ListProductsScreen from "../ListProducts/ListProductsScreen.js";
import CartScreen from "../CartScreen/CartScreen.js";
import OrderScreen from "../OrderScreen/OrderScreen.js";
import ReducerFunction from "../Reducers/OrderReducer.js";
import HomeScreen from "../HomeScreen/HomeScreen.js";

export default (HomeScreenRouter = TabNavigator(
  {
    Home: { screen: props => <HomeScreen {...props} /> },
    Products: { screen: props => <ListProductsScreen {...props} /> },
    Cart: { screen: props => <CartScreen {...props}  /> },
    Order: { screen: props => <OrderScreen {...props}  /> }//store={store}
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
          <Footer>
            <FooterTab>
              <Button
                vertical
                active={props.navigationState.index === 0}
                onPress={() => props.navigation.navigate("Home")}
              >
                <Icon name="globe" />
                <Text>Stores</Text>
              </Button>
              <Button
                vertical
                active={props.navigationState.index === 1}
                onPress={() => props.navigation.navigate("Products")}
              >
                <Icon name="briefcase" />
                <Text>Food</Text>
              </Button>
              <Button
                vertical
                active={props.navigationState.index === 2}
                onPress={() => props.navigation.navigate("Cart")}
              >
                <Icon name="cart" />
                <Text>Cart</Text>
              </Button>
              <Button
                vertical
                active={props.navigationState.index === 3}
                onPress={() => props.navigation.navigate("Order")}
              >
                <Icon name="document" />
                <Text>Order</Text>
              </Button>
            </FooterTab>
          </Footer>
      );
    }
  }
));

