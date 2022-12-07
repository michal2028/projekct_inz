const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "dc935f1d6emsh3dde368f85b528ep1aca42jsnaaeaf9657fab",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};
const country = document.querySelectorAll(".country-list p");
const countryBody = document.querySelector(".country-body");
let countries;

function removeClass(listSelector, cssRule) {
  listSelector.forEach((el) => {
    if (el.classList.contains(cssRule)) {
      el.classList.remove(cssRule);
    }
  });
}

function chooseFromList(listSelector) {
  listSelector.forEach((el) => {
    el.addEventListener("click", () => {
      removeClass(listSelector, "p-active");
      const resArray = responseCountry(el.textContent);
      el.classList.add("p-active");
      return resArray;
    });
  });
}
const createCountryElement = (countries) => {
  console.log(countries);
  const body = document.querySelector(".league-body");
  const leagues = document.querySelector(".table");
  const players = document.querySelector(".players")
  players.innerHTML = "";
  leagues.innerHTML = "";
  body.innerHTML = "";
  let patternAll = "";

  for (let i = 0; i < countries.length; i++) {
    let pattern = ` <div data-id=${countries[i].league.id} class="league-box">
		 <div class="league-box-top">
		 <img src=${countries[i].country.png} alt=${countries[i].country.name}>
		   <p>${countries[i].country.name}</p>
		 </div>
		 <div class="league-box-mid">
		   <div class="league-box-mid-img">
			 <img src=${countries[i].league.png} alt=${countries[i].league.name} >
		   
		   </div>
		   <div class="league-box-mid-text">
			 <p>${countries[i].league.name}</p>
		   </div>
		   
		 </div>
	 </div>`;

    patternAll = patternAll + pattern;
  }

  body.innerHTML = patternAll;
};

// wywalic
const renderCountries = (country) => {
  createCountryElement(country);
};

function renderContent(callback, selectorCss) {
  let choose;
  let leagues = document.querySelectorAll(selectorCss);
  console.log(leagues);
  leagues.forEach((el) => {
    el.addEventListener("click", function () {
      console.log(el.getAttribute("data-id") + " z listenera");
      choose = el.getAttribute("data-id");
      callback(choose);
    });
  });
}

// add -> wy

function createLeagueElement(leagues) {
  console.log(leagues);
  const body = document.querySelector(".table");
  body.innerHTML = "";
  let patternAll = "";
  let stats = `<div class="table-box"><div class="table-box-text">
  <span class="lp">#</span>

  <span class="name">Team</span>
  <span class="matches">M</span>
  <span class="wins">W</span>
  <span class="draw">D</span>
  <span class="lose">L</span>
  <span class="goals">B</span>
  <span class="points">P</span>
  <span class="balance">Balance</span>
  
</div></div>`;

  if (leagues === false) {
    let errorMessage = `<div class="error"><p>We can't download this data, sorry</p></div>`;
    body.innerHTML = errorMessage;
  } else {
    for (let i = 0; i < leagues.length; i++) {
      let pattern = `<div data-id=${leagues[i].team_id} class="table-box">
  
      <div class="table-box-text">
        <span class="lp">${leagues[i].rank}</span>
        <img src=${leagues[i].logo} alt=${leagues[i].team}>
        <span class="name">${leagues[i].team}</span>
        <span class="matches">${leagues[i].matches}</span>
        <span class="wins">${leagues[i].wins}</span>
        <span class="remis">${leagues[i].draws}</span>
        <span class="lose">${leagues[i].loses}</span>
        <span class="goals">${leagues[i].goalsFor}:${leagues[i].goalsAgainst}</span>
        <span class="points">${leagues[i].points}</span>
        <div class="form">
          <p>${leagues[i].form}</p>
        </div>
      </div>
  
    </div>`;

      patternAll = patternAll + pattern;
    }

    body.innerHTML = stats + patternAll;
  }
}

function responseLeague(query) {
  let leagues = [];
  fetch(
    `https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=${query}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.response.length === 0) {
        console.log("pusto");
        createLeagueElement(false);
      } else {
        leagues = response.response[0].league.standings[0].map((el) => {
          return {
            league_id: query,
            rank: el.rank,
            team: el.team.name,
            logo: el.team.logo,
            team_id: el.team.id,
            matches: el.all.played,
            wins: el.all.win,
            loses: el.all.lose,
            draws: el.all.draw,
            goalsFor: el.all.goals.for,
            goalsAgainst: el.all.goals.against,
            points: el.points,
            form: el.form,
          };
        });
        console.log(leagues);
        createLeagueElement(leagues);
        renderContent(responseTeam, ".table-box");
      }
    })
    .catch((err) => console.log(err));
}

function createElementPlayers(players){

const body = document.querySelector(".players");

let patternAll ="";
  body.innerHTML = "";
const playersBox = document.createElement('div');
playersBox.classList.add('players-box');
const logoBox = document.createElement('div');
logoBox.classList.add('players-logo-box');
let logoSrc =[];
const teamLogo = document.querySelectorAll('.table-box');
teamLogo.forEach(el =>{

  if(el.getAttribute("data-id") === players[0].team_id){
    
    logoSrc.push(el.querySelector(".table-box-text img").src);
    logoSrc.push(el.querySelector(".name").innerHTML);
    // logoSrc.push(el.querySelector(".table-box-text name").innerText);
  }
})


let logo = `<div class="players-logo-box-text">
  <img src=${logoSrc[0]} alt=${logoSrc[1]}>
  <h3>${logoSrc[1]}</h3>
</div>
<h4>Squad</h4>`


  for(let i =0;i<players.length;i++){

   let pattern = `
    <div class="player-box">
      <img src=${players[i].png} alt="">
      <p class="player-name">${players[i].name}</p>
      <p class="player-age">${players[i].age}</p>
      <p class="player-number">${players[i].number}</p>
      <p class="player-position">${players[i].position}</p>
    </div>`
    patternAll = patternAll + pattern;
  }
  logoBox.innerHTML = logo;
  playersBox.innerHTML = patternAll;
  body.appendChild(logoBox);
  body.appendChild(playersBox);
}



function responseTeam(query) {
  
  let players = [];
  fetch(
    `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${query}`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      (
        (players = res.response[0].players.map((el) => {
          if (el.number === null) {
            el.number = "no data";
          }
          return {
            team_id:query,
            age: el.age,
            player_id: el.id,
            name: el.name,
            number: el.number,
            png: el.photo,
            position: el.position,
          };
        }))
      );
      console.log(players);
      createElementPlayers(players)
    })
    .catch((err) => console.log(err));
}

function responseCountry(query) {
  if (query != undefined) {
    const responseArray = [];
    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/leagues?country=${query}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        countries = response.response.map((el) => {
          return {
            country: {
              name: el.country.name,
              png: el.country.flag,
              short: el.country.code,
            },
            league: {
              id: el.league.id,
              png: el.league.logo,
              name: el.league.name,
            },
          };
        });
        renderCountries(countries);
        renderContent(responseLeague, ".league-box");







      })

      .catch((err) => console.error(err));
  }
}

responseCountry(chooseFromList(country));
