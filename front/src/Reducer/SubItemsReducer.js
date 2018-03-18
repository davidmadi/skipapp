export default function itemsReducer(state=[], action){
  if (action.type === "FIRSTLISTITEMS")
  {
    return action.listsubitems;
  }
  else if (action.type === "ITEMCHANGE"){
    const allWithoutIt = state.filter(i => i.id !== action.subitem.id);
    const newArray = allWithoutIt.concat([action.subitem]);
    return newArray;
  }

  return state;
}