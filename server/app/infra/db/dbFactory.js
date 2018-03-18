const conString = "postgres://root:hagadol23@localhost:5432/root";
//const conStringTest = "postgres://root:hagadol23@localhost/root_test";
const { Client } = require('pg')

class DBFactory
{
  constructor(){}
}

DBFactory.prototype.create = function(){
  const client = new Client({
    connectionString: DBFactory.prototype.getConnString()
  })
  return client;
}

DBFactory.prototype.getConnString = function()
{
  //if (process.env.NODE_ENV == 'test')
  //{
  //  return conStringTest;
  //}
  //else
  //{
    return conString;
  //}      
}

module.exports = function() {
  return DBFactory;
}
