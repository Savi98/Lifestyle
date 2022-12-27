let search = document.getElementById('search');
let result = document.getElementById('result');
let cityInput = document.getElementById('city-input');

search.onclick = function searchApi(){
    fetch ('https://api.teleport.org/api/urban_areas/slug:los-angeles/scores/')
    .then (Response => Response.json())
    .then (// data => result.innerHTML = data.summary
            data => console.log(data)
    )
    }