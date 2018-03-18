class BaseDAO{

  constructor(){
  }

  sendQueries(conn, queries=[], callback){

    conn.connect();
    try
    {
      conn.query('BEGIN', (err, res)=>{

        var i = -1;
        while(++i < queries.length)
        {
          const isLast = (i == queries.length-1);
          const command = queries[i];
          if (isLast)
            this.sendItemQuery(conn, command, callback);
          else
            this.sendItemQuery(conn, command);
        }
      });
    }
    catch(ex)
    {
      conn.end();
      callback(ex);
    }
  }

  sendItemQuery(conn, command, callback=null){
    
    conn.query(command.command, command.params,
      (err, res, command) => {
        if (callback)
        {
          if (err)
            conn.query('ROLLBACK');
          else
            conn.query('COMMIT');

          conn.end();
          callback(err, res);        
        }
    });
  }

  sendCommand(conn, command, callback=null){
    
    conn.connect();
    try
    {
      //if (!conn.connected)
      //{
      //  callback("Database not connected");
      //}
      //else
      {
        conn.query(command.command, command.params,
          (err, res, command) => {
            conn.end();
            if (callback)
            {
              callback(err, res);        
            }
        });
      }
    }
    catch(e)
    {
      if (conn.connected)
        conn.end();
      callback("Database not connected");
    }
  }
  
}

module.exports = function() {
  return BaseDAO;
};