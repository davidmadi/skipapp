import React from "react";
import { connect } from "react-redux";
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
import Authentication from '../../lib/authentication.js';

class AuthScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email:'davidmadi@gmail.com', 
      password:'DVD12345', 
      autheticated:false, 
      message:'', 
      userToken:'',
      loading:false,
    };
    this.send = this.send.bind(this);
    this.store = this.props.screenProps.store;
    this.navigateToHome = this.navigateToHome.bind(this);
  }

  send(){
    this.setState({loading:true});
    let authUser = {email : this.state.email, password : this.state.password};
    this.props.authenticate(this, authUser);
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

const mapStateToProps = (allReducers) => ({
});

const mapDispatchToProps  = (dispatch) => ({
  authenticate : (_this, user) => {
    Authentication.Authenticate(dispatch, _this, user)
    .then(()=>{
      _this.props.navigation.navigate("IndexApp");
    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

