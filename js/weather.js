let search = document.getElementById('search');
let result = document.getElementById('result');
let cityInput = document.getElementById('city-input');
let myDropdown = document.getElementById('myDropdown');
let resultCategories = document.getElementById('result-categories');
let resultDescrizione = document.getElementById('result-descrizione');
let resultCityScore = document.getElementById('result-city-score');

cityInput.onclick = function searchCities() {
        myDropdown.classList.toggle("show");

        fetch ('https://api.teleport.org/api/urban_areas/')
        .then (Response => Response.json())
        .then (data => {
                        let i = 0;
                        let cities = "";
                        while (i < 266){
                                cities += '<option "value=' + [data._links['ua:item'][i].name] + '">' + (data._links['ua:item'][i].name) + '</option>';
                                i++;
                                let citiesLowerCase = cities.toLowerCase();
                                myDropdown.innerHTML = citiesLowerCase;
                        }

                        myDropdown.onclick = e => {
                                let citySelected = e.target.value;
                                cityInput.value = citySelected;
                        }

                }
        )
}

search.onclick = function searchApi(){
    fetch ('https://api.teleport.org/api/urban_areas/slug:'+[cityInput.value]+'/scores/')
    .then (Response => Response.json())
    .then (data => {
                let categorie = '';
                for(let prop in data.categories){
                        categorie += JSON.stringify(data.categories[prop]) + '<br>';
                        resultCategories.innerHTML = categorie;
                    }
                
                let descrizione = '';
                for(let prop in data.summary){
                        descrizione += (data.summary[prop]);
                        resultDescrizione.innerHTML = descrizione;
                }

                resultCityScore.innerHTML = data.teleport_city_score;
                
                }
        )
}