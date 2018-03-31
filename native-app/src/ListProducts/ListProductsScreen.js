import React from "react";
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

export default class ListProductsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {productsList:[{id:0, name:"Loading", selected:false, price:0}], isLoading: true};
    this.store = this.props.screenProps.store;
    this.fetchList = this.fetchList.bind(this);
    this.subscribeRender = this.subscribeRender.bind(this);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  subscribeRender(){
    this.setState({
      isLoading: false,
      productsList:this.store.getState().productsList
    });
  }

  componentDidMount(){
    this.unsubscribe = this.store.subscribe(this.subscribeRender);
    this.fetchList();
  }

  fetchList(){
    this.setState({itemsList:[{id:0, name:"Loading"}], isLoading: true});

    fetch('http://api-vanhack-event-sp.azurewebsites.net/api/v1/Product', {
      method: 'GET',
      headers: {}
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.store.dispatch({
        type: "LISTPRODUCTS",
        productsList:responseJson
      });
    })
    .catch((error) =>{
      this.setState({productsList:[{id:0, name:error.message }]});
    });
  }

  selectItem(item){
    const newList = this.state.itemsList.filter(f => f.id != item.id);
    item = JSON.parse(JSON.stringify(item));
    item.selected = !item.selected;
    newList.push(item);
    this.setState({
      isLoading: false,
      itemsList:newList
    });

    this.store.dispatch({
      type: "ADDPRODUCTCART",
      item:item
    });

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
            dataArray={this.state.productsList.sort(function(a, b){ return a.name > b.name; })}
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
