import { Map } from 'immutable';

function initialState(){
  return {
    items : [],
    price : 0
  }
}

export default function cartReducer(state = initialState(), action){
  let map = Map(state);

  if (action.type === "CART_ADD"){
    const existentItem = state.items.filter(i => i.id === action.item.id);

    if (existentItem.length)
    {
      existentItem[0].quantity++;
    }
    else
    {
      action.item.quantity = 1;
      const newArray = state.items.concat([action.item]);
      let newPrice = newArray.reduce(Math.sumProductReducer, 0);
      state = map.set('items', newArray).set('price', newPrice).toObject();
    }
  }
  return state;
}


class Math{

  static sumProductReducer = function(prevValue, b){
    return prevValue + (b.price * b.quantity);
  }

}