import React from "react";
import { StatusBar, TouchableOpacity } from "react-native";
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
                let totalItems = order.orderItems.reduce(AMath.sumProductQuantityReducer, 0);
                let totalPrice =  AMath.aRound(order.orderItems.reduce(AMath.sumProductReducer, 0));
                return (
                  <TouchableOpacity key={order.id}
                  onPress={() => this.props.refreshOrderStatus(this, order)}>
                    <Card style={{flex: 1}}>
                      <CardItem>
                        <Left style={{flexDirection:'row'}}>
                          <Icon name="pricetag" />
                          <Text>{totalPrice}</Text>
                        </Left>
                        <Body>
                          <Text>{order.storeName}</Text>
                          <Text note>{totalItems} Items</Text>
                        </Body>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);

