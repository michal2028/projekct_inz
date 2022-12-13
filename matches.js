import { getNormalDate, dateValidation } from "./additions.js";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "dc935f1d6emsh3dde368f85b528ep1aca42jsnaaeaf9657fab",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

function createLiveMatches(table) {
  const body = document.querySelector(".matches-body");
  body.innerHTML = "";
  let patternAll = "";
  let isWinner1 = "";
  let isWinner2 = "";
  //  console.log(table)
  for (let i = 0; i < table.length; i++) {
    if (table[i].matchInfo.matchTime === null) {
      table[i].matchInfo.matchTime = table[i].matchInfo.status;
      table[i].score.home = "-";
      table[i].score.away = "-";
    }
    if (table[i].matchInfo.status.toLowerCase() === "match finished") {
      if (table[i].teams.home.winner === true) {
        isWinner1 = `<span class="winner"> Win </span>`;
      } else {
        isWinner2 = `<span class="winner"> Win </span>`;
      }
    }

    let pattern = ` <div data-id=${i} class="match">
        <p>${getNormalDate(table[i].matchInfo.data)}</p>
        <div class="match-top">
            <p class="time">${table[i].matchInfo.matchTime}</p>
            <p class="team-name">${isWinner1}${table[i].teams.home.name}</p>
            <div class="team">
                <img src=${table[i].teams.home.logo} alt="">
            </div>
            <div class="score">
                <p>${table[i].score.home}:${table[i].score.away}</p>
            </div>
            <div class="team">
                <img src=${table[i].teams.away.logo} alt="">
            </div>
            <p class="team-name">${isWinner2}${table[i].teams.away.name}</p>

        </div>
        <div class="match-bottom">

                <p>dane1</p>
                <p>dane2</p>
                <p>dane2</p>
                <p>dane2</p>
                <p>dane2</p>
                <p>dane2</p>
                

            </div>
       </div>`;

    patternAll += pattern;
    isWinner1 = "";
    isWinner2 = "";
  }
  body.innerHTML = patternAll;
  createListenerMatch(table);
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

function createListenerMatch(table) {
  const matchComponent = document.querySelectorAll(".match");
  matchComponent.forEach((el) => {
    el.addEventListener("click", () => {
      localStorage.setItem(
        "data-match",
        JSON.stringify(table[el.getAttribute("data-id")])
      );
      el.querySelector(".match-bottom").classList.toggle("active");
    });
  });
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
      // console.log(res)
      createLiveMatches(liveScores.reverse());
    })
    .catch((err) => console.log(err));
}

//   responseLiveMatches()

CountrySelectValue();
