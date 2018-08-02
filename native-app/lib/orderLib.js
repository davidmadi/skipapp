//http://api-vanhack-event-sp.azurewebsites.net/swagger/
import Math from './calculations/math'

export default class OrderLib {

  static dispatchers = {
    ORDERS_ALL : (dispatch, orders)=>{
      dispatch({
        type:'ORDERS_ALL',
        orders:orders
      });
    },
    ORDER_UPDATE :(dispatch, order)=>{
      dispatch({
        type:'ORDER_UPDATE',
        order:order
      });
    }
  }

  static createOrders(dispatch, _this){
    
    let orders = Order.splitProductsInOrders(_this);
    Cart.dispatchers.ORDERS_ALL(dispatch, orders);
  }

  static splitProductsInOrders(_this){
    let items = _this.items;
    let user = _this.user;
    let allStores = _this.stores;

    let storeIDs = [];
    items.map(i => {
      if (!storeIDs.find(s => s === i.storeId))
        storeIDs.push(i.storeId);
    });
    let orders = [];
    let orderId = 10;
    storeIDs.map(s => {
      let products = item.find(i => i.storeId === s.id);
      let totalPrice = products.reduce(Math.sumProductReducer, 0);
      let store = allStores.find(s => s.id === s.id)
      let storeName = (store) ? store.name : "";
      let order = Cart.newOrder(products, user, s.id, totalPrice, orderId++, storeName);
      orders.push(order);
    });

    return orders;
  }

  static refreshOrderStatus(dispatch, _this, order){
    if (!order.attempt){
      order.attempt = 0;
    }
    else {
      if (order.attempt === 2)
        order.status = "Received";
      else if (order.attempt === 4)
        order.status = "Delivering";
      else if (order.attempt === 6)
        order.status = "Delivered";
    }
    order.attempt++;

    let newOrder = {...order};
    Order.dispatchers.ORDER_UPDATE(dispatch, order);

  }

  static newOrder(items, user, storeid, totalPrice, orderId, storeName){
    return {
      id: orderId,
      date: Date(),
      customerId: user.id,//	integer($int64)
      deliveryAddress: user.address,//	string
      contact: user.name,//	string
      storeId: storeid,//	integer($int64)
      storeName : storeName,
      orderItems: items,//	[...]
      total: totalPrice,//	number($double)
      status: 'Pending',//	string
      lastUpdate: Date(),//	string($date-time)  
    }
  }

}