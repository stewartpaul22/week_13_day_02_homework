var FoodView = function(){
  this.foods = [];
}

FoodView.prototype.addFood = function(food) {
  this.foods.push(food);
  this.render(food);
}

FoodView.prototype.clear = function(food) {
  this.foods = [];
  const ul = document.querySelector('#foods');
  ul.innerHTML = '';
}

FoodView.prototype.render = function(food){
    const ul = document.querySelector('#foods');
    const li = document.createElement('li');
    const text = document.createElement('p');
    text.innerText = `${food.name} - "${food.food}"`;
    li.appendChild(text);
    ul.appendChild(li);
}

 module.exports = FoodView;
