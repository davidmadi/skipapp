import { Map } from 'immutable';

function initialState(){
  return {
    allProducts : [],
    productsList : [],
    storeId : 0,
  }
}

export default function productsReducer(state = initialState(), action){
  let map = Map(state);
  let refilter = false;

  if (action.type === "STOREID") {
    refilter = true;
    state = map.set('storeId', action.storeId).toObject();
  }
  else if (action.type === "LISTPRODUCTS") {
    refilter = true;
    state = map.set('allProducts', action.productsList).toObject();
  }

  if (refilter) {
    let filteredProducts = state.allProducts.filter(f => f.storeId === state.storeId);
    state = map.set('productsList', filteredProducts).toObject();
  }
  
}