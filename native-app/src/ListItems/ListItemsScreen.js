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
  Image,
  Radio
} from "native-base";
import SocketIOClient from 'socket.io-client';
import ListSubItemsScreen from '../ListSubItems/ListSubItemsScreen';


export default class ListItemsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {itemsList:[{id:0, name:"Loading", selected:false}], isLoading: true};
    this.fetchList = this.fetchList.bind(this);
    this.navigateToItem = this.navigateToItem.bind(this);
  }

  componentDidMount(){
    this.fetchList();
  }

  fetchList(){
    this.setState({itemsList:[{id:0, name:"Loading"}], isLoading: true});

    fetch('http://api-vanhack-event-sp.azurewebsites.net/api/v1/Cousine', {
      method: 'GET',
      headers: {}
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        itemsList:responseJson,
      });
    })
    .catch((error) =>{
      this.setState({itemsList:[{id:0, name:error.message }]});
    });
  }

  navigateToItem(item){
    this.props.navigation.navigate("ListSubItems", {itemid : item.id});
  }

  selectItem(item){
    const newList = this.state.itemsList.filter(f => f.id != item.id);
    item = {id: item.id, name:item.name, selected:!item.selected};
    newList.push(item);
    this.setState({
      isLoading: false,
      itemsList:newList
    });
    //this.setState({itemsList:newList});
    //alert(item.selected);
  }

  whynot(item){
    return item.selected;
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
            <Title>Cousine</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List
            dataArray={this.state.itemsList.sort(function(a, b){ return a.name > b.name; })}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem button
                  onPress={this.selectItem.bind(this, data)}>
                  <Left>
                    <Radio selected={data.selected} />
                  </Left>
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
