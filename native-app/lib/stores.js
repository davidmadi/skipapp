import ApiIntegration from './apiIntegration';
//http://api-vanhack-event-sp.azurewebsites.net/swagger/

export default class Stores
{
  static dispatchers = {
    STORES_LIST : (dispatch, storesList)=>{
      dispatch({
        type:'STORES_LIST',
        storesList:stores
      });
    },
    STORE_SELECT :(dispatch, store)=>{
      dispatch({
        type:'STORE_SELECT',
        store:store
      });
    },
  }

  static searchStores(dispatch, _this, name){
    return new Promise((resolve, reject)=>{
      ApiIntegration.searchStores(name)
      .then((response)=>{
        _this.setState({
          loading:false
        });
        if (response.stores){
          Stores.dispatchers.STORES_LIST(dispatch, response.stores);
          resolve(response.stores);
        }
        else
        {
          reject(response);
        }
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

  static listStores(dispatch, _this){
    return new Promise((resolve, reject)=>{
      ApiIntegration.listStores()
      .then((stores) =>{
        Stores.dispatchers.STORES_LIST(dispatch, stores);
        resolve(stores);
      })
      .catch((error) =>{
        reject(error);
      });

    });
  }

  static selectStore(dispatch, _this, store){
    Stores.dispatchers.STORE_SELECT(dispatch, store);
    _this.props.navigation.navigate("products");
  }

}