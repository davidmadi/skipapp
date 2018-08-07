import ApiIntegration from './apiIntegration';
//http://api-vanhack-event-sp.azurewebsites.net/swagger/

export default class Products {

  static dispatchers = {
    PRODUCTS_LIST : (dispatch, productsList)=>{
      dispatch({
        type:'PRODUCTS_LIST',
        productsList:productsList
      });
    }
  }

  static listProducts(dispatch, _this){
    return new Promise((resolve, reject)=>{
      ApiIntegration.listProducts()
      .then((productsList)=>{
        Products.dispatchers.PRODUCTS_LIST(dispatch, productsList);
        _this.setState({
          loading:false
        });
        resolve(productsList);
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