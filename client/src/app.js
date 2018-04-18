const FoodView = require('./views/foodView');
const Request = require('./services/request.js');

const foodView = new FoodView();
const request = new Request('http://localhost:3000/api/foods');

const getFoodsRequestComplete = function(allFoods){
  allFoods.forEach(function(food){
    foodView.addFood(food);
  })
};

const appStart = function(){
  request.get(getFoodsRequestComplete);
}

document.addEventListener('DOMContentLoaded', appStart);
