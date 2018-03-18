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
  Title,
  Left,
  Icon,
  List,
  ListItem,
  Right,
  Image
} from "native-base";


export default class CartScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {itemsCart:[]};
    this.store = this.props.screenProps;
    this.placeOrder = this.placeOrder.bind(this);
    this.subscribeRender = this.subscribeRender.bind(this);
  }

  componentWillMount(){
    this.store.subscribe(this.subscribeRender);
  }

  componentDidMount(){
    this.subscribeRender();    
  }

  subscribeRender(){
    this.setState({
      isLoading: false,
      itemsCart:this.store.getState().itemsCart
    });
  }

  send(){
    this.setState({message:"Loading..."});

    var suffix = "?email="+ this.state.email +"&password="+this.state.password;
    var bod = {email:this.state.email, password:this.state.password};
    fetch('http://api-vanhack-event-sp.azurewebsites.net/api/v1/Customer/auth' + suffix, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify(bod),
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

  placeOrder(){
    //this.props.navigation.navigate("Home", {userToken : this.state.userToken});
  }

  render() {
    return (
      <Container>
        <Header>
          <Left></Left>
          <Body>
            <Icon name='cart' />
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List
            dataArray={this.state.itemsCart.sort(function(a, b){ return a.name > b.name; })}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem button>
                  <Left><Text>1x</Text></Left>
                  <Text>{data.name}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
