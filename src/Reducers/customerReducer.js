import { Map } from 'immutable';

function initialState(){
  return {
    user : {
      id : 0,
      email: null,
      name: null,
      address: null,
      creation: null,
      password: null,
      userToken : null,
    }
  }
}

export default function customerReducer(state = initialState(), action){
  let map = Map(state);

  if (action.type == "USERUPDATE" && action.user && action.user.id)
  {
    map = map.set('user', action.user);
    state = action.user;
  }
  else if (action.type === "USERTOKEN")
  {
    let mapU = Map(state.user);
    mapU = mapU.set('userToken', action.userToken);
    map = map.set('user', mapU.toObject());
  }

  state = map.toObject();
  return state;
}