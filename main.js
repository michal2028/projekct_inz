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
  leagues.innerHTML = "";
  body.innerHTML = "";
  let patternAll = "";

  for (let i = 0; i < 8; i++) {
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
const renderCountries = (country) => {
  createCountryElement(country);
};

function renderLeague(callback) {
  let choose;
  const leagues = document.querySelectorAll(".league-box");
  leagues.forEach((el) => {
    el.addEventListener("click", function () {
      console.log(el.getAttribute("data-id") + " z listenera");
      choose = el.getAttribute("data-id");
      callback(choose);
    });
  });
}

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
  <span class="remis">D</span>
  <span class="lose">L</span>
  <span class="goals">B</span>
  <span class="points">P</span>
  <span class="balance">Balance</span>
  
</div></div>`;

  if (leagues === false) {
    let errorMessage = `<div class="error"><p>We can't download this data, sorry</p></div>`;
    body.innerHTML = errorMessage;
  } else {
    for (let i = 0; i < 8; i++) {
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

async function responseLeague(query) {
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
      }
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
        renderLeague(responseLeague);
      })

      .catch((err) => console.error(err));
  }
}

responseCountry(chooseFromList(country));
