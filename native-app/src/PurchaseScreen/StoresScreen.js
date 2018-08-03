import React from "react";
import { connect } from "react-redux";
import { StatusBar, TouchableOpacity } from "react-native";
import { StackNavigator } from "react-navigation";
import {
  Thumbnail,
  Image,
  List,
  ListItem,
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
  Right,
  Label
} from "native-base";
import stores from '../../lib/stores';
import Foundation from '@expo/vector-icons/Foundation';


class StoresScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      filterOpened : false,
    };
    this.openFilter = this.openFilter.bind(this);
  }

  componentDidMount(){
    this.props.listStores(this);
  }

  openFilter(){

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
              <Icon name="md-arrow-dropleft" />
            </Button>
          </Left>
          <Body>
            <Icon name="globe" />
          </Body>
          <Right>
            <TouchableOpacity
            onPress={() => this.openFilter()}>
              <Foundation size={25} name="filter" />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content>
            {
              this.props.stores.sort(function(a, b){ return a.name > b.name; })
              .map(store =>
              {
                return ( 
                  <Card style={{flex: 0}} key={store.id}>
                    <CardItem button onPress={() => this.props.selectStore(this, store)}>
                      <Left>
                          <Thumbnail source={{uri: 'Image URL'}} />
                          <Body>
                            <Text>{store.name}</Text>
                            <Text note>{store.address}</Text>
                          </Body>
                      </Left>
                    </CardItem>
                  </Card>
                );
              })
            }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (allReducers) => ({
  stores : allReducers.storesReducer.stores,
  store : allReducers.storesReducer.store,
});

const mapDispatchToProps  = (dispatch) => ({
  listStores : (_this) => {
    stores.listStores(dispatch, _this);
  },
  selectStore : (_this, store) => {
    stores.selectStore(dispatch, _this, store);
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(StoresScreen);

