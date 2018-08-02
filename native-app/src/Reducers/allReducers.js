import { combineReducers } from "redux";

import customerReducer from './customerReducer';
import orderReducer from './orderReducer';
import cartReducer from './cartReducer';
import productsReducer from './productsReducer';
import storesReducer from './storesReducer';
import cousinesReducer from './cousinesReducer';

export default combineReducers({
  customerReducer: customerReducer,
  cartReducer:cartReducer,
  ordeReducer : orderReducer,
  productsReducer :productsReducer,
  storesReducer : storesReducer,
  cousinesReducer: cousinesReducer,
});