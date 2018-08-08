
export default class Mocks{

  static persistUser(body){
    let newUser = {...body};
    newUser.id = 30;
    return newUser;
  }

  static authenticate(body){
    if (body.email === 'davidmadi@gmail.com' && body.password ==='Aa,12345'){
      return {
        id	:20,
        email:	'davidmadi@gmail.com',
        name:	'David Madi',
        address:	null,
        creation:	null,
        password:	'Aa,13245'
      }
    }
    else if (body.email === 'admin@gmail.com' && body.password ==='1234'){
      return {
        id	:20,
        email:	'admin@gmail.com',
        name:	'Admin User',
        address:	null,
        creation:	null,
        password:	'1234'
      }
    }
    else
    {
      return {
        message:'User not authenticated'
      }
    }
  }

  static listProducts(){
    return [
      {
        id:1,
        storeName: 'Chinese House',
        storeId:1,
        name: 'Yakissoba traditional',
        description:'Just yakissoba of traditional japenese dish',
        price: 15.99
      },
      {
        id:2,
        storeId:1,
        storeName: 'Chinese House',
        name: 'Yakissoba veggie',
        description:'Yakissoba no meat of traditional japenese dish',
        price: 13.99
      },
      {
        id:3,
        storeId:1,
        storeName: 'Chinese House',
        name: 'Yakissoba meat',
        description:'Yakissoba only meat of traditional japenese dish',
        price: 14.99
      },
      {
        id:4,
        storeId:2,
        storeName: 'Mexican food emporio',
        name: 'Tacos full',
        description:'Full tacos of the mexican house',
        price: 9.99
      },
      {
        id:5,
        storeId:2,
        storeName: 'Mexican food emporio',
        name: 'Burritos',
        description:'Plate of burritos with eggs',
        price: 6.99
      },
      {
        id:6,
        storeId:2,
        storeName: 'Mexican food emporio',
        name: 'Enchilada',
        description:'Sometimes I want the whole enchilada',
        price: 5.99
      },
      {
        id:7,
        storeId:3,
        storeName: 'Brazil and You',
        name: 'Feijoada',
        description:'Traditional brazilian rice and beans food',
        price: 19.99
      },
      {
        id:8,
        storeId:3,
        storeName: 'Brazil and You',
        name: 'Feijão tropeiro',
        description:'Traditional brazilian beans in crumbs',
        price: 17.99
      },
      {
        id:9,
        storeId:3,
        storeName: 'Brazil and You',
        name: 'Pao de queijo',
        description:'Traditional brazilian cheese snack',
        price: 2.99
      }
    ];
  }

  
  static listStores(){
    return [
      {
        id:1,
        name: 'Chinese House',
        cousineId: 10,
        description:'Great chinese dish every day!',
      },
      {
        id:2,
        name: 'Mexican food emporio',
        cousineId: 20,
        description:'Mexican food, snacks and dishes',
      },
      {
        id:3,
        name: 'Brazil and You',
        cousineId: 30,
        description:'Traditional brazilian food made with love',
      },
    ];
  }

  static listCousines(){
    return [
      {
        id:10,
        name: 'Chinese Food',
      },
      {
        id:20,
        name: 'Mexican food',
      },
      {
        id:30,
        name: 'Brazilian Food',
      },
    ];
  }

  static persistOrders(orders){
    let newOrders = [];
    for(var i = 0; i < orders.length; i++){
      let newOrder = {...orders[i]};
      newOrder.id = i + 10;
      newOrders.push(newOrder);
    }
    return newOrders;
  }

}