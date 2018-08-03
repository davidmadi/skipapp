import React from "react";
import {
  Thumbnail,
  Text,
  Card,
  CardItem,
  Body,
  Left,
} from "native-base";
import Foundation from '@expo/vector-icons/Foundation';
import CousinesLib from '../../lib/cousines';

class FilterScreen extends React.Component {

  render(){
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigation.goBack()}>
              <Icon name="md-arrow-dropleft" />
            </Button>
          </Left>
          <Body>
            <Foundation size={25} name="filter" />
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List
            contentContainerStyle={{ marginTop: 0 }}>
            {
              cousines.sort(function(a, b){ return a.name > b.name; })
              .map(cousine =>{
                let cousSelected = cousine.id === this.props.cousine.id;

                return (
                  <ListItem
                  onPress={() => this.props.selectCousine(this, cousine)}>
                    <Left>
                      <Text>{cousine.name}</Text>
                    </Left>
                    <Right>
                      <Radio selected={cousSelected} />
                    </Right>
                  </ListItem>
                );  
              })
            }
          </List>
        </Content>
      </Container>);
  }
}


const mapStateToProps = (allReducers) => ({
  cousines : allReducers.storesReducer.cousines,
  cousine : allReducers.storesReducer.cousine,
});

const mapDispatchToProps  = (dispatch) => ({
  listCousines : (_this) => {
    CousinesLib.listCousine(dispatch, _this);
  },
  selectCousine : (_this, cousine) => {
    CousinesLib.cousineSelect(dispatch, cousine);
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen);

