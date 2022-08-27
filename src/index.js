import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name/';

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.searchBox.addEventListener('input', debounce(onSearchBox, DEBOUNCE_DELAY));

function onSearchBox(e) {
    
    const querry = refs.searchBox.value.trim();

    if (querry === '') {
        refs.countryList.innerHTML = '';
        return
    };        
    
    fetchCountrie(querry)
        .then(renderMarkup)
        .catch(onFethError);
}

function fetchCountrie(querry) {
    return fetch(`${BASE_URL}${querry}`).then(result => result.json())
}

function renderMarkup(countries) {
    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.",
            {
                position: 'center-top',                        
            },
        );
        return
    }
    else if (countries.length === 1) {                
                refs.countryList.innerHTML = `<li>
                                <img src=${countries[0].flags.svg} width=30px height=15px alt=${countries[0].name.official}/>
                                <h4>${countries[0].name.official}</h4>                                
                            </li>`
                refs.countryInfo.innerHTML = `<p>capital: ${countries[0].capital}</p>
                                <p>population: ${(countries[0].population / 1000000).toFixed(2)} mln</p>
                                <p>languages: ${Object.values(countries[0].languages)}</p>`
    }
    else
    {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = countries.map(countrie => {
            return `<li>
                        <img src=${countrie.flags.svg} width=30px height=15px alt=${countrie.name.official}/>
                        <h4>${countrie.name.official}</h4>                                
                    </li>`
            }).join('')
    }
}

function onFethError() {
    Notify.failure("Oops, there is no country with that name",
            {
                position: 'center-top',                        
            },
        )
}

