import { getNormalDate } from "./additions.js";
// index
const createCountryElement = (countries) => {
  console.log(countries);
  const body = document.querySelector(".league-body");
  const leagues = document.querySelector(".table");
  const players = document.querySelector(".players");
  players.innerHTML = "";
  leagues.innerHTML = "";
  body.innerHTML = "";
  let patternAll = "";

  for (let i = 0; i < countries.length; i++) {
    let pattern = ` <div data-id=${countries[i].league.id} class="league-box">
		
		 <div class="league-box-mid">
     
		   <div class="league-box-mid-img">
			 <img src=${countries[i].league.png} alt=${countries[i].league.name} >
		   <p>${countries[i].league.name}</p>
		   </div>
		   
			 
		   
		   
		 </div>
	 </div>`;

    patternAll = patternAll + pattern;
  }

  body.innerHTML = patternAll;
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
    body.scrollIntoView({behavior:"smooth"})
  }
  
}

function createElementPlayers(players) {
  console.log(players);
  const body = document.querySelector(".players");

  let patternAll = "";
  body.innerHTML = "";
  const playersBox = document.createElement("div");
  playersBox.classList.add("players-box");
  const logoBox = document.createElement("div");
  logoBox.classList.add("players-logo-box");
  let logoSrc = [];
  const teamLogo = document.querySelectorAll(".table-box");
  teamLogo.forEach((el) => {
    if (el.getAttribute("data-id") === players[0].team_id) {
      logoSrc.push(el.querySelector(".table-box-text img").src);
      logoSrc.push(el.querySelector(".name").innerHTML);
      // logoSrc.push(el.querySelector(".table-box-text name").innerText);
    }
  });

  let logo = `<div class="players-logo-box-text">
  <img src=${logoSrc[0]} alt=${logoSrc[1]}>
  <h3>${logoSrc[1]}</h3>
</div>
<h4>Squad</h4>`;

  for (let i = 0; i < players.length; i++) {
    let pattern = `
    <div class="player-box" data-id=${players[i].player_id}>
      <img src=${players[i].png} alt="">
      <p class="player-name">${players[i].name}</p>
      <p class="player-age">${players[i].age}</p>
      <p class="player-number">${players[i].number}</p>
      <p class="player-position">${players[i].position}</p>
    </div>`;
    patternAll = patternAll + pattern;
  }
  logoBox.innerHTML = logo;
  playersBox.innerHTML = patternAll;
  body.appendChild(logoBox);
  body.appendChild(playersBox);
  body.scrollIntoView({behavior:"smooth"})
}

function createPlayerStatistics(players) {
  console.log(players);
  const body = document.querySelector(".player-stats");
  body.innerHTML = "";
  let documentBody = "";
  let tournamentInfo = "";
  let patternInfo = ` <img src=${players.player.photo} alt="photo ${players.player.name}" class="player-stats-image">
  <div class="player-stats-info">
    <p class="name">name: ${players.player.name}</p>
    <p class="age">age: ${players.player.age}</p>
    <p class="height">height: ${players.player.height}</p>
    <p class="weight">weight: ${players.player.weight}</p>
    <p class="birth">birth: ${players.player.birth.country}, ${players.player.birth.date}, ${players.player.birth.place}</p>
    <p class="nationality">nationality: ${players.player.nationality}</p>
  </div>`;

  for (let i = 0; i < players.statistics.length; i++) {
    let tournamentPattern = `<div class="player-stats-turnaments">
    <div class="league">
        <p class="name">league-name: ${players.statistics[i].statistics.league.name}</p>
        <img  class="logo"src= ${players.statistics[i].statistics.league.logo} alt= ${players.statistics[i].statistics.league.name}>
        <p class="season">season:  ${players.statistics[i].statistics.league.season}</p>
    </div>
    <div class="team">
      <p class="name">team name: ${players.statistics[i].statistics.team.name}</p>
      <img class ="logo" src= ${players.statistics[i].statistics.team.logo} alt= ${players.statistics[i].statistics.name}>
    </div>
  
     <div class="cards">
        <p class="yellow">yellow cards:  ${players.statistics[i].statistics.cards.yellow}</p>
        <p class="red">red cards:  ${players.statistics[i].statistics.cards.red}</p>
     </div>
     <div class="duels">
        <p class="total"> duels total:  ${players.statistics[i].statistics.duels.total}</p>
        <p class="won">duels won: ${players.statistics[i].statistics.duels.won}</p>
     </div>
     <div class="fouls">
        <p class="drawn">fouls drawn: ${players.statistics[i].statistics.fouls.drawn}</p>
        <p class="commited">fouls committed: ${players.statistics[i].statistics.fouls.committed}</p>
     </div>
     <div class="games">
        <p class="appearences"> games appearences: ${players.statistics[i].statistics.games.appearences}</p>
        <p class="lineups">lineups: ${players.statistics[i].statistics.games.lineups}</p>
        <p class"minutes">minutes: ${players.statistics[i].statistics.games.minutes}</p>
        <p class="position">position: ${players.statistics[i].statistics.games.position}</p>
        <p class="rating">rating: ${players.statistics[i].statistics.games.rating}</p>
     </div>
     <div class="goals">
        <p class="total">goals total: ${players.statistics[i].statistics.goals.total}</p>
        <p class="assists">assists: ${players.statistics[i].statistics.goals.assists}</p>
     </div>
     <div class="passes">
      <p class="total">passes total: ${players.statistics[i].statistics.passes.total}</p>
      <p class="key">passes key: ${players.statistics[i].statistics.passes.key}</p>
      <p class="accuracy">accuracy: ${players.statistics[i].statistics.passes.accuracy}</p>
     </div>
     <div class="shots">
        <p class="total">total shots: ${players.statistics[i].statistics.shots.total}</p>
        <p class="on">on: ${players.statistics[i].statistics.shots.on}</p>
     </div>
  
  </div>`;

    tournamentInfo = tournamentInfo + tournamentPattern;
  }

  documentBody = patternInfo + tournamentInfo;
  body.innerHTML = documentBody;
  body.scrollIntoView({behavior:"smooth"})
}

// matches

function choosePlayer(callback) {
  const body = document.querySelectorAll(".player-box");

  body.forEach((el) => {
    el.addEventListener("click", () => {
      callback(el.getAttribute("data-id"));
    });
  });
}

export {
  createCountryElement,
  renderContent,
  createLeagueElement,
  createElementPlayers,
  choosePlayer,
  createPlayerStatistics,
};
