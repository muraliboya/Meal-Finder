let categoriesData = [];

async function fetchProducts() {
    let container = document.getElementById('category');
    container.innerHTML = '';
    try {
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        let data = await response.json();
        categoriesData = data.categories;

        // Creating a 4-column grid
        container.innerHTML = `
            <div class="row row-cols-1 row-cols-md-4 g-4">
                ${categoriesData.map((item) => `
                    <div class="col">
                        <div class="card" style="position:relative ">
                            <img src="${item.strCategoryThumb}" class="card-img-top" alt="${item.strCategory}" />
                            <p class="card-text" style="position:absolute;   background-color:rgb(225, 97, 32); right:5%; color:white ; font-weight:500 ;padding:4px 8px ;top:5%; border-radius:3px;">${item.strCategory}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (err) {
        console.log('Error in fetching data: ' + err);
    }
}

document.addEventListener('DOMContentLoaded', fetchProducts);
