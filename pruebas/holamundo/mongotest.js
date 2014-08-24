
var mongodb = require('mongodb');

var server = new mongodb.Server("127.0.0.1", 27017, {});
 
var dbTest = new mongodb.Db('TestDB', server, {});

dbTest.open(function (error, client) {
  if (error) throw error;
 
  var collection = new mongodb.Collection(client, 'personas');

  collection.find({'nombre': 'pepe'}).toArray(function(err, docs) {

    console.dir(docs);
  });
});
