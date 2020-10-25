const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Search meals via mealDB
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = '';

  // Get search term
  const term = search.value;
  // Check for empty search, run fetch if it isn't empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for ${term}: </h2>`;

        // Check for any meals with the search term
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>No search results. Try again.</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
          <div class="meal"> 
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" /> 
            
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div> 
          </div>`
              // Adding custom HTML5 attributes, start with `data-`.
              // We will need this custom attribute to get that specific meal's details
              // and line it up with the associated meal
            )
            .join(''); // Display this as a string.
        }
      });
    // Clear search text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // If there isn't an ingredient found, get out of the loop
      break;
    }
  }

  // Use ternary operators for data that may or may not be present.
  // Populate the data for the corresponding meal.
  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  </div>`;
}

// Event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

// Retrieve the meal's unique ID when it is clicked
mealsEl.addEventListener('click', (e) => {
  // .find() returns the first matching child element
  // This used to be e.path.find() but I couldn't find `.path` in the docs,
  // so I changed it to `.composedPath()`
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  console.log(mealInfo);
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
