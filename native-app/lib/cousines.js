import apiIntegration from './apiIntegration';
//http://api-vanhack-event-sp.azurewebsites.net/swagger/

export default class Cousines {

  static dispatchers = {
    COUSINES_LIST : (dispatch, cousineList)=>{
      dispatch({
        type:'COUSINES_LIST',
        cousineList:cousineList
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
      apiIntegration.listCousine()
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

  static selecCousine(dispatch, cousine){
    Cousines.dispatchers.selecCousine(dispatch, cousine);
  }

}