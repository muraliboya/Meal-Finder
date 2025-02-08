export async function cardClickingCategory() {
    let selectedItem = document.getElementById("selected-item");
    let categoriesMain = document.getElementById("categories-main");
    let title = document.getElementById('title');
    let description = document.getElementById('description');

    let meals = document.getElementById('meals');
    console.log(meals);

    categoriesMain.style.display = "none"; // Hide categories
    selectedItem.style.display = "block"; // Show selected item


    title.innerHTML = `${this.dataset.category}`
    description.innerHTML = `${this.dataset.description}`

    try {
        // here am getting cors with mobiel network so am using below api link
        let response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.dataset.category}`)}`);
        let data = await response.json();
        console.log(data);
        if (!data.meals) {
            console.log("No meals found for this category.");
            mealsContainer.innerHTML = "<p>No meals found.</p>";
            return;
        }
        meals.innerHTML = `
        <div class="row row-cols-1 row-cols-md-5 g-4">
            ${data.meals
                .map(
                    (mealsitem) => `
                    <div class="col">
                        <div class="card">
                            <img src="${mealsitem.strMealThumb}" class="card-img-top" alt="${mealsitem.strMeal}" />
                            <div class="card-body">
                                <p class="card-text">${mealsitem.strMeal}</p>
                            </div>
                        </div>
                    </div>`
                )
                .join("")}
        </div>
    `;
     

    



    } catch (err) {
        console.log("error in fetching meals using category name : " + err);
    }


}