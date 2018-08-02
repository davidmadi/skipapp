import { Map } from 'immutable';

function initialState(){
  return {
    stores : [],
    store : null,
    cousines : [],
    cousine : null,
  }
}

export default function storesReducer(state = initialState(), action){
  let map = Map(state);

  if (action.type === "STORES_LIST") {
    map = map.set('stores', action.stores);
  }
  else if (action.type === "STORE_SELECT") {
    map = map.set('store', action.store);
  }
  else if (action.type === "COUSINES_LIST") {
    map = map.set('cousines', action.cousines);
  }
  else if (action.type === "COUSINE_SELECT") {
    refilter = true;
    map = map.set('cousine', action.cousine);
  }

  state = map.toObject();
  return state;
}