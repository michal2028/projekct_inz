import { getNormalDate, dateValidation } from "./additions.js";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "dc935f1d6emsh3dde368f85b528ep1aca42jsnaaeaf9657fab",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

function createLiveMatches(table) {
  const detailsTable = []
  const body = document.querySelector(".matches-body");
  body.innerHTML = "";
  let patternAll = "";
  let isWinner1 = "";
  let isWinner2 = "";
  //  console.log(table)
  for (let i = 0; i < table.length; i++) {
    if (table[i].matchInfo.matchTime === null || table[i].score.home === null || table[i].score.away === null) {
      table[i].matchInfo.matchTime = table[i].matchInfo.status;
      table[i].score.home = "-";
      table[i].score.away = "-";
    }
    if (table[i].matchInfo.status.toLowerCase() === "match finished") {
      if (table[i].score.home === table[i].score.away) {
        //
      } else if(table[i].teams.home.winner === true) {
        isWinner1 = `winner`;
      }else{
        isWinner2 = `winner`;
      }
    }

    let pattern = ` <div data-id=${i} data-fixture=${table[i].matchInfo.fixtureId} class="match">

        <p>${getNormalDate(table[i].matchInfo.data)}</p>
        <div class="match-top">
        <p class="team-name-first ${isWinner1}">${table[i].teams.home.name}</p>
        <p class="team-name-second ${isWinner2}">${table[i].teams.away.name}</p>
        <div class="team-1">
                <img src=${table[i].teams.home.logo} alt=" logo${table[i].teams.away.name}">
            </div>
            <p class="time">${table[i].matchInfo.matchTime}'</p>
            
            
            <div class="score-1">
            <span>${table[i].score.home}</span>
             </div>
             <div class="score-2">
             <span>${table[i].score.away}</span>
             </div>
            <div class="team-2">
                <img src=${table[i].teams.away.logo} alt="logo ${table[i].teams.away.name}">
            </div>
           

        </div>
        <div class="match-bottom">
            <div class="team-left"></div>
            <div class="team-right"></div>
            </div>
       </div>`;

    patternAll += pattern;
    isWinner1 = "";
    isWinner2 = "";
  }
  body.innerHTML = patternAll;
  createListenerMatch(table,detailsTable);
}

function CountrySelectValue() {
  const select = document.getElementById("country-select");
  let selectOption = {
    country: null,
    league: null,
    from: null,
    to: null,
  };

  select.addEventListener("change", (e) => {
    selectOption.country = select.value;
    generateLeaguesSelect(select.value, selectOption);
  });
}

function inputLeaguesIntoSelect(leagues, selectOption) {
  let select = document.getElementById("league-select");
  select.innerHTML = "";
  select.disabled = false;
  for (let value in leagues) {
    let options = document.createElement("option");
    options.innerText = leagues[value].league.name;
    options.value = leagues[value].league.id;
    options.classList.add("league-option");
    select.append(options);
  }

  // nasluch na click
  leagueSelectValue(document.getElementById("league-select"), selectOption);
}

