
export default class Math{

  static sumProductReducer = function(prevValue, b){
    return prevValue + (b.price * b.quantity);
  }

}