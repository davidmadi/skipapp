var express = require('../config/express')();
var supertest = require('supertest')(express);
const assert = require('assert');
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('postgresql');
const DBFactory = global.rootRequire('app/infra/db/dbFactory')();

var mainItem = {
  'id' : null,
  'name':'david madi',
  'description' : 'description of david'
};
var subItem = {
  'id' : null,
  'iditem' : 0,
  'name':'subitem name',
  'description' : 'subitem description of david'
};


describe('#Item', function(){

  it('#CleanDB',function(done){    

    const conn = DBFactory.prototype.create();
    conn.connect();
      
    databaseCleaner.clean(conn, (err) => {
      conn.end();
      assert((err == null));
      done(err);
    });
    console.log("database cleaned successfully");
  });
    

  it('#Create',function(done){    

    supertest.post('/item/create')
    .set('Accept','application/json')
    .type('form')
    .send({'description': mainItem.description, 'name':mainItem.name})
    .expect('Content-Type',/application\/json/)
    .expect(200)
    .end(function(err, res){
      
      var result = JSON.parse(res.text);
      if (result.errors)
      {
        console.log(result.errors);
        assert(result.errors.length == 0, result.errors[0].msg);
      }
      else
      {
        assert(result.length > 0, "Id deve ser maior que zero");
        assert(result[0].id > 0, "Id deve ser maior que zero");
        mainItem = result[0];
      }

      done();
    });
  });

  it('#Change',function(done){    

    supertest.post('/item/change')
    .set('Accept','application/json')
    .type('form')
    .send({'id':mainItem.id, 'description': mainItem.description, 'name':mainItem.name})
    .expect('Content-Type',/application\/json/)
    .expect(200)
    .end(function(err, res){
      
      var result = JSON.parse(res.text);
      if (result.errors)
      {
        console.log(result.errors);
        assert(result.errors.length == 0, result.errors[0].msg);
      }
      else
      {
        assert(result.length > 0, "Id deve ser maior que zero");
        assert(result[0].id > 0, "Id deve ser maior que zero");
      }

      done();
    });
  }); 

  it('#LoadItemList',function(done){    

    supertest.post('/item/loadlist')
    .set('Accept','application/json')
    .type('form')
    .send({})
    .expect('Content-Type',/application\/json/)
    .expect(200)
    .end(function(err, res){
      
      var result = JSON.parse(res.text);
      if (result.errors)
      {
        console.log(result.errors);
        assert(result.errors.length == 0, result.errors[0].msg);
      }
      else
      {
        assert(result.length > 0, "Id deve ser maior que zero");
        assert(result[0].id > 0, "Id deve ser maior que zero");
      }

      done();
    });
  }); 

  
  it('#Create SubItem',function(done){    

    supertest.post('/subitem/create')
    .set('Accept','application/json')
    .type('form')
    .send({'itemid':mainItem.id, 'description': subItem.description, 'name':subItem.name})
    .expect('Content-Type',/application\/json/)
    .expect(200)
    .end(function(err, res){
      
      var result = JSON.parse(res.text);
      if (result.errors)
      {
        console.log(result.errors);
        assert(result.errors.length == 0, result.errors[0].msg);
      }
      else
      {
        assert(result.length > 0, "Id deve ser maior que zero");
        assert(result[0].id > 0, "Id deve ser maior que zero");
        subItem = result[0];
      }

      done();
    });
  }); 


  it('#Change SubItem',function(done){    
    assert(subItem.id > 0);
    subItem.description = subItem.description+'changed';

    supertest.post('/subitem/change')
    .set('Accept','application/json')
    .type('form')
    .send(subItem)
    .expect('Content-Type',/application\/json/)
    .expect(200)
    .end(function(err, res){
      
      var result = JSON.parse(res.text);
      if (result.errors)
      {
        console.log(result.errors);
        assert(result.errors.length == 0, result.errors[0].msg);
      }
      else
      {
        assert(result.length > 0, "Id deve ser maior que zero");
        assert(result[0].id > 0, "Id deve ser maior que zero");
      }

      done();
    });
  });   

  it('#LoadSubItemList',function(done){    

    supertest.post('/subitem/loadlist')
    .set('Accept','application/json')
    .type('form')
    .send(mainItem)
    .expect('Content-Type',/application\/json/)
    .expect(200)
    .end(function(err, res){
      
      var result = JSON.parse(res.text);
      if (result.errors)
      {
        console.log(result.errors);
        assert(result.errors.length == 0, result.errors[0].msg);
      }
      else
      {
        assert(result.length > 0, "Id deve ser maior que zero");
        assert(result[0].id > 0, "Id deve ser maior que zero");
      }

      done();
    });
  }); 


});