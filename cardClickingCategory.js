export async function cardClickingCategory(event,menuObject) {
    let selectedItem = document.getElementById("selected-item");
    let categoriesMain = document.getElementById("categories-main");
    let title = document.getElementById('title');
    let description = document.getElementById('description');

    let meals = document.getElementById('meals');
    console.log(meals);

    categoriesMain.style.display = "none"; // Hide categories
    selectedItem.style.display = "block"; // Show selected item


    let categoryName;
    let categoryDescription;

    // Check if the event target is a card or a list item
    if (event.target.closest(".card")) {
        // Handle card click
        const cardElement = event.target.closest(".card");
        categoryName = cardElement.dataset.category;
        categoryDescription = cardElement.dataset.description;
    } else if (event.target.tagName === "LI") {
        // Handle list item click
        categoryName = event.target.dataset.category;
        categoryDescription = menuObject[categoryName] || "No description available.";
    } else {
        console.error("Invalid event target:", event.target);
        return;
    }

    // Update the title and description
    title.innerHTML = categoryName;
    description.innerHTML = categoryDescription;

    try {
        // here am getting cors with mobiel network so am using below api link
        let response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.themealdb.com/api/json/v1/1/search.php?s=${categoryName}`)}`);
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