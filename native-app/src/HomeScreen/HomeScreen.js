import React from "react";
import { StatusBar } from "react-native";
import {
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

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {userToken:this.props.userToken, isLoading: true, storesList:[]};
    //this.navigateToProducts = this.navigateToProducts.bind(this);
    this.store = this.props.screenProps;
    this.subscribeRender = this.subscribeRender.bind(this);
  }

  componentDidMount(){
    this.fetchList();
  }

  fetchList(){
    this.setState({storesList:[{id:0, name:"Loading"}], isLoading: true});

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

  componentWillMount(){
    this.store.subscribe(this.subscribeRender);
  }

  subscribeRender(){
    this.setState({
      isLoading: false,
      storesList:this.store.getState().storesList
    });
  }

  navigateToProducts(store){
    this.store.dispatch({
      type: "STOREID",
      storeId:store.id
    });
    this.props.navigation.navigate("Products");
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Welcome</Title>
          </Body>
          <Right />
        </Header>
        <Content>
              <Label>
                <Text>Choose your store!</Text>
              </Label>
          <List
            dataArray={this.state.storesList.sort(function(a, b){ return a.name > b.name; })}
            contentContainerStyle={{ marginTop: 20 }}
            renderRow={data => {
              return (
                <ListItem button>
                  <Button
                    full
                    rounded
                    primary
                    style={{ marginTop: 10 }}
                    onPress={this.navigateToProducts.bind(this, data)}
                  >
                    <Text>{data.name}</Text>
                  </Button>                  
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
