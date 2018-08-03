import { combineReducers } from "redux";

import customerReducer from './customerReducer';
import orderReducer from './orderReducer';
import cartReducer from './cartReducer';
import productsReducer from './productsReducer';
import storesReducer from './storesReducer';

export default combineReducers({
  customerReducer: customerReducer,
  cartReducer:cartReducer,
  orderReducer : orderReducer,
  productsReducer :productsReducer,
  storesReducer : storesReducer,
});