export default function itemsReducer(state=[], action){
  if (action.type === "FIRSTLISTITEMS")
  {
    return action.itemsList;
  }
  else if (action.type === "ITEMCHANGE"){
    const allWithoutIt = state.filter(i => i.id !== action.item.id);
    const newArray = allWithoutIt.concat([action.item]);
    return newArray;
  }

  return state;
}