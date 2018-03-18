export default function orderReducer(state={}, action){
  if (action.type === "@@redux/INIT")
  {
    state = {productsList : [], itemsCart : []};
  }
  else if (action.type === "LISTPRODUCTS")
  {
    state.productsList = action.productsList;
  }
  else if (action.type === "ADDPRODUCTCART"){

    const allWithoutIt = state.itemsCart.filter(i => i.id !== action.item.id);
    const newArray = allWithoutIt.concat([action.item]);
    state.itemsCart = newArray;
  }

  return state;
}