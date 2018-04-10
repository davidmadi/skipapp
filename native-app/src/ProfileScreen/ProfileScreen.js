import React from "react";
import { StatusBar, AsyncStorage } from "react-native";
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


export default class ProfileScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id : 0,
      email: null,
      name: null,
      address: null,
      creation: null,
      password: null
    };
    this.send = this.send.bind(this);
    this.store = this.props.screenProps.store;
  }

  componentDidMount(){
    try {
      const email = await AsyncStorage.getItem('@skipapp:customer_email');
      const name = await AsyncStorage.getItem('@skipapp:customer_name');
      const address = await AsyncStorage.getItem('@skipapp:customer_address');
      if (email !== null){
        this.setState({
          email: email,
          name:name,
          address:address
        })
      }
    } catch (error) {
      this.setState({message:error});
    }
  }

  send(){
    this.setState({message:"Loading..."});

    try {
      await AsyncStorage.setItem('@skipapp:customer_email', this.state.email);
      await AsyncStorage.setItem('@skipapp:customer_name', this.state.name);
      await AsyncStorage.setItem('@skipapp:customer_address', this.state.address);
    } catch (error) {
      this.setState({message:error});
    }

    this.store.dispatch({
      type: "USERUPDATE",
      user:{
        id:1,
        name:this.state.name,
        email:this.state.email,
        address:this.state.address
      }
    });

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
          <Label>My data</Label>
          <Item>
            <Input placeholder='Name' value={this.state.name} onChangeText={(text) => this.setState({name:text})}/>
          </Item>        
          <Item>
            <Input placeholder='Email' value={this.state.email} onChangeText={(text) => this.setState({email:text})}/>
          </Item>        
          <Item>
            <Input placeholder='Address' value={this.state.address} onChangeText={(text) => this.setState({address:text})}/>
          </Item>
          <Label style={{ marginTop: 20, alignSelf: "center" }}>{this.state.message}</Label>
        </Content>
      </Container>
    );
  }
}
