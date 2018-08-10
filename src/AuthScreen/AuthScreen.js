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
      email:'admin@gmail.com', 
      password:'1234', 
      autheticated:false, 
      message:'', 
      userToken:'',
      loading:false,
    };
    this.send = this.send.bind(this);
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
          <Item style={{alignSelf:'center'}}>
            <Label>Authentication</Label>
          </Item>
          <Item>
            <Input placeholder='Email' value={this.state.email} onChangeText={(text) => this.setState({email:text})}/>
          </Item>        
          <Item>
            <Input placeholder='Password' value={this.state.password} onChangeText={(text) => this.setState({password:text})}/>
          </Item>
          <Item
            style={{ marginTop: 20, alignSelf: "center" }}>
            <Button
              rounded
              success
              onPress={this.send.bind(this)}
              >
              <Text>Enter</Text>
            </Button>
          </Item>
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
    .then((newUser)=>{
      Authentication.LoadProfile(dispatch, _this, newUser)
      .then(()=>{
        _this.props.navigation.navigate("IndexApp");
      })
      .catch(()=>{
        _this.props.navigation.navigate("IndexApp");
      });

    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

