//http://api-vanhack-event-sp.azurewebsites.net/swagger/
import AMath from './calculations/amath'
import ApiIntegration from './apiIntegration';
import { AsyncStorage } from "react-native";

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

  static OrdersKey(user){
    return "@skipapp_orders:" + user.email;
  }

  static createOrders(dispatch, _this){
    let orders = OrderLib.splitProductsInOrders(_this);
    ApiIntegration.persistOrders(orders)
    .then(newOrders =>{
      OrderLib.persistOrders(dispatch, newOrders, _this.props.user);
    });
  }

  static persistOrders(dispatch, orders, user){
    AsyncStorage.setItem(OrderLib.OrdersKey(user), JSON.stringify(orders))
    .then(()=>{
      OrderLib.dispatchers.ORDERS_ALL(dispatch, orders);
    })
  }

  static loadOrders(dispatch, _this){
    AsyncStorage.getItem(OrderLib.OrdersKey(_this.props.user))
    .then((strOrders)=>{
      let orders = JSON.parse(strOrders);
      if (orders && orders.length)
          OrderLib.dispatchers.ORDERS_ALL(dispatch, orders);
    })
  }

  static splitProductsInOrders(_this){
    let items = _this.props.items;
    let user = _this.props.user;
    let allStores = _this.props.stores;

    let storeIDs = [];
    items.map(i => {
      if (!storeIDs.find(s => s === i.storeId))
        storeIDs.push(i.storeId);
    });
    let orders = [];
    let orderId = 10;
    storeIDs.map(storeId => {
      let products = items.filter(i => i.storeId === storeId);
      let totalPrice = products.reduce(AMath.sumProductReducer, 0);
      let store = allStores.find(s => s.id === storeId)
      let storeName = (store) ? store.name : "";
      let order = OrderLib.newOrder(products, user, storeId, totalPrice, orderId++, storeName);
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
    OrderLib.dispatchers.ORDER_UPDATE(dispatch, newOrder);
    OrderLib.persistOrders(dispatch, _this.props.orders, _this.props.user);
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