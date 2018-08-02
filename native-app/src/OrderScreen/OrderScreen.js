import React from "react";
import { StatusBar, TouchableOpacity } from "react-native";
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


class OrderScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLoading:false};
  }

  render() {
    return (
      <Container>
        <Header>
          <Left></Left>
          <Body>
            <Text>Orders</Text>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List
            dataArray={this.props.orders}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={order => {
              return (
                <TouchableOpacity
                onPress={() => this.props.refreshOrderStatus(this, order)}>
                  <Card style={{flex: 1}} key={product.id}>
                    <CardItem>
                      <Left>
                        <Icon name="pricetag" />
                      </Left>
                      <Body>
                        <Text>{order.id}</Text>
                        <Text>{order.storeName}</Text>
                        <Text note>{order.orderItems.length}</Text>
                      </Body>
                      <Right>
                        <Text>{order.status}</Text>
                      </Right>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (allReducers) => ({
  orders : allReducers.orderReducer.orders,
  user : allReducers.customerReducer.user,
});

const mapDispatchToProps  = (dispatch) => ({
  refreshOrderStatus : (_this, order) => {
    OrderLib.refreshOrderStatus(dispatch, _this, order);    
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);

