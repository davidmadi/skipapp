//http://api-vanhack-event-sp.azurewebsites.net/swagger/
import ApiIntegration from 'apiIntegration.js';

export default class Authentication
{

  static dispatchers = {
    USERUPDATE : (dispatch, user)=>{
      dispatch({
        type:'USERUPDATE',
        user:user
      });
    },
    USERTOKEN : (dispatch, userToken)=>{
      dispatch({
        type:'USERTOKEN',
        user:userToken
      });
    }
  }


  static Authenticate(dispatch, _this, user){
    return new Promise((resolve, reject)=>{
      ApiIntegration.authenticate(user.email, user.password)
      .then((newUser)=>{
        Authentication.dispatcher.USERUPDATE(dispatch, newUser);
        _this.setState({
          loading:false
        });
        resolve(newUser);
      })
      .catch((error)=>{
        _this.setState({
          message: error,
          loading:false
        });
        reject(error);
      });  
    });
  }


  
}

