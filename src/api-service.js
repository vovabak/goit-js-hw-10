const BASE_URL = 'https://restcountries.com/v3.1/name/';
const URL_PARAMS = '?fields=name,capital,flags,languages,population'

export function fetchCountries(query) {
    return fetch(`${BASE_URL}${query}${URL_PARAMS}`).then(result => result.json())
}