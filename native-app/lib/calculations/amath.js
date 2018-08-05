
export default class AMath{

  static sumProductReducer = function(prevValue, b){
    return prevValue + (b.price * b.quantity);
  }

  static sumProductQuantityReducer = function(prevValue, b){
    return prevValue + (b.quantity);
  }

  static aRound = function(value){
    return Math.round(value * 100) / 100;
  }

}