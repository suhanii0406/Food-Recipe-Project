const searchbox = document.querySelector(".searchbox");
const btn = document.querySelector(".btn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeclosebtn = document.querySelector(".recipeclosebtn");
const recipecontent = document.querySelector(".recipe-content");
const fetchrecipes = async (query) => {
  recipeContainer.innerHTML = "fetching recipes....";
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();
//   console.log(response.meals);
  recipeContainer.innerHTML = "";
  response.meals.forEach((meal) => {
    const recipediv = document.createElement("div");
    recipediv.classList.add("recipe");
    recipediv.innerHTML = `
       <img src="${meal.strMealThumb}">
       <h3>${meal.strMeal}</h3>
       <p><span>${meal.strArea}</span> Dish</p>
       <p>Belongs to <span> ${meal.strCategory}</span> Category</p>
       `;
    const recipebutton = document.createElement("button");
    recipebutton.innerHTML = "View Recipe";
    recipediv.appendChild(recipebutton);

    recipebutton.addEventListener("click", () => {
    openrecipe(meal);
    // console.log("recipebtnclicked");
  });
    recipeContainer.appendChild(recipediv);
  });
  
  //adding event listener on ivew recipe//
  
};
const fetchingredients = (meal)=>{
    let ingredientlist ="";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        console.log(ingredient);
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientlist+=`<li>${measure} of ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientlist;
}
const openrecipe = (meal) => {
  recipecontent.innerHTML = `
      <h2 class="recipename">${meal.strMeal}</h2>
      <h3>Ingredients:</h3>
      <ul class="inglist">${fetchingredients(meal)}</ul>
      <div class="mealinstruct">
      <h3>Instructions:</h3>
      <p >${meal.strInstructions}</p>
      </div>
    `
    recipecontent.parentElement.style.display = "block";
  //   console.log("function called");
};

recipeclosebtn.addEventListener("click",()=>{
    recipecontent.parentElement.style.display = "none";
 });

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchinput = searchbox.value.trim();
  if(!searchinput){
    recipeContainer.innerHTML=`<h2>Enter meal to search....</h2>`
  }
  else{
    fetchrecipes(searchinput);
  }
});

