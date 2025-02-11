export async function idCardCliking() {
    document.getElementById('idItem').style.display = 'block';
    console.log('here it is coming idclciking murali');
    console.log(this.dataset.id)

    let instructionsdiv = document.getElementById('instructions');

    let selectedItem = document.getElementById("selected-item");
    let categoriesMain = document.getElementById("categories-main");

    let idName = document.getElementById('id_name');

    let idImage = document.getElementById('id_image')

    let idDescription = document.getElementById('id_description');

    let measurediv = document.getElementById('measure');
    let idItem = document.getElementById('idItem');


    


    selectedItem.style.display = 'none';
    idItem.style.display = 'block';
    categoriesMain.style.display = 'block';

    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.dataset.id}`)
        console.log(this.dataset.id);
        let response = await res.json();
        console.log(response.meals[0]);
        console.log(response.meals[0].strMealThumb);
        idName.innerHTML = response.meals[0].strMeal;

        console.log("2nd rees"+response.meals[0].strInstructions);

        // split the instructions 
        let steps = response.meals[0].strInstructions.split(/\r?\n|\t/).map(step => step.trim());

        let newsteps = []
        for(let i=1;i<steps.length;i+=2){
            newsteps.push(steps[i]);
        }
        newsteps.map(item=>console.log(item));
        console.log("1st res"+steps);
        console.log( response.meals[0].strInstructions.split(/\r?\n|\t/));
        
        
        

        // Extracting  ingredients 
        let ingredients = Object.entries(response.meals[0])
            .filter(([key, value]) => key.startsWith("strIngredient") && value.trim() !== "")
            .map(([key, value]) => value);
        console.log(ingredients)

        // extracting meansures
        let measures = Object.entries(response.meals[0])
            .filter(([key, value]) => key.startsWith("strMeasure") && value.trim() !== "")
            .map(([key, value]) => value);
        console.log(measures)


        idImage.innerHTML = `<img style=" height:100%; width: 100%;" src=${response.meals[0].strMealThumb} alt=${this.dataset.name}/>`
        idDescription.innerHTML = `
        <div>
        <h2> ${response.meals[0].strMeal}</h2>
        <p style="width:100% ; height: 3px; background-color: orangered; "></p>
         <P> <b>CATEGORY : </b> ${(this.dataset.name).toUpperCase()}</P>
        <P> <b>SOURCE : </b> ${response.meals[0].strSource}</P>
        <p> <b>Tags : </b> <span style="color:red; border: 1px solid red;padding: 1px;">${response.meals[0].strTags} </span></p>

        </div>
<div style="background-color: red; padding: 10px;">
    <p style="color: white; font-size: 1.5rem; font-weight: bold; text-align: start; margin-bottom: 10px;">
        Ingredients
    </p>

    <ul style="display: flex; flex-wrap: wrap; gap: 20px; padding: 0; list-style: none; justify-content: space-between;">
        ${ingredients.map((item, i) => {
            return `<li style="width: 30%; display: flex; align-items: center; gap: 10px;">
                        <span style="display: flex; justify-content: center; align-items: center; 
                                    width: 30px; height: 30px; border-radius: 50%; 
                                    background-color: rgb(58, 150, 145); color: white; font-weight: bold;">
                            ${i + 1}
                        </span> 
                        <span style="color: white; font-size: 1rem;">${item}</span>
                    </li>`;
        }).join("")}
    </ul>
</div>


        `
        // completd upto id description 
        // now part2 starts from here
        //style="border: 3px solid white;height: 30px; width:30px; border-radius:50%; display:flex;justify-content:center; align-items:center; background-color: green;"
        measurediv.innerHTML = `
        <ul style="list-style: none; display: flex; flex-wrap: wrap; justify-content: start; gap: 20px; width: 100%;">
            ${measures.map((item, i) => {
                return `
                    <li style="width: 45%; display: flex; align-items: start; justify-content: start; font-size: 1.2rem;">
                        <i class="fa fa-spoon" style="color: orangered; margin-right: 10px;"></i> ${item}
                    </li>
                `;
            }).join("")}
        </ul>
    `;

    instructionsdiv.innerHTML = `
    ${newsteps.map((item, i) => {
        return `
        <li style="list-style: none; margin-bottom: 20px; font-size: 1.2rem;">  
            <i style="color: orangered; padding-right: 20px;  " class="bi bi-check-square"></i>  
            ${item} 
        </li> `;
    }).join("")}
`;


    
    

    } catch (err) {
        console.log('error in fetching the details using ID,', err);
    }
}