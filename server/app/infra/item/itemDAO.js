const BaseDAO = require('../baseDAO')();
const DBFactory = global.rootRequire('app/infra/db/DBFactory')();

class ItemDAO extends BaseDAO {

  constructor()
  {
    super();
  }

  save(item, callback) {
    
    try
    {
      const conn = DBFactory.prototype.create();

      const upsertCommand = this.getUpsertCommand(item);
      const selectCommand = this.getSelectCommand(item);

      this.sendQueries(
        conn, 
        [
          upsertCommand,
          selectCommand
        ],
        callback
      );
    }
    catch(ex){
      callback(ex, {});
    }
  }

  getUpsertCommand(account){
    if(account.id > 0)
    {
      return {
        command:"update items set description=$2::text, name=$3::text where id=$1::integer;",
        params:[account.id, account.description, account.name]
      };
    }
    else
    {
      return {
        command:"insert into items (name, description) values($1::text,$2::text);",
        params:[account.name, account.description]
      };
    }
  }

  getSelectCommand(account){
    if(account.id > 0)
    {
      return {
        command:"SELECT id, name, description from items where id=$1::integer;",
        params:[account.id]
      };
    }
    
    return {
      command : "SELECT id, name, description from items where id in (select max(id) from items);"
    };
  
  }

  loadList(item, callback){
    try
    {
      const conn = DBFactory.prototype.create();
      const selectCommand = {command:"select * from items;", params:[]};
      this.sendCommand(conn, selectCommand, callback);
    }
    catch(ex){
      callback(ex, {});
    }
  }

}

module.exports = function() {
  return ItemDAO;
};