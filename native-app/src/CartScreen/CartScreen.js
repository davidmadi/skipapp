import React from "react";
import { StatusBar } from "react-native";
import {
  Input,
  Label,
  Item,
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
  List,
  ListItem,
  Right,
  Image,
  RefreshControl
} from "native-base";


export default class CartScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {itemsCart:[]};
    this.store = this.props.screenProps.store;
    this.placeOrder = this.placeOrder.bind(this);
    this.subscribeRender = this.subscribeRender.bind(this);
  }

  componentWillMount(){
    this.unsubscribe = this.store.subscribe(this.subscribeRender);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }
  componentDidMount(){
    this.subscribeRender();
  }

  subscribeRender(){
    this.setState({
      isLoading: false,
      itemsCart:this.store.getState().itemsCart
    });
  }

  placeOrder(){

    alert('sorry, not working yet!');
    return;

    this.setState({message:"Loading..."});
    const reducerState = this.store.getState();

    var order = reducerState.order;
    order.id = 0;
    var placeItems = [];
    reducerState.itemsCart.forEach(element => {
      placeItems.push(element);
    });
    order.orderItems = placeItems;
    order.status = "opened";

    fetch('http://api-vanhack-event-sp.azurewebsites.net/api/v1/Order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization : 'Bearer ' + reducerState.userToken
      },
      body: JSON.stringify(order),
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.error)
        this.setState({message:response.error});
      else
      {
        this.setState({message:"Welcome!"});
        this.setState({userToken:response});
        this.navigateToHome();
      }
     })
    .catch((error) =>{
      this.setState({message:error});
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerToggle")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Icon name="cart" />
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List
            dataArray={this.state.itemsCart.sort(function(a, b){ return a.name > b.name; })}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem button>
                  <Left><Text>1x</Text></Left>
                  <Text>{data.name}</Text>
                </ListItem>
              );
            }}
          />
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={this.placeOrder}
          >
            <Text>Place Order!</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
