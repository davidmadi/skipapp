import { Map } from 'immutable';

function initialState(){
  return {
    cousinesList : [],
    cousine : null,
  }
}

export default function cousinesReducer(state = initialState(), action){
  let map = Map(state);

  if (action.type === "COUSINES_LIST") {
    refilter = true;
    map = map.set('cousinesList', action.cousinesList);
  }else if (action.type === "COUSINE_SELECT") {
    refilter = true;
    map = map.set('cousine', action.cousine);
  }

  state = map.toObject();
  return state;
}