function selectDateTo(selectOption) {
  const dateTo = document.getElementById("date-to");
  const btn = document.querySelector(".form-submit");
  dateTo.disabled = false;
  dateTo.addEventListener("change", () => {
    selectOption.to = dateTo.value;

    btn.disabled = false;
    btn.addEventListener("click", () => {
      if (dateValidation(selectOption.from, selectOption.to)) {
        let url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${selectOption.league}&season=2022&from=${selectOption.from}&to=${selectOption.to}&timezone=Europe%2FLondon`;
        responseLiveMatches(url);
      } else {
        alert("format daty nieprawidłowy");
      }
    });
  });
}

function selectDateFrom(selectOption) {
  const dateFrom = document.getElementById("date-from");
  dateFrom.disabled = false;
  dateFrom.addEventListener("change", () => {
    selectOption.from = dateFrom.value;
    selectDateTo(selectOption);
  });
}

function leagueSelectValue(select, selectOption) {
  select.addEventListener("change", () => {
    selectOption.league = select.value;

    selectDateFrom(selectOption);
  });
}

function generateLeaguesSelect(countryValue, selectOption) {
  let countries;

  fetch(
    `https://api-football-v1.p.rapidapi.com/v3/leagues?country=${countryValue}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      countries = response.response.map((el) => {
        return {
          league: {
            id: el.league.id,
            name: el.league.name,
          },
        };
      });
      console.log(countries);
      inputLeaguesIntoSelect(countries, selectOption);
    });
}
function matchDetails(fixture,detailsTable,el){
  let detailsMatch =[];
  fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${fixture}`,options)
  .then(res => res.json())
  .then(res =>{
    
    console.log(res)
    detailsTable.push(fixture)
    detailsMatch = res.response[0].events.map(el =>{
      console.log(el)
      return{
        events: el
      }
    })
    console.log(detailsMatch);
    generateEventsMatch(detailsMatch,el)
  })
  .catch(err => console.log(err))
}

function createListenerMatch(table, detailsTable) {
  const matchComponent = document.querySelectorAll(".match");
  matchComponent.forEach((el) => {
    el.addEventListener("click", () => {
      let fixture = el.getAttribute('data-fixture')
      if(!detailsTable.includes(fixture)){
        matchDetails(fixture,detailsTable,el) 
      }
      el.querySelector(".match-bottom").classList.toggle("active");
      
      console.log(el)
      console.log(detailsTable)
    });
  });
}
async function generateEventsMatch(table,el){
  console.log(el)
  console.log(table)
  
  let teamLeft = el.querySelector('.team-left')
  let teamRight = el.querySelector('.team-right')
  let homeAll ="";
  let awayAll ="";
 
  teamLeft.innerHTML = "";
  teamRight.innerHTML = "";

  console.log(el.querySelector('.team-name-first').innerText)

  for(let i =0;i<table.length;i++){
    let home = "";
  let away = "";
  let event = generateEventHTML(table[i].events.detail)
  if(table[i].events.type !== "subst"){
    if(table[i].events.team.name === el.querySelector('.team-name-first').innerText){
      home = `<div class="event-left"><p class="event-time">${table[i].events.time.elapsed}'</p><p class="event-player">${table[i].events.player.name}</p><p class="event-detail">${event}</p>
      </div>`
       homeAll = homeAll + home;
     }
    if(table[i].events.team.name === el.querySelector('.team-name-second').innerText){
      away = `<div class="event-right"><p class="event-time">${table[i].events.time.elapsed}'</p><p class="event-player">${table[i].events.player.name}</p><p class="event-detail">${event}</p></div>
      `
       awayAll = awayAll + away;
     }
   
  }
    

  }
  teamRight.innerHTML = awayAll;
  teamLeft.innerHTML = homeAll;

}

function generateEventHTML(event){
  if(event ==="Yellow Card"){
    return `<img src="./icons/matches_icon/yellow-card.png" alt="yellow card">`
  }
  if(event ==="Normal Goal" || event === "Own Goal"){
    return `<img src="./icons/matches_icon/goal.png" alt="football ball">`
  }
  if(event === "Red Card"){
    return `<img src="./icons/matches_icon/red.png" alt="red card">`
  }else{
    return `<p class="event-text">${event}</p>`
  }
}

function responseLiveMatches(
  query = "https://api-football-v1.p.rapidapi.com/v3/fixtures?last=50"
) {
  let liveScores = [];
  fetch(query, options)
    .then((res) => res.json())
    .then((res) => {
      liveScores = res.response.map((el) => {
        return {
          matchInfo: {
            fixtureId: el.fixture.id,
            data: el.fixture.date,
            id: el.fixture.id,
            matchTime: el.fixture.status.elapsed,
            status: el.fixture.status.long,
            stadion: el.fixture.venue.name,
          },
          score: {
            home: el.goals.home,
            away: el.goals.away,
          },
          league: {
            country: el.league.country,
            countryId: el.league.id,
            countryFlag: el.league.flag,
            leagueName: el.league.name,
            leagueLogo: el.league.logo,
            season: el.league.season,
          },
          teams: {
            home: {
              id: el.teams.home.id,
              logo: el.teams.home.logo,
              name: el.teams.home.name,
              winner: el.teams.home.winner,
            },
            away: {
              id: el.teams.away.id,
              logo: el.teams.away.logo,
              name: el.teams.away.name,
              winner: el.teams.away.winner,
            },
          },
        };
      });
      console.log(res)
      createLiveMatches(liveScores.reverse());
    })
    .catch((err) => console.log(err));
}

//   responseLiveMatches()

CountrySelectValue();
