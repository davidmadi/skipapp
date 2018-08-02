import React from "react";
import { connect } from "react-redux";
import { StatusBar } from "react-native";
import {
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
  Radio
} from "native-base";
import products from '../../lib/products';
import cart from '../../lib/cart';

class ListProductsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLoading: true};
  }
  
  componentDidMount(){
    this.props.listProducts(this);
  }

  selectItem(item){    
    this.props.addCartItem(this, item);
    this.props.navigation.navigate("Cart");
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="md-arrow-dropleft" />
            </Button>
          </Left>
          <Body>
            <Title>Foods</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List
            dataArray={this.props.productsList.sort(function(a, b){ return a.name > b.name; })}
            contentContainerStyle={{ marginTop: 0 }}
            renderRow={food => {
              return (
                <Card style={{flex: 0}} key={food.id}>
                  <CardItem button onPress={this.selectItem.bind(this, food)}>
                    <Left>
                        <Body>
                          <Text>{food.name}</Text>
                          <Text note>{food.description}</Text>
                        </Body>
                    </Left>
                    <Right>
                      <Text>{food.price}</Text>
                    </Right>
                  </CardItem>
                </Card>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = (allReducers) => ({
  productsList : allReducers.productsReducer.productsList,
});

const mapDispatchToProps  = (dispatch) => ({
  listProducts : (_this) => {
    products.listProducts(dispatch, _this);
  },
  addCartItem : (_this, product) => {
    cart.addItem(dispatch, _this, product);
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ListProductsScreen);

