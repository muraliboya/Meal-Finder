let categoriesData = [];

let menuArray = []

let menu = document.getElementById('menu');


const iconChange = () => {
    menu.innerHTML = `
    <div id="menu-options" style="position: absolute; padding: 10px;">
    <button id="cross" 
        style="position: absolute; top: 10px; right: 2%; 
               background-color: white; border: 4px solid orange; 
               height: 50px; width:50px;
                border-radius: 50%;
              display: flex;
                justify-content: center;
               align-items: center;
               margin-bottom:5px;">
        <i class="bi bi-x" style="font-size: 2rem; color: orange;"></i>
    </button>
    
    <ul style="list-style-type: none; padding: 80px 0 40px 10px; margin: 0;">
        ${menuArray.map((item, i) => `<li style="border-bottom: 1px solid whitesmoke">${item}</li>`).join("")}

    

    </ul>
</div>


    `;

    // Attach event listener for the close button (cross)
    document.getElementById('cross').addEventListener('click', closeMenu);
};

// closing usigg cross 
const closeMenu = () => {
    menu.innerHTML = `<div id="menu-button">  
        <i class="bi bi-list" style="font-size: 2rem;"></i>  
    </div>`;

    //am reaattaching it is must
    document.getElementById('menu-button').addEventListener('click', iconChange);
};

// it is very important because if we dont write this script dont wait for the loading and run then there is no croo button at that time, so it wont affect
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('menu-button').addEventListener('click', iconChange);
});

// directly am calling
fetchProducts();

console.log(menuArray)

async function fetchProducts() {
    let container = document.getElementById("category");
    container.innerHTML = "";

    try {
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        let data = await response.json();
        categoriesData = data.categories;



        container.innerHTML = `
    <div class="row row-cols-1 row-cols-md-4 g-4">
        ${categoriesData.map((item) => {
            menuArray.push(item.strCategory);
            return `
                <div class="col">
                    <div class="card" style="position:relative; padding:5%; border:2px solid whitesmoke;">
                        <img src="${item.strCategoryThumb}" class="card-img-top" alt="${item.strCategory}" />
                        <p class="card-text" style="position:absolute; background-color:rgb(225, 97, 32); right:5%; color:white; font-weight:500; padding:4px 8px; top:5%; border-radius:3px;">
                            ${item.strCategory}
                        </p>
                    </div>
                </div>
            `;
        }).join("")}
    </div>
`;

        console.log(menuArray); // Check if categories are added correctly


    } catch (err) {
        console.error("Error in fetching data:", err);
    }
}
