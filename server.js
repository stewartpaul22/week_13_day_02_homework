const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if(err){
    console.log(err);
    return;
  }

  const db = client.db("favourite_foods");

  console.log('Connected to database');

  // create route
  server.post('/api/foods', function(req, res){
    const foodsCollection = db.collection('favouriteFoods');
    const foodToSave = req.body;
    foodsCollection.save(foodToSave, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      console.log('saved to database');
      res.status(201);
      res.json(foodToSave);
    });
  });

  server.get('/api/foods', function(req, res){
    const foodsCollection = db.collection('favouriteFoods');
    foodsCollection.find().toArray(function(err, allFoods){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(allFoods);
    });
  });

  server.delete('/api/foods', function(req, res){
    const foodsCollection = db.collection('favouriteFoods');
    const filterObject = {};
    foodsCollection.deleteMany(filterObject, function(err, result){
      if(err){
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });


  server.listen(3000, function(){
    console.log("Listening on port 3000");
  });
})
