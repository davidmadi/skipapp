const BaseDAO = require('../baseDAO')();
const DBFactory = global.rootRequire('app/infra/db/DBFactory')();

class SubItemDAO extends BaseDAO {

  constructor()
  {
    super();
  }

  save(subitem, callback) {
    
    try
    {
      const conn = DBFactory.prototype.create();

      const upsertCommand = this.getUpsertCommand(subitem);
      const selectCommand = this.getSelectCommand(subitem);

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

  getUpsertCommand(subitem){
    if(subitem.id > 0)
    {
      return {
        command:"update subitems set itemid=$4::integer, description=$2::text, name=$3::text where id=$1::integer;",
        params:[subitem.id, subitem.description, subitem.name, subitem.itemid]
      };
    }
    else
    {
      return {
        command:"insert into subitems (itemid, name, description) values($1::integer,$2::text,$3::text);",
        params:[subitem.itemid, subitem.name, subitem.description]
      };
    }
  }

  getSelectCommand(subitem){
    if(subitem.id > 0)
    {
      return {
        command:"SELECT * from subitems where id=$1::integer;",
        params:[subitem.id]
      };
    }
    
    return {
      command : "SELECT * from subitems where id in (select max(id) from subitems);"
    };
  
  }

  loadList(itemId, callback){
    try
    {
      const conn = DBFactory.prototype.create();
      const selectCommand = {command:"select * from subitems where itemid=$1::integer;", params:[itemId]};
      this.sendCommand(conn, selectCommand, callback);
    }
    catch(ex){
      callback(ex, {});
    }
  }
  

}

module.exports = function() {
  return SubItemDAO;
};