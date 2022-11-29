const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'dc935f1d6emsh3dde368f85b528ep1aca42jsnaaeaf9657fab',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
	}
};

 function responseCountry(query){
	fetch(`https://api-football-v1.p.rapidapi.com/v3/countries?search=${query}`, options)
	.then(response => response.json())
	.then(response =>{
		const list2 = document.getElementById('country-container')
		list2.innerHTML = "";
		console.log(response)
		const listli = document.createElement('ul');
		// to do funckji
		response.response.forEach(element => {
			listli.appendChild(document.createElement('li')).innerHTML = `<p> Country name: ${element.name} </p> <img src=${element.flag}>`;
		});
		list2.appendChild(listli)
	} )
	.catch(err => console.error(err));
}

const btnCountry = document.getElementById('btnCountry');

btnCountry.addEventListener('click', () =>{
	const inputData = document.getElementById('inputCountry').value;
	responseCountry(inputData);
})


