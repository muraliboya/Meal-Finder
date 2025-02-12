import { idCardCliking } from "./idCardClicking.js";
export async function searchmeal(searchfield) {
    let inp = searchfield.value.trim();
    console.log(searchfield.value);

    let mealsearchdiv = document.getElementById('meal-search-div');

    let mealsdiv = document.getElementById('mealsusingsearch');
    mealsdiv.style.display='block';
    document.getElementById('idItem').style.display='none';

    if (searchfield.value.trim() === '') return;
    else {
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inp}`);
            let r = await res.json();
            console.log(r.meals[0]);
            console.log('clicked the search button, murali ');
            mealsearchdiv.innerHTML = `
            <div class="row row-cols-1 row-cols-md-5 g-4">
                <div class="col">
                    <div class="card-meals" data-id=${r.meals[0].idMeal} style="
                    position: relative; border: 2px solid whitesmoke; padding: 2%; background-color=white; border-radius:3px;">
                        <img src=${r.meals[0].strMealThumb} class="card-img-top" alt=${r.meals[0].strMeal}/>
                        <p style=" position:absolute; top: 5%; right:5%; color: orangered; border: 2px solid red; padding: 1%; background-color:white; border-radius: 25px; width: 40%; display:flex; justify-content:center; align-items:center;">${r.meals[0].strCategory} </p> 
                        <div class="card-body" style="text-align:center;">
                            <p class="card-text">${r.meals[0].
                                strArea}</p>

                            <h5 class="card-title">${r.meals[0].strMeal}</h5>
                        </div>
                    </div>
                </div>
            </div>

            ` 

                        document.querySelectorAll(".card-meals").forEach(item => {
                            item.addEventListener("click", idCardCliking);
                        });





        } catch (err) {
            console.log('error in searching the meal using name : ', err);
        }
    }

}