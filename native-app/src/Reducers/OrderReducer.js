export default function orderReducer(state={}, action){
  if (action.type === "@@redux/INIT")
  {
    state = {
      productsList : [], 
      cart : {
        items : [],
        price : "0"
      },
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
      storeId : 0,
      allProducts : []
    };
  }
  else if (action.type === "STOREID"){
    state.storeId = action.storeId;
    state.productsList = state.allProducts.filter(f => f.storeId === action.storeId);
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
    state.allProducts = action.productsList;
    if (state.storeId !== 0)
      state.productsList = state.allProducts.filter(f => f.storeId === state.storeId);
    else
      state.productsList = state.allProducts.filter(f => f.storeId !== 0);
    
  }
  else if (action.type === "ADDPRODUCTCART"){
    const existentItem = state.cart.items.filter(i => i.id === action.item.id);

    if (existentItem.length)
      existentItem[0].quantity++;
    else
    {
      action.item.quantity = 1;
      const newArray = state.cart.items.concat([action.item]);
      state.cart.items = newArray;
    }
    state.cart.price = state.cart.items.reduce(Math.sumProductReducer, 0);
  }
  else if (action.type === "NEWORDER"){

    const allWithoutIt = state.cart.items.filter(i => i.id !== action.item.id);
    const newArray = allWithoutIt.concat([action.item]);
    state.state.cart = newArray;
  }

  return state;
}

class Math{

  static sumProductReducer = function(prevValue, b){
    return prevValue + (b.price * b.quantity);
  }

}