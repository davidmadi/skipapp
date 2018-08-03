import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
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
import Cousines from '../../lib/cousines';

class CousinesScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLoading: true};
  }
  
  componentDidMount(){
    this.props.listCousines(this);
  }

  selectCousine(item){    
    this.props.cousineSelect(this, item);
    this.props.navigation.navigate("stores");
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
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Cousines</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List
            dataArray={this.props.cousines.sort(function(a, b){ return a.name > b.name; })}
            contentContainerStyle={{ marginTop: 0 }}
            renderRow={cousine => {
              return (
                  <ListItem avatar 
                    onPress={()=> this.selectCousine(cousine)}>
                    <Left>
                      <Icon name="albums" />
                    </Left>
                    <Body>
                      <Text>{cousine.name}</Text>
                      <Text note>{cousine.description}</Text>
                    </Body>
                    <Right></Right>
                  </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = (allReducers) => ({
  cousines : allReducers.storesReducer.cousines,
  cousine : allReducers.storesReducer.cousine,
});

const mapDispatchToProps  = (dispatch) => ({
  listCousines : (_this) => {
    Cousines.listCousine(dispatch, _this);
  },
  cousineSelect : (_this, cousine) => {
    Cousines.cousineSelect(dispatch, cousine);
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CousinesScreen);

