export default function orderReducer(state={}, action){
  if (action.type === "@@redux/INIT")
  {
    state = {productsList : [], itemsCart : [], 
      storesList : [],
      order:{
        id: 0,
        date: null,
        customerId: 0,
        deliveryAddress: "",
        contact: "",
        storeId: 0,
        orderItems: [],
        total: 0,
        status: "",
        lastUpdate: null
      },
      userToken : "",
      storeId : 0
    };
  }
  else if (action.type === "STOREID"){
    state.storeId = action.storeId;
  }
  else if (action.type === "STORES"){
    state.storesList = action.storesList;
  }
  else if (action.type === "USERTOKEN")
  {
    state.userToken = action.userToken;
  }
  else if (action.type === "LISTPRODUCTS")
  {
    if (state.storeId){
      state.productsList = action.productsList.filter(f => f.storeId === state.storeId);
    }
    else
      state.productsList = action.productsList;    
  }
  else if (action.type === "ADDPRODUCTCART"){

    const allWithoutIt = state.itemsCart.filter(i => i.id !== action.item.id);
    const newArray = allWithoutIt.concat([action.item]);
    state.itemsCart = newArray;
  }
  else if (action.type === "NEWORDER"){

    const allWithoutIt = state.itemsCart.filter(i => i.id !== action.item.id);
    const newArray = allWithoutIt.concat([action.item]);
    state.itemsCart = newArray;
  }

  return state;
}