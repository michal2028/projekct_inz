import { dateValidation, selectDateFrom } from "./additions.js";
import { createLiveMatches, generateEventsMatch } from "./render.js";
export { createListenerMatch, responseLiveMatches,CountrySelectValue };
import { options } from "./env.js";

function CountrySelectValue() {
  const select = document.getElementById("country-select");
  let selectOption = {
    country: null,
    league: null,
    from: null,
    to: null,
  };
  if(select !== null){
    select.addEventListener("change", () => {
      selectOption.country = select.value;
      generateLeaguesSelect(select.value, selectOption);
    });
  }
}

function inputLeaguesIntoSelect(leagues, selectOption) {
  const select = document.getElementById("league-select");
  select.innerHTML = "";
  select.disabled = false;
  for (let value in leagues) {
    const options = document.createElement("option");
    options.innerText = leagues[value].league.name;
    options.value = leagues[value].league.id;
    options.classList.add("league-option");
    select.append(options);
  }
  leagueSelectValue(document.getElementById("league-select"), selectOption);
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
      inputLeaguesIntoSelect(countries, selectOption);
    });
}
function matchDetails(fixture, detailsTable, el) {
  let detailsMatch = [];
  fetch(
    `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${fixture}`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      detailsTable.push(fixture);
      detailsMatch = res.response[0].events.map((el) => {
        return {
          events: el,
        };
      });
      generateEventsMatch(detailsMatch, el);
    })
    .catch((err) => console.log(err));
}

function createListenerMatch(detailsTable) {
  const matchComponent = document.querySelectorAll(".match");
  matchComponent.forEach((el) => {
    el.addEventListener("click", () => {
      const fixture = el.getAttribute("data-fixture");
      if (!detailsTable.includes(fixture)) {
        matchDetails(fixture, detailsTable, el);
      }
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
      createLiveMatches(liveScores.reverse());
    })
    .catch((err) => console.log(err));
}

CountrySelectValue()
