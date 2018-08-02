import { Map } from 'immutable';

function initialState(){
  return {
    stores : [],
    store : null,
  }
}

export default function storesReducer(state = initialState(), action){
  let map = Map(state);

  if (action.type === "STORES_LIST") {
    state = map.set('stores', action.stores).toObject();
  } else if (action.type === "STORE_SELECT") {
    state = map.set('store', action.store).toObject();
  }

  return state;
}