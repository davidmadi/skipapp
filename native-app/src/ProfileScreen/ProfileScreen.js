import React from "react";
import { connect } from "react-redux";
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
import authentication from '../../lib/authentication';


class ProfileScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id : 0,
      email: this.props.user.email,
      name: this.props.user.name,
      address: this.props.user.address,
      creation: this.props.user.creation,
      password: this.props.user.password,
    };
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(){
    this.props.userUpdate(this, this.state);
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
            <Icon name="person" />
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Item>
            <Input placeholder='Name' value={this.state.name} onChangeText={(text) => this.setState({name:text})}/>
          </Item>        
          <Item>
            <Input placeholder='Email' value={this.state.email} onChangeText={(text) => this.setState({email:text})}/>
          </Item>        
          <Item>
            <Input placeholder='Address' value={this.state.address} onChangeText={(text) => this.setState({address:text})}/>
          </Item>
          <Item>
            <Button rounded full
            onPress={()=> this.updateUser()}
            >
              <Text>Update</Text>
            </Button>            
          </Item>
          <Label style={{ marginTop: 20, alignSelf: "center" }}>{this.state.message}</Label>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (allReducers) => ({
  user : allReducers.customerReducer.user,
});

const mapDispatchToProps  = (dispatch) => ({
  userUpdate : (_this, user) => {
    authentication.dispatchers.USERUPDATE(dispatch, user);
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

