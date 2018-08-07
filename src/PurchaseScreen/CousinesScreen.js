import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import {
  Button,
  Text,
  Container,
  Footer,
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
    this.reset = this.reset.bind(this);
  }
  
  componentDidMount(){
    this.props.listCousines(this);
  }

  reset(){
    this.selectCousine(null);
  }

  selectCousine(item){    
    this.props.cousineSelect(this, item);
    this.props.navigation.goBack();
    let onSelect = this.props.navigation.getParam("onSelect");
    if (onSelect)
      onSelect();
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
            contentContainerStyle={{ marginTop: 0 }}>
            {
              this.props.cousines.sort(function(a, b){ return a.name > b.name; })
              .map(mapCousine => {
                let cousineSelected = (this.props.cousine && mapCousine.id === this.props.cousine.id) ? true : false;
                return (
                    <ListItem avatar 
                      key={mapCousine.id}
                      onPress={()=> this.selectCousine(mapCousine)}>
                      <Left>
                        <Icon name="albums" />
                      </Left>
                      <Body>
                        <Text>{mapCousine.name}</Text>
                        <Text note>{mapCousine.description}</Text>
                      </Body>
                      <Right>
                        <Radio selected={cousineSelected} />
                      </Right>
                    </ListItem>
                );
              })
            }
          </List>
        </Content>
        <Footer>
          <Button
          onPress={() => this.reset()}>
            <Text>Reset</Text>
          </Button>
        </Footer>
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

