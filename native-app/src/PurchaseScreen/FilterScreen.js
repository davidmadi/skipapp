import React from "react";
import {
  Thumbnail,
  Text,
  Card,
  CardItem,
  Body,
  Left,
} from "native-base";

export default ((onSelect, cousines) =>{

  return (<View>
    <Card style={{flex: 1}} key={store.id}>
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
  </View>);

});