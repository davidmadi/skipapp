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
  Footer,
  FooterTab,
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
    this.state = {cart : { items:[], price:"10" }};
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
      cart: this.store.getState().cart
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
            dataArray={this.state.cart.items.sort(function(a, b){ return a.name > b.name; })}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem button>
                  <Left><Text>{data.quantity}x</Text></Left>
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
        <Footer>
          <Body>
          <Content>

          <Card style={{marginBottom: 10}} >
            <CardItem button>
              <Left>
                <Body>
                  <Icon name="md-umbrella" />
                </Body>
              </Left>
              <Right>
                <Body>
                  <Text>{this.state.cart.price}</Text>
                </Body>
              </Right>
            </CardItem>
          </Card>
          </Content>
          </Body>
        </Footer>
      </Container>
    );
  }
}
