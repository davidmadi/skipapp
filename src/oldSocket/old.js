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
//
//connectSocket(){
//  this.socket = SocketIOClient('http://localhost:8080');
//  this.socket.on('item-'+this.state.itemId+'-subitems', (response) => 
//    this.fetchList()
//    //alert(response)
//  );
//}
//
