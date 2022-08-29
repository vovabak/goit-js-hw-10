export function renderCountriesMarkup(country) {
    return `<li>
                <img src=${country.flags.svg} width=30px height=15px alt=${country.name.official}/>
                <h4>${country.name.official}</h4>
            </li>`
};

export function renderOneCountryMarkup(country) {
    return `<img src=${country[0].flags.svg} width=30px height=15px alt=${country[0].name.official}/>
            <h4>${country[0].name.official}</h4>
            <p>capital: ${country[0].capital}</p>
            <p>population: ${(country[0].population / 1000000).toFixed(2)} mln</p>
            <p>languages: ${Object.values(country[0].languages)}</p>`
};