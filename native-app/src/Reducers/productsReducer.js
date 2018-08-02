import { Map } from 'immutable';

function initialState(){
  return {
    allProducts : [],
    productsList : []
  }
}

export default function productsReducer(state = initialState(), action){
  let map = Map(state);
  let refilter = false;

  if (action.type === "PRODUCTS_LIST") {
    refilter = true;
    state = map.set('allProducts', action.productsList).toObject();
  }

  if (refilter) {
    let filteredProducts = state.allProducts.filter(f => f.storeId === state.storeId);
    state = map.set('productsList', filteredProducts).toObject();
  }
  return state;
}