import { combineReducers } from "react-redux";

import customerReducer from './customerReducer';
import orderReducer from './orderReducer';
import cartReducer from './cartReducer';
import productsReducer from './productsReducer';

export default combineReducers({
  customerReducer: customerReducer,
  cartReducer:cartReducer,
  ordeReducer : orderReducer,
  productsReducer :productsReducer,
});