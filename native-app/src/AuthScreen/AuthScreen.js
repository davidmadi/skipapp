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


export default class AuthScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {email:'davidmadi@gmail.com', password:'DVD12345', autheticated:false, message:'', userToken:''};
    this.send = this.send.bind(this);
    this.store = this.props.screenProps;
    this.navigateToHome = this.navigateToHome.bind(this);
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
        this.store.dispatch({
          type: "LISTPRODUCTS",
          userToken:response
        });
          this.setState({message:"Welcome!"});
        this.setState({userToken:response});
        this.navigateToHome();
      }
     })
    .catch((error) =>{
      this.setState({message:error});
    });


  }

  navigateToHome(){
    this.props.navigation.navigate("Home");
  }
  onPasswordValueChange(e){
    this.setState({password:e})
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
          <Label>Authentication</Label>
          <Item>
            <Input placeholder='Email' value={this.state.email} onChangeText={(text) => this.setState({email:text})}/>
          </Item>        
          <Item>
            <Input placeholder='Password' value={this.state.password} onChangeText={(text) => this.setState({password:text})}/>
          </Item>        
          <Button
            rounded
            success
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={this.send.bind(this)}
            >
            <Text>Enter</Text>
          </Button>
          <Label style={{ marginTop: 20, alignSelf: "center" }}
            >{this.state.message}</Label>
        </Content>
      </Container>
    );
  }
}
