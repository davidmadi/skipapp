import { Map } from 'immutable';

function initialState(){
  return {
    id : 0,
    email: null,
    name: null,
    address: null,
    creation: null,
    password: null,
    userToken : null,
  }
}

export default function customerReducer(state = initialState(), action){
  let map = Map(state);

  if (action.type == "USERUPDATE" && action.user && action.user.id)
  {
    state = action.user;
  }
  else if (action.type === "USERTOKEN")
  {
    state = map.set('userToken', action.userToken).toObject();
  }
  
}