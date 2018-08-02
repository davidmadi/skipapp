import Moment from 'moment';

export default class ApiIntegration{

  static createUser(user){
    return new Promise((resolve, reject)=>{
      let currDate = Moment(new Date()).format('YYYY-MM-DD HH:mm');  
      var bod = {
        "id": 0,
        "email": user.email,
        "name": user.name,
        "address": user.address,
        "creation": currDate,
        "password": user.password
      };

      fetch('http://api-vanhack-event-sp.azurewebsites.net/api/v1/Customer', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: JSON.stringify(bod),
      })
      .then((response) => response.json())
      .then((response) => {
        if (response.error)
          reject({message:response.error});
        else
          resolve(response);
        })
      .catch((error) =>{
        reject({message:error});
      });
    });
  }

  static authenticate(email, password){
    return new Promise((resolve, reject)=>{

      var suffix = "?email="+ email +"&password="+password;
      var bod = {email:email, password:password};
      fetch('http://api-vanhack-event-sp.azurewebsites.net/api/v1/Customer/auth' + suffix, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: JSON.stringify(bod),
      })
      .then((response) => response.json())
      .then((response) => {
        if (response.error)
          reject({message:response.error});
        else
          resolve(response);
        })
      .catch((error) =>{
        reject({message:error});
      });

    });
  }

  static listProducts(){
    return new Promise((resolve,reject)=>{
      fetch('http://api-vanhack-event-sp.azurewebsites.net/api/v1/Product', {
        method: 'GET',
        headers: {}
      })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) =>{
        reject(error);
      });
    });
  }

  static searchStores(name){
    //http://api-vanhack-event-sp.azurewebsites.net/api/v1/Store/search/a
    return new Promise((resolve,reject)=>{

      fetch(`http://api-vanhack-event-sp.azurewebsites.net/api/v1/Store/search/${name}`, {
        method: 'GET',
        headers: {}
      })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) =>{
        reject(error);
      });
    });
  }

  static listStores(){
    return new Promise((resolve,reject)=>{
      fetch('http://api-vanhack-event-sp.azurewebsites.net/api/v1/Store', {
        method: 'GET',
        headers: {}
      })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);//list
      })
      .catch((error) =>{
        reject(error);
      });   
    }); 
  }

  static listCousine(){
    return new Promise((resolve,reject)=>{
      fetch('http://api-vanhack-event-sp.azurewebsites.net/api/v1/Cousine', {
        method: 'GET',
        headers: {}
      })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) =>{
        reject(error);
      });
    });
  }
  
}
