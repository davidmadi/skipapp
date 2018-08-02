import React, { Component } from "react";
import { StyleProvider } from "native-base";
import Expo from "expo";
import AuthIndex from "./src/AuthScreen/index.js";

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from "./src/Reducers/allReducers.js";

let store = createStore(allReducers);

export default class AwesomeApp extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return(
      //<StyleProvider>
        <Provider  store={store}>
          <AuthIndex />
        </Provider>);
      //</StyleProvider>
  }
}
