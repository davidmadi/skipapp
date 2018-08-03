import ApiIntegration from './apiIntegration';
//http://api-vanhack-event-sp.azurewebsites.net/swagger/

export default class Cousines {

  static dispatchers = {
    COUSINES_LIST : (dispatch, cousines)=>{
      dispatch({
        type:'COUSINES_LIST',
        cousines:cousines
      });
    },
    COUSINE_SELECT: (dispatch, cousine)=>{
      dispatch({
        type:'COUSINE_SELECT',
        cousine:cousine
      });
    },
  }

  static listCousine(dispatch, _this){
    return new Promise((resolve, reject)=>{
      ApiIntegration.listCousine()
      .then((cousineList)=>{
        Cousines.dispatchers.COUSINES_LIST(dispatch, cousineList);
        _this.setState({
          loading:false
        });
        resolve(cousineList);
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

  static cousineSelect(dispatch, cousine){
    Cousines.dispatchers.COUSINE_SELECT(dispatch, cousine);
  }

}