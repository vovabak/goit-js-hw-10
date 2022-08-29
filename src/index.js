import './css/styles.css';
import { fetchCountries } from './api-service';
import { renderCountriesMarkup, renderOneCountryMarkup } from './templates';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.searchBox.addEventListener('input', debounce(onSearchBox, DEBOUNCE_DELAY));

function onSearchBox() {
    
    const query = refs.searchBox.value.trim();

    if (query === '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return
    };        
    
    fetchCountries(query)
        .then(renderMarkup)
        .catch(onFetchError);
}

function renderMarkup(countries) {
    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.",            
            {
                position: 'center-top',
                showOnlyTheLastOne: true,
            },
        );
    };

    if (countries.length > 1 && countries.length <= 10)
    {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = countries.map(country => renderCountriesMarkup(country)).join('')
        
    };
    
    if (countries.length === 1) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = renderOneCountryMarkup(countries);        
    };    

    if (countries.status === 404) {        
      throw new Error();
    };
}

function onFetchError() {
    Notify.failure("Oops, there is no country with that name",
            {
                position: 'center-top',                        
            },
    )
}

