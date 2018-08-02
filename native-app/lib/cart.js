import ApiIntegration from './apiIntegration';
//http://api-vanhack-event-sp.azurewebsites.net/swagger/

export default class Cart {

  static dispatchers = {
    CART_ADD : (dispatch, item)=>{
      dispatch({
        type:'CART_ADD',
        item:item
      });
    }
  }

  static addItem(dispatch, _this, product){
    Cart.dispatchers.CART_ADD(dispatch, product);
  }

}