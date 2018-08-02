import React from "react";
import { connect } from "react-redux";
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
import OrderLib from '../../lib/orderLib';

const { width, height } = Dimensions.get('window');
const paddApp = 5;
const wideWidth = width * 0.98 - paddApp;
const itemHeigh = height / 10;

class CartScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLoading:false};
  }

  render() {

    if (this.props.price == 0){
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

    const priceFormatted = "$ " + this.props.price;
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
            dataArray={this.props.items.sort(function(a, b){ return a.name > b.name; })}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={product => {
              return (
                <Card style={{flex: 0}} key={product.id}>
                  <CardItem>
                    <Left><Text>{product.quantity}x</Text></Left>
                    <Right>
                      <Text>{product.name}</Text>
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
                      onPress={() => this.props.placeOrder(this)}
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

const mapStateToProps = (allReducers) => ({
  items : allReducers.cartReducer.items,
  price : allReducers.cartReducer.price,
  user : allReducers.customerReducer.user,
});

const mapDispatchToProps  = (dispatch) => ({
  placeOrder : (_this) => {
    OrderLib.createOrders(dispatch, _this);
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

