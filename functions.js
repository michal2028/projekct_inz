

const createCountryElement = (country) =>{

    console.log(country);
const body = document.querySelector('.league-body');
        body.innerHTML = ""
    for(let i =0;i<16;i++){
          const leagueBox = document.createElement('div');
        leagueBox.classList.add('league-box');
    
        const leagueBoxTop = document.createElement('div')
        leagueBoxTop.classList.add('league-box-top')
    
        const leagueBoxTopImg = document.createElement('img')
        leagueBoxTopImg.src = country[i].country.png;
        leagueBoxTopImg.alt = country[i].country.name;
    
        const leagueBoxTopText = document.createElement('p')
        leagueBoxTopText.innerText = country[i].country.name
    
        const leagueBoxMid = document.createElement('div')
        leagueBoxMid.classList.add('league-box-mid')
    
        const leagueBoxMidImg = document.createElement('div');
        leagueBoxMidImg.classList.add('league-box-mid-img')
        const leagueBoxMidImg2 = document.createElement('img')
        leagueBoxMidImg2.src = country[i].league.png
        leagueBoxMidImg2.alt = country[i].league.name
    
        const leagueBoxMidText = document.createElement('div')
        leagueBoxMidText.classList.add('league-box-mid-text')
        const leagueBoxMidText2 = document.createElement('p')
        leagueBoxMidText2.innerText = country[i].league.name;
    
        leagueBoxMidText.appendChild(leagueBoxMidText2);
        leagueBoxMidImg.appendChild(leagueBoxMidImg2);
    
        leagueBoxMid.appendChild(leagueBoxMidImg);
        leagueBoxMid.appendChild(leagueBoxMidText);
    
        leagueBoxTop.appendChild(leagueBoxTopImg);
        leagueBoxTop.appendChild(leagueBoxTopText);
    
        leagueBox.appendChild(leagueBoxTop)
        leagueBox.appendChild(leagueBoxMid)

        body.appendChild(leagueBox);
    
    


    }       

      

        
}


export const renderCountries = (country) =>{

    createCountryElement(country);

    console.log(country);
}