let search = document.getElementById('search');
let result = document.getElementById('result');
let cityInput = document.getElementById('city-input');
let myDropdown = document.getElementById('myDropdown');
let resultH3 = document.querySelectorAll("h3");
let footer = document.getElementById('footer');

cityInput.addEventListener('click', showCities);

function showCities() {
        myDropdown.classList.toggle("show");

        fetch ('https://api.teleport.org/api/urban_areas/')
        .then (Response => Response.json())
        .then (data => {
                        let cities = "";
                        for(let prop in data._links['ua:item']){
                                cities += '<option "value=' + [data._links['ua:item'][prop].name] + '">' + (data._links['ua:item'][prop].name) + '</option>';
                                let citiesLowerCase = cities.toLowerCase();
                                myDropdown.innerHTML = citiesLowerCase;

                        }

                        myDropdown.onclick = e => {
                                let citySelected = e.target.value;
                                cityInput.value = citySelected;
                        }

                        let citiesFilter = '';
                        let nameCities = '';
                        for(let prop in data._links['ua:item']){
                                citiesFilter += [data._links['ua:item'][prop].name] + '<br>';
                                nameCities = citiesFilter;
                                
                        }
                }
        )
}

cityInput.addEventListener('input', filterList);

function filterList(){
        let filter = cityInput.value.toLowerCase();
        let listItems = document.querySelectorAll('option');

        listItems.forEach((item) => {
                let text = item.textContent;
                if(text.toLowerCase().includes(filter.toLowerCase())){
                        item.style.display = '';
                } else {
                        item.style.display = 'none';
                }
        })
}

function creazionElementi (tagname, classe, id, text) {
        elemento = document.createElement(tagname);
        elemento.classList.add(classe);
        elemento.id = id;
        elemento.innerHTML = text;
        return elemento;
}

const primoDiv= creazionElementi ('div', 'primo-div', '', '');
result.append(primoDiv);

let city = '';
const h1Citta = creazionElementi ('h1', 'titolo-citta', '', city);
primoDiv.append(h1Citta);

const resultSummary = creazionElementi ('div', 'result-summary', '', '');
result.append(resultSummary);

let categ = '';
const resultCategories = creazionElementi ('div', 'result-categories', '', categ);
resultSummary.append(resultCategories);

let descr = '';
const resultDescrizione = creazionElementi ('div', 'result-descrizione', '', descr);
resultSummary.append(resultDescrizione);

let cityScore = '';
const resultCityScore = creazionElementi ('div', 'result-city-score', '', cityScore);
primoDiv.append(resultCityScore);

search.addEventListener('click', searchApi);

function searchApi(){
        if (cityInput.value !== ''){

                let res = cityInput.value.replace(/ /g, "-");
                let res1 = res.replace(/,/g, "");

                fetch ('https://api.teleport.org/api/urban_areas/slug:'+[res1]+'/scores/')
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
                                                        '<th>'+ name + '</th>' +
                                                        '<th class="th-score" style="background-color:'+ colore +'">'+ scoreCityArrotondato + '/10' + '</th>' +
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
                        resultCityScore.innerHTML = '<h1>City Score:   ' + cityScoreArrotondato + '</h1>';
        
                        cityInput.value = innerHTML = '';
                        myDropdown.classList.remove("show");
                }
                )
        }
}