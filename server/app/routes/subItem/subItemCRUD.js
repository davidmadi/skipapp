const dbFac = global.rootRequire('app/infra/db/dbFactory');
const { check, validationResult } = require('express-validator/check');
const SubItemDAO = global.rootRequire('app/infra/subItem/subItemDAO')();
const BaseCRUD = global.rootRequire('app/routes/baseCRUD')();

const util = require('util');

function SubItemCRUD(app)
{
  app.get("/create", function(req, res){
    console.log("david");
    res.json({david:1});
  });

  app.post("/subitem/create", function(req, res){
    var subItemDAO = new SubItemDAO();
    subItemDAO.save(req.body, function(err, result){
      if (err)
        res.json({errors:[{msg: err.message}]});
      else  
        res.json(result.rows);
    });
  });

  app.post("/subitem/change", function(req, res){
    var subItemDAO = new SubItemDAO();
    subItemDAO.save(req.body, function(err, result){
      if (err)
        res.json({errors:[{msg: err.message}]});
      else{        
        res.json(result.rows);
        const baseCRUD = new BaseCRUD();
        baseCRUD.socketEmit('item-'+result.rows[0].itemId+'-subitems', app, result.rows);
      }
    });
  });

  app.post("/subitem/load", function(req, res){
    var subItemDAO = new SubItemDAO();
    subItemDAO.load(req.query.id, function(error, result){
      const baseCRUD = new BaseCRUD();
      baseCRUD.responseQuery(req, res, error, result);
    })
  });

  app.post("/subitem/loadlist", function(req, res){
    var subItemDAO = new SubItemDAO();
    subItemDAO.loadList(req.body.id, function(error, result){
      const baseCRUD = new BaseCRUD();
      baseCRUD.responseQuery(req, res, error, result);
    })
  });
  
}

module.exports = SubItemCRUD;
