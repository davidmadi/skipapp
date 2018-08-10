import React from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
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
  Image
} from "native-base";
import OrderLib from '../../lib/orderLib';
import AMath from '../../lib/calculations/amath';


class OrderScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLoading:false};
  }

  componentDidMount(){
    if (!this.props.order)
      this.props.loadOrders(this);
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerToggle")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Text>Orders</Text>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List
            contentContainerStyle={{ marginTop: 120 }}>
            {
              this.props.orders.map(order =>{
                let totalPrice =  AMath.aRound(order.orderItems.reduce(AMath.sumProductReducer, 0));
                return (
                  <TouchableOpacity key={order.id}
                  onPress={() => this.props.refreshOrderStatus(this, order)}>
                      <Card style={{flex: 1}} key={order.id}>
                        <CardItem>
                          <Left>
                            <Icon name="pricetag" />
                          </Left>
                          <Body>
                            <Text>{order.storeName}</Text>
                          </Body>
                          <Right>
                            <Text>$ {totalPrice}</Text>
                          </Right>
                        </CardItem>
                        {
                          order.orderItems.map(orderItem => {
                            let linePrice = orderItem.quantity * orderItem.price;
                            return(
                              <CardItem key={orderItem.id}>
                                <Left>
                                  <Text>{orderItem.quantity}x</Text>
                                  <Text>{orderItem.storeName}</Text>
                                </Left>
                                <Right>
                                  <Text>{linePrice}</Text>
                                </Right>
                              </CardItem>);
                          })
                        }
                        <CardItem>
                          <Left>
                            <Text>{order.deliveryAddress}</Text>
                          </Left> 
                          <Right>
                            <Text>{order.status}</Text>
                          </Right>
                        </CardItem>
                      </Card>
                  </TouchableOpacity>
                );
              })
            }
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (allReducers) => {
  return {
    orders : allReducers.orderReducer.orders,
    user : allReducers.customerReducer.user,
  }
};

const mapDispatchToProps  = (dispatch) => ({
  refreshOrderStatus : (_this, order) => {
    OrderLib.refreshOrderStatus(dispatch, _this, order);    
  },
  loadOrders : (_this) => {
    OrderLib.loadOrders(dispatch, _this);
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);

