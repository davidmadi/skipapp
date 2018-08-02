import React from "react";
import { connect } from "react-redux";
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
import cousines from '../../lib/cousines';

export default class ListCousinesScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLoading: true};
  }
  
  componentDidMount(){
    this.props.listCousines(this);
  }

  selectItem(item){    
    this.props.addCartItem(this, item);
    this.props.navigation.navigate("Products");
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="md-arrow-dropleft" />
            </Button>
          </Left>
          <Body>
            <Title>Cousines</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List
            dataArray={this.props.cousinesList.sort(function(a, b){ return a.name > b.name; })}
            contentContainerStyle={{ marginTop: 0 }}
            renderRow={cousine => {
              return (
                <Card style={{flex: 0}} key={cousine.id}>
                  <CardItem button onPress={this.selectItem.bind(this, cousine)}>
                    <Left>
                        <Body>
                          <Text>{cousine.name}</Text>
                          <Text note>{cousine.description}</Text>
                        </Body>
                    </Left>
                    <Right>
                      <Text>{cousine.price}</Text>
                    </Right>
                  </CardItem>
                </Card>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = (allReducers) => ({
  cousinesList : allReducers.cousinesReducer.cousinesList,
});

const mapDispatchToProps  = (dispatch) => ({
  listCousines : (_this) => {
    cousines.listCousine(dispatch, _this);
  },
  selectCousine : (_this, cousine) => {
    cousines.selecCousine(dispatch, cousine);
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ListProductsScreen);

