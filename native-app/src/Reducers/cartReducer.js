import { Map } from 'immutable';

function initialState(){
  return {
    items : [],
    price : 0
  }
}

export default function cartReducer(state = initialState(), action){
  let map = Map(state);
  let recalculate = false;

  if (action.type === "CART_ADD"){
    const existentItem = state.items.filter(i => i.id === action.item.id);
    if (existentItem.length) {
      existentItem[0].quantity++;
    }
    else {
      action.item.quantity = 1;
      const newArray = state.items.concat([action.item]);
      map = map.set('items', newArray);
    }
  }

  if (recalculate){
    let newPrice = newArray.reduce(Math.sumProductReducer, 0);
    map = map.set('price', newPrice);
  }

  state = map.toObject();
  return state;
}


class Math{

  static sumProductReducer = function(prevValue, b){
    return prevValue + (b.price * b.quantity);
  }

}