import { Map } from 'immutable';
import Math from '../../lib/calculations/math';

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
    recalculate = true;
    const idxItem = state.items.findIndex(i => i.id === action.product.id);
    if (idxItem > -1) {
      state.items[idxItem].quantity++;
      state.items[idxItem] = {...state.items[idxItem]};
      let newArray = state.items.concat([]);
      map = map.set('items', newArray);
    }
    else {
      action.product.quantity = 1;
      let newArray = state.items.concat([action.product]);
      map = map.set('items', newArray);
    }
  }

  if (recalculate){
    let newPrice = map.get('items').reduce(Math.sumProductReducer, 0);
    map = map.set('price', newPrice);
  }

  state = map.toObject();
  return state;
}

