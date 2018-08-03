import { Map } from 'immutable';

function initialState(){
  return {
    allProducts : [],
    productsList : [],
  }
}

export default function productsReducer(state = initialState(), action){
  let map = Map(state);
  let refilter = false;

  if (action.type === "PRODUCTS_LIST") {
    map = map.set('allProducts', action.productsList).set('productsList', action.productsList);
  }

  //if (refilter) {
  //  let filteredProducts = state.allProducts.filter(f => f.storeId === state.storeId);
  //  map = map.set('productsList', filteredProducts);
  //}

  state = map.toObject();
  return state;
}