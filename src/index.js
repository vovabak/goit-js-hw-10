import './css/styles.css';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name/';

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.searchBox.addEventListener('input', onSearchBox);

function onSearchBox(e) {

    
    const querry = e.currentTarget.value;

    
    fetch(`${BASE_URL}${querry}`)
        .then(result => result.json())
        .then(countries => refs.countryList.innerHTML = countries.map(countrie => `<img src=${countrie.flags.svg} width=30px height=15px alt=${countrie.name.official}></img>`))
        // .then(countries => countries.map(countrie =>`<li><img src=${countrie.flags.svg} alt=${countrie.name.official}><p>${countrie.name.official}</p><p>${countrie.population}</p><p>${...Object.values(countrie.languages)}</p><p>${...countrie.capital}</p></li>`))
}

// function fetchCountrie() {

// }

// function countryMarkup() {
// ukraine
// }



