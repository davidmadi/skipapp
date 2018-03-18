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


export default class OrderScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {itemsCart:[]};
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount(){
    //this.fetchList();
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
            <Icon name='person' />
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Label>This is your Order</Label>
          <Label style={{ marginTop: 20, alignSelf: "center" }}
            >{this.state.message}</Label>
        </Content>
      </Container>
    );
  }
}
