import { Map } from 'immutable';

function initialState(){
  return {
    orders : [],
  }
}

/*
id: 0,
date: null,
customerId: null,//	integer($int64)
deliveryAddress: null,//	string
contact: null,//	string
storeId: null,//	integer($int64)
orderItems: null,//	[...]
total: null,//	number($double)
status: null,//	string
lastUpdate: null,//	string($date-time)
*/

export default function orderReducer(state = initialState(), action){
  let map = Map(state);

  if (action.type === "ORDER_NEW"){
    let newArray = state.orders.concat([action.order]);
    map = map.set('orders', newArray);
  }
  else if (action.type === "ORDERS_ALL"){
    map = map.set('orders', action.orders);
  }
  else if (action.type === "ORDER_UPDATE"){
    let newArray = state.orders.concat();
    let idxOrder = newArray.findIndex(o => o.id === action.order.id);
    newArray[idxOrder] = action.order;

    map = map.set('orders', newArray);
  }
  

  state = map.toObject();
  return state;
}
