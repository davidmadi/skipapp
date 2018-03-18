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
  Right
} from "native-base";

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {userToken:this.props.userToken};
    this.navigateToProducts = this.navigateToProducts.bind(this);
  }

  navigateToProducts(){
    alert(this.props.userToken);
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
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Welcome to the great SKIP!</Text>
              </Body>
            </CardItem>
          </Card>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("ListItemsScreen", {...this.props})}
          >
            <Text>Check out products</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
