//http://api-vanhack-event-sp.azurewebsites.net/swagger/
import ApiIntegration from './apiIntegration.js';
import { AsyncStorage } from "react-native";

export default class Authentication {

  static dispatchers = {
    USERUPDATE: (dispatch, user) => {
      dispatch({
        type: 'USERUPDATE',
        user: user
      });
    },
    USERTOKEN: (dispatch, userToken) => {
      dispatch({
        type: 'USERTOKEN',
        user: userToken
      });
    }
  }


  static Authenticate(dispatch, _this, user) {
    return new Promise((resolve, reject) => {
      ApiIntegration.authenticate(user.email, user.password)
        .then((newUser) => {
          Authentication.dispatchers.USERUPDATE(dispatch, newUser);
          _this.setState({
            loading: false
          });
          resolve(newUser);
        })
        .catch((error) => {
          _this.setState({
            message: error.message,
            loading: false
          });
        });
    });
  }

  static UserKey(email){
    return '@skipapp_profile:' + email;
  }

  static LoadProfile(dispatch, _this, user){
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(Authentication.UserKey(user.email))
      .then(strProfile =>{
        if (strProfile){
          let profile = JSON.parse(strProfile);
          if (profile && profile.name){
            let user = {
              id: profile.id || user.id,
              address: profile.address,
              name: profile.name,
              email: profile.email,
              password: profile.password,
            }; 
            _this.setState(user);
            Authentication.dispatchers.USERUPDATE(dispatch, user);
            resolve(user);
          }
        }
        else {
          reject(false);
        }
      })
      .catch(() =>{
        reject(false);
      });
    });
  }

  static SaveProfile(dispatch, _this){
    return new Promise((resolve, reject) => {
      let profile = {
        id : _this.props.user.id,
        name:_this.state.name,
        email:_this.state.email,
        address:_this.state.address,
        password:_this.state.password,
      };
      AsyncStorage.setItem(Authentication.UserKey(_this.state.email), JSON.stringify(profile))
      .then(() => {
        Authentication.dispatchers.USERUPDATE(dispatch, profile);
        _this.setState({message:"Profile saved."});
        resolve(true);
      })
      .catch((error)=>{
        _this.setState({message:error});
        reject(false);
      });
    }); 
  }

  static PersistUser(dispatch, _this, user) {
    return new Promise((resolve, reject) => {
      ApiIntegration.persistUser(user)
        .then((newUser) => {
          Authentication.dispatchers.USERUPDATE(dispatch, newUser);
          _this.setState({
            loading: false
          });
          resolve(newUser);
        })
        .catch((error) => {
          _this.setState({
            message: error,
            loading: false
          });
          reject(error);
        });
    });
  }



}