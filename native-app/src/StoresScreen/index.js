import React, { Component } from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import {
  Footer,
  FooterTab,
  Button,
  Text,
  Icon,
  Header,
  Body,
  Left,
  Right,
  Container
} from "native-base";
import {createStore} from 'redux';
import ListProductsScreen from "../ListProducts/ListProductsScreen.js";
import CartScreen from "../CartScreen/CartScreen.js";
import OrderScreen from "../OrderScreen/OrderScreen.js";
import ReducerFunction from "../Reducers/orderReducer.js";
import StoresStackIndex from "../StoresScreen/StackIndex.js";


export default (HomeScreenRouter = TabNavigator(
  {
    StoresStackIndex: StoresStackIndex,
    //Products: { screen: props => <ListProductsScreen {...props} /> },
    Cart: { screen: props => <CartScreen {...props}  /> },
    Order: { screen: props => <OrderScreen {...props}  /> }//store={store}
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
        return (<CartTab {...props} /> );
    },
    initialRouteName : 'StoresStackIndex'
  }
));

class CartTab extends React.Component{

  constructor(props){
    super(props);
  }

  render()
  {
    return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={this.props.navigationState.index === 0}
              disabled={this.props.navigationState.index === 0}
              onPress={() => this.props.navigation.navigate("StoresStackIndex")}
            >
              <Icon name="globe" />
              <Text>Stores</Text>
            </Button>
            <Button
              vertical
              active={this.props.navigationState.index === 1}
              disabled={this.props.navigationState.index === 1}
              onPress={() => this.props.navigation.navigate("Cart")}
            >
              <Icon name="cart" />
              <Text>Cart</Text>
            </Button>
            <Button
              vertical
              active={this.props.navigationState.index === 2}
              disabled={this.props.navigationState.index === 2}
              onPress={() => this.props.navigation.navigate("Order")}
            >
              <Icon name="document" />
              <Text>Order</Text>
            </Button>
          </FooterTab>
        </Footer>
   );
  }
}