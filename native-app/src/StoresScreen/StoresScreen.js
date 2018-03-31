import React from "react";
import { StatusBar } from "react-native";
import { StackNavigator } from "react-navigation";
import {
  Thumbnail,
  Image,
  List,
  ListItem,
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
  Right,
  Label
} from "native-base";
import ListProductsScreen from "../ListProducts/ListProductsScreen.js";


export default class StoresScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {userToken:this.props.userToken, isLoading: true, storesList:[{id:0, name:"Loading"}]};
    //this.navigateToProducts = this.navigateToProducts.bind(this);
    this.store = this.props.screenProps.store;
    this.subscribeRender = this.subscribeRender.bind(this);
  }

  subscribeRender(){
    this.setState({
      isLoading: false,
      storesList:this.store.getState().storesList
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  componentDidMount(){
    this.unsubscribe = this.store.subscribe(this.subscribeRender);
    this.fetchList();
  }

  fetchList(){
    fetch('http://api-vanhack-event-sp.azurewebsites.net/api/v1/Store', {
      method: 'GET',
      headers: {}
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.store.dispatch({
        type: "STORES",
        storesList:responseJson
      });
    })
    .catch((error) =>{
      this.setState({storesList:[{id:0, name:error.message }]});
    });
  }

  navigateToProducts(store){
    this.store.dispatch({
      type: "STOREID",
      storeId:store.id
    });
    this.props.navigation.navigate("products");
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
            <Icon name="globe" />
          </Body>
          <Right />
        </Header>
        <Content>
            {
              this.state.storesList.sort(function(a, b){ return a.name > b.name; }).map(store =>
              {
                return ( 
                    <Card style={{flex: 0}} key={store.id}>
                      <CardItem button onPress={this.navigateToProducts.bind(this, store)}>
                        <Left>
                            <Thumbnail source={{uri: 'Image URL'}} />
                            <Body>
                              <Text>{store.name}</Text>
                              <Text note>{store.address}</Text>
                            </Body>
                        </Left>
                      </CardItem>
                    </Card>
                );
              })
            }
        </Content>
      </Container>
    );
  }
}
