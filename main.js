import { renderCountries } from "./functions.js";

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'dc935f1d6emsh3dde368f85b528ep1aca42jsnaaeaf9657fab',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
	}
};
const country = document.querySelectorAll('.country-list p')
const countryBody = document.querySelector('.country-body')


function removeClass(listSelector){
	listSelector.forEach(el =>{
		if(el.classList.contains('p-active')){
			el.classList.remove('p-active')
		}
	})
}

   function chooseFromList(listSelector){

	listSelector.forEach(el =>{
		
		 el.addEventListener('click', () =>{
			removeClass(listSelector)
			const resArray = responseCountry(el.textContent);
			el.classList.add('p-active');
			console.log()
			return resArray;
		})
	})

}
// async function run(){
// 	const arrCountry = chooseFromList(country);
// 	renderCountryBody(countryBody,arrCountry);
// }

// async function renderCountryBody(body, arr){
// 	let listOfCountries = document.createElement('div')
// 	await arr.forEach(el =>{
// 		listOfCountries.appendChild('p')
// 		body.appendChild(listOfCountries)
// 	})
// }
 let countries;
 function responseCountry(query){
	const responseArray = []
	fetch(`https://api-football-v1.p.rapidapi.com/v3/leagues?country=${query}`, options)
	.then(response => response.json())
	.then(response =>{
		console.log(response)
	countries =	response.response.map((el) =>{
			return{
				country:{
					name: el.country.name,
					png: el.country.flag,
					short: el.country.code
				},
				league:{
					id: el.league.id,
					png: el.league.logo,
					name: el.league.name
				}
				

			}
		})
		renderCountries(countries);
	} )
	.catch(err => console.error(err));
}


responseCountry(chooseFromList(country))