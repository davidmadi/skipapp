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
  RefreshControl,
  Grid,
  Row
} from "native-base";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const paddApp = 5;
const wideWidth = width * 0.98 - paddApp;
const itemHeigh = height / 10;

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

    alert('sorry, not working yet!'+wideWidth);
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

    if (this.state.cart.price == 0){
      return(
        <Container>
          <Header></Header>
          <Body style={{ marginTop:itemHeigh }}>
            <Text info style={{fontSize:30}} >Your cart is empty.</Text>
            <Text info style={{fontSize:70}}>;-)</Text>
          </Body>
        </Container>
      );
    }

    const priceFormatted = this.state.cart.price;
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
                <Card style={{flex: 0}} key={data.id}>
                  <CardItem>
                    <Left><Text>{data.quantity}x</Text></Left>
                    <Right>
                      <Text>{data.name}</Text>
                    </Right>
                  </CardItem>
                </Card>
              );
            }}
          />
        </Content>
        <Footer style={{marginBottom: paddApp, height:itemHeigh*2}}>
          <Container>
            <Grid>
              <Row style={{ padding:paddApp*2, height: itemHeigh }}>
                <Left>
                    <Icon name="ios-card" />
                </Left>
                <Right style={{ padding:paddApp*2 }}>
                  <Text>{priceFormatted}</Text>
                </Right>
              </Row>
              <Row style={{ padding:paddApp, height: itemHeigh+paddApp }}>
                <Button
                      full
                      primary
                      style={{ width:wideWidth, marginTop: 0 }}
                      onPress={this.placeOrder}
                    >
                  <Text>Place Order!</Text>
                </Button>
              </Row>
            </Grid>
          </Container>
        </Footer>
      </Container>
    );
  }
}
