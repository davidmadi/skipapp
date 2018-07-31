import { Map } from 'immutable';

function initialState(){
  return {
    items : [],
    price : "0"
  }
}

export default function cartReducer(state = initialState(), action){
  let map = Map(state);

  if (action.type === "ADDPRODUCTCART"){
    const existentItem = state.items.filter(i => i.id === action.item.id);

    if (existentItem.length)
    {
      existentItem[0].quantity++;
    }
    else
    {
      action.item.quantity = 1;
      const newArray = state.items.concat([action.item]);
      state.items = newArray;
    }
    state.price = state.items.reduce(Math.sumProductReducer, 0);
  }
  
}


class Math{

  static sumProductReducer = function(prevValue, b){
    return prevValue + (b.price * b.quantity);
  }

}