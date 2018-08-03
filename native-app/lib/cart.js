import ApiIntegration from './apiIntegration';
//http://api-vanhack-event-sp.azurewebsites.net/swagger/

export default class Cart {

  static dispatchers = {
    CART_ADD : (dispatch, product)=>{
      dispatch({
        type:'CART_ADD',
        product:product
      });
    }
  }

  static addItem(dispatch, _this, product){
    Cart.dispatchers.CART_ADD(dispatch, product);
  }

}