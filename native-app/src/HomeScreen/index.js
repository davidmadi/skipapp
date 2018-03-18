import React, { Component } from "react";
import { TabNavigator } from "react-navigation";
import {
  Footer,
  FooterTab,
  Button,
  Text,
  Icon
} from "native-base";
import {createStore} from 'redux';
import ListProductsScreen from "../ListProducts/ListProductsScreen.js";
import CartScreen from "../CartScreen/CartScreen.js";
import OrderScreen from "../OrderScreen/OrderScreen.js";
import ReducerFunction from "../Reducers/OrderReducer.js";

//store = createStore(ReducerFunction);

export default (HomeScreenRouter = TabNavigator(
  {
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
              onPress={() => props.navigation.navigate("Products")}
            >
              <Icon name="briefcase" />
              <Text>Products</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Cart")}
            >
              <Icon name="cart" />
              <Text>Cart</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
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

