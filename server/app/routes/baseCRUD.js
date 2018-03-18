
class BaseCRUD
{
  responseQuery(httpReq, httpRes, err, result){
    if (result && result.rows)
      httpRes.json(result.rows);
    else
      httpRes.json({errors : err, result:result});
  }

  socketEmit(name, app, result){
    const io = app.get('io');
    if (io)
      io.emit(name, result);
  }

}


module.exports = function(){return BaseCRUD;};