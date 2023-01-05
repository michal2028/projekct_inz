import { removeClass, generateError, clearHTML,upButton } from "./additions.js";
import {
  createCountryElement,
  renderContent,
  createLeagueElement,
  createElementPlayers,
  choosePlayer,
  createPlayerStatistics,
} from "./render.js";
import { options } from "./env.js";


function chooseFromList() {
  const country = document.querySelectorAll(".country-list p");
  country.forEach((el) => {
    el.addEventListener("click", () => {
      clearHTML();
      removeClass("p-active");
      const resArray = responseCountry(el.textContent);
      el.classList.add("p-active");
      return resArray;
    });
  });
}

function otherCountries() {
  const button = document.querySelector(".country-button");
  button.addEventListener("click", () => {
    const input = document.getElementById("country-input");
    responseCountry(input.value);
  });
}

function responseLeague(query) {

  console.log(query + "to jest query")
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

function responseTeam(query) {
  let players = [];
  fetch(
    `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${query}`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      players = res.response[0].players.map((el) => {
        if (el.number === null) {
          el.number = "no data";
        }
        return {
          team_id: query,
          age: el.age,
          player_id: el.id,
          name: el.name,
          number: el.number,
          png: el.photo,
          position: el.position,
        };
      });
      console.log(players);
      createElementPlayers(players);
      choosePlayer(responsePlayer);
    })
    .catch((err) => console.log(err));
}

function responsePlayer(playerId) {
  const promise = new Promise((resolve, reject) => {
    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/players?id=${playerId}&season=2022`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        resolve(response);
        if (response.response.length === 0 || response.response.length) {
          reject();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
  let playerData = {
    player: null,
    statistics: null,
  };
  promise
    .then((res) => {
      playerData.player = res.response[0].player;

      playerData.statistics = res.response[0].statistics.map((el) => {
        for (let key in el) {
          for (let key2 in el[key]) {
            if (el[key][key2] === null) {
              el[key][key2] = "no-data";
            }
          }
        }
        return {
          statistics: el,
        };
      });

      createPlayerStatistics(playerData);
    })
    .catch((err) =>
      generateError(document.querySelector(".player-stats"), err)
    );
}

function responseCountry(query) {
  upButton();
  document.addEventListener("DOMContentLoaded", () => {
    responseCountry("poland");
    responseLeague(107)
  });

  let countries;
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
        createCountryElement(countries);

        renderContent(responseLeague, ".league-box");
        otherCountries();
      })

      .catch((err) => console.error(err));
  }
}

responseCountry(chooseFromList());
