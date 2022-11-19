const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'dc935f1d6emsh3dde368f85b528ep1aca42jsnaaeaf9657fab',
		'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
	}
};

fetch('https://footapi7.p.rapidapi.com/api/search/ronaldo', options)
	.then(response => response.json('info.json'))
	.then(response => {
        console.log(response)
        console.log(response[0].enity)



    })
	.catch(err => console.error(err));


const testowy = document.getElementById('testowy')

// testowy.innerText(respons)