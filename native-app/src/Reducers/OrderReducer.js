import { Map } from 'immutable';

function initialState(){
  return {
    id: 0,
    date: null,
    items: [],
    total: 0,
    status: "",
    lastUpdate: null
  }
}

export default function orderReducer(state = initialState(), action){
  let map = Map(state);

  if (action.type === "NEWORDER"){
    state = action.order;
  }

  return state;
}
