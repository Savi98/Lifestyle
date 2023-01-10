let search = document.getElementById('search');
let result = document.getElementById('result');
let cityInput = document.getElementById('city-input');
let myDropdown = document.getElementById('myDropdown');
let resultH3 = document.querySelectorAll("h3");
let footer = document.getElementById('footer');

cityInput.addEventListener('click', searchCities);

function searchCities() {
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

function creazionElementi (tagname, classe, id, text) {
        elemento = document.createElement(tagname);
        elemento.classList.add(classe);
        elemento.id = id;
        elemento.innerHTML = text;
        return elemento;
}
let city = '';
const h1Citta = creazionElementi ('h1', 'titolo-citta', '', city);
result.append(h1Citta);

let categ = '';
const resultCategories = creazionElementi ('div', 'result-categories', '', categ);
result.append(resultCategories);

let descr = '';
const resultDescrizione = creazionElementi ('div', 'result-descrizione', '', descr);
result.append(resultDescrizione);

let cityScore = '';
const resultCityScore = creazionElementi ('div', 'result-city-score', '', cityScore);
result.append(resultCityScore);

search.addEventListener('click', searchApi);

function searchApi(){
        if (cityInput.value !== ''){

                fetch ('https://api.teleport.org/api/urban_areas/slug:'+[cityInput.value]+'/scores/')
                .then (Response => Response.json())
                .then (data => {
                        city = cityInput.value;
                        let cityUpperCase = city.toUpperCase();
                        h1Citta.innerHTML = cityUpperCase + '<br>';

                        let categorie = '';

                        for(let prop in data.categories){
                                let colore = data.categories[prop].color;

                                let name = data.categories[prop].name;

                                let scoreCity = data.categories[prop].score_out_of_10;
                                let scoreCityArrotondato = Math.round(scoreCity);

                                
                                categorie +=      
                                        '<table>' + 
                                                '<tr>' + 
                                                        '<th id="th-colore" style="color:'+ colore +'">'+ colore + '</th>' +
                                                        '<th>' + name + '</th>' + 
                                                        '<th>' + scoreCityArrotondato + '/10' + '</th>' + 
                                                '</tr>' +
                                        '</table>';

                                categ = categorie;
                                resultCategories.innerHTML = categ + '<br>';

                        }
                        
                        let descrizione = '';
                        for(let prop in data.summary){
                                descrizione += (data.summary[prop]);
                                descr = descrizione;
                                resultDescrizione.innerHTML = descr + '<br>';
                        }

                        cityScore = data.teleport_city_score;
                        let cityScoreArrotondato = Math.round(cityScore);
                        resultCityScore.innerHTML = '<h4><b>Teleport City Score: </b></h4>  ' + cityScoreArrotondato;
        
                        cityInput.value = innerHTML = '';
                        myDropdown.classList.remove("show");
                }
                )
        }
}