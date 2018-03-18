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
  Image
} from "native-base";
import SocketIOClient from 'socket.io-client';


export default class ListItemsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {itemid: this.props.navigation.state.params.itemid, subItemsList:[{id:0, name:"Loading"}], isLoading: true};
    this.fetchList = this.fetchList.bind(this);
    this.connectSocket = this.connectSocket.bind(this);
    this.replaceItem = this.replaceItem.bind(this);
  }

  componentDidMount(){
    //alert(this.props.navigation.state.params.itemid);
    this.fetchList();
    this.connectSocket();
  }

  connectSocket(){
    this.socket = SocketIOClient('http://localhost:8080');
    this.socket.on('item-'+this.state.itemId+'-subitems', (response) => 
      this.fetchList()
      //alert(response)
    );
  }

  replaceItem(item){
    const newList = this.state.itemsList.filter(i => i.id != item.id);
    newList.push(item);
    this.setState({itemsList:newList})
  }

  fetchList(){
    this.setState({subItemsList:[{id:0, name:"Loading"}], isLoading: true});

    const body = JSON.stringify({id : this.state.itemid});
    fetch('http://localhost:8080/subitem/loadlist',
    {
        method: "POST",
        headers:{
          'content-type': 'application/json;charset=UTF-8'
        },
        body: body
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        subItemsList:responseJson,
      });
    })
    .catch((error) =>{
      this.setState({subItemsList:[{id:0, name:error.message }]});
    });

  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('ListItems')}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>List of items</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List
            dataArray={this.state.subItemsList}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem button>
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
