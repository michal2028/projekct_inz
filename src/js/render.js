export { createLiveMatches, generateEventsMatch };
import { getNormalDate } from "./additions.js";
import { createListenerMatch } from "./matches.js";

function generateEventHTML(event) {
  if (event === "Yellow Card") {
    return `<img src="./src/icons/matches_icon/yellow-card.png" alt="yellow card">`;
  }
  if (event === "Normal Goal" || event === "Own Goal") {
    return `<img src="./src/icons/matches_icon/goal.png" alt="football ball">`;
  }
  if (event === "Red Card") {
    return `<img src="./src/icons/matches_icon/red.png" alt="red card">`;
  } else {
    return `<p class="event-text">${event}</p>`;
  }
}

function generateEventsMatch(table, el) {
  const teamLeft = el.querySelector(".team-left");
  const teamRight = el.querySelector(".team-right");
  let homeAll = "";
  let awayAll = "";

  teamLeft.innerHTML = "";
  teamRight.innerHTML = "";

  for (let i = 0; i < table.length; i++) {
    let home = "";
    let away = "";
    let event = generateEventHTML(table[i].events.detail);
    if (table[i].events.type !== "subst") {
      if (
        table[i].events.team.name ===
        el.querySelector(".team-name-first").innerText
      ) {
        home = `<div class="event-left"><p class="event-time">${table[i].events.time.elapsed}'</p><p class="event-player">${table[i].events.player.name}</p><p class="event-detail">${event}</p>
      </div>`;
        homeAll = homeAll + home;
      }
      if (
        table[i].events.team.name ===
        el.querySelector(".team-name-second").innerText
      ) {
        away = `<div class="event-right"><p class="event-time">${table[i].events.time.elapsed}'</p><p class="event-player">${table[i].events.player.name}</p><p class="event-detail">${event}</p></div>
      `;
        awayAll = awayAll + away;
      }
    }
  }
  teamRight.innerHTML = awayAll;
  teamLeft.innerHTML = homeAll;
}

function createLiveMatches(table) {
  const detailsTable = [];
  const body = document.querySelector(".matches-body");
  body.innerHTML = "";
  let patternAll = "";
  let isWinner1 = "";
  let isWinner2 = "";
  //  console.log(table)
  for (let i = 0; i < table.length; i++) {
    if (
      table[i].matchInfo.matchTime === null ||
      table[i].score.home === null ||
      table[i].score.away === null
    ) {
      table[i].matchInfo.matchTime = table[i].matchInfo.status;
      table[i].score.home = "-";
      table[i].score.away = "-";
    }
    if (table[i].matchInfo.status.toLowerCase() === "match finished") {
      if (table[i].score.home === table[i].score.away) {
        //
      } else if (table[i].teams.home.winner === true) {
        isWinner1 = `winner`;
      } else {
        isWinner2 = `winner`;
      }
    }

    let pattern = ` <div data-id=${i} data-fixture=${
      table[i].matchInfo.fixtureId
    } class="match">
        <p>${getNormalDate(table[i].matchInfo.data)}</p>
        <div class="match-top">
        <p class="team-name-first ${isWinner1}">${table[i].teams.home.name}</p>
        <p class="team-name-second ${isWinner2}">${table[i].teams.away.name}</p>
        <div class="team-1">
                <img src=${table[i].teams.home.logo} alt=" logo${
      table[i].teams.away.name
    }">
            </div>
            <p class="time">${table[i].matchInfo.matchTime}'</p>  
            <div class="score-1">
            <span>${table[i].score.home}</span>
             </div>
             <div class="score-2">
             <span>${table[i].score.away}</span>
             </div>
            <div class="team-2">
                <img src=${table[i].teams.away.logo} alt="logo ${
      table[i].teams.away.name
    }">
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
  createListenerMatch(table, detailsTable);
}
const createCountryElement = (countries) => {
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
  const leagues = document.querySelectorAll(selectorCss);
  leagues.forEach((el) => {
    el.addEventListener("click", function () {
      choose = el.getAttribute("data-id");
      callback(choose);
    });
  });
}
function createLeagueElement(leagues) {
  const body = document.querySelector(".table");
  body.innerHTML = "";
  let patternAll = "";
  let stats = `<div class="table-box"><div class="table-box-text">
  <span class="lp">#</span>
  <span class="name">Team</span>
  <span class="matches">Matches</span>
  <span class="wins">Wins</span>
  <span class="draw">Draws</span>
  <span class="lose">Loses</span>
  <span class="goals">Balance</span>
  <span class="points">Points</span>
  <span class="balance">Last matches</span>  
</div></div>`;

  if (leagues === false) {
    const errorMessage = `<div class="error"><p>We can't download this data, sorry</p></div>`;
    body.innerHTML = errorMessage;
  } else {
    for (let i = 0; i < leagues.length; i++) {
      let form = generateFormHTML(leagues[i].form);
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
          ${form}
        </div>
      </div>
    </div>`;

      patternAll = patternAll + pattern;
    }

    body.innerHTML = stats + patternAll;
    body.scrollIntoView({ behavior: "smooth" });
  }
}

function generateFormHTML(formString) {
  const arr = formString.split("");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "W") {
      arr[i] = `<span class="form-win">${arr[i]}</span>`;
    }
    if (arr[i] === "D") {
      arr[i] = `<span class="form-remis">${arr[i]}</span>`;
    }
    if (arr[i] === "L") {
      arr[i] = `<span class="form-lose">${arr[i]}</span>`;
    }
  }
  return arr.join("");
}

function createElementPlayers(players) {
  const body = document.querySelector(".players");

  let patternAll = "";
  body.innerHTML = "";
  const playersBox = document.createElement("div");
  playersBox.classList.add("players-box");
  const logoBox = document.createElement("div");
  logoBox.classList.add("players-logo-box");
  const logoSrc = [];
  const teamLogo = document.querySelectorAll(".table-box");
  teamLogo.forEach((el) => {
    if (el.getAttribute("data-id") === players[0].team_id) {
      logoSrc.push(el.querySelector(".table-box-text img").src);
      logoSrc.push(el.querySelector(".name").innerHTML);
      // logoSrc.push(el.querySelector(".table-box-text name").innerText);
    }
  });
  const header = `<div class="player-box top">
  <p class="player-name"><img src="./src/icons/id.png" alt="id_card"> Name</p>
     <p class="player-age"> <img src="./src/icons/age.png" alt="age symbol"> Age</p>
     <p class="player-number"><img src="./src/icons/shirt.png" alt="tshirt"> Number</p>
     <p class="player-position"><img src="./src/icons/location.png" alt="google pin"> Position</p>
   </div>`;
  const logo = `<div class="players-logo-box-text">
  <h3>${logoSrc[1]}</h3>
  <img src="${logoSrc[0]}">
</div>
<h4>Squad</h4>`;

  for (let i = 0; i < players.length; i++) {
    let positionIcon = generatePlayerPositionHTML(players[i].position);
    let pattern = `
    <div class="player-box" data-id=${players[i].player_id}>
    <div class="photos"><img class="first"src=${logoSrc[0]} alt=${logoSrc[1]}>
    <img src=${players[i].png} class="second" alt="image ${players[i].name}"> </div>
    
      <p class="player-name">${players[i].name}</p>
      <p class="player-age">${players[i].age}</p>
      <p class="player-number">${players[i].number}</p>
      <p class="player-position">${positionIcon}${players[i].position}</p>
    </div>`;
    patternAll = patternAll + pattern;
  }
  logoBox.innerHTML = logo;
  playersBox.innerHTML = header + patternAll;
  body.appendChild(logoBox);
  body.appendChild(playersBox);
  body.scrollIntoView({ behavior: "smooth" });
}
function generatePlayerPositionHTML(playerPos) {
  if (playerPos === "Goalkeeper") {
    return `<img src="./src/icons/players_icon/goalkeeper.png" author="Freepik" alt="goalkeeper icon">`;
  }
  if (playerPos === "Defender") {
    return `<img src="./src/icons/players_icon/shield.png"
    author="Freepik" alt="shield icon">`;
  }
  if (playerPos === "Midfielder") {
    return `<img src="./src/icons/players_icon/injury.png"
    author="Freepik" alt="shirt with plus icon">`;
  }
  if (playerPos === "Attacker") {
    return `<img src="./src/icons/players_icon/soccer-player.png"
    author="Freepik" alt="soccer player icon">`;
  }
}

function createPlayerStatistics(players) {
  const body = document.querySelector(".player-stats");
  body.innerHTML = "";
  let documentBody = "";
  let tournamentInfo = "";
  let patternInfo = ` 
  <div class="player-stats-info">
  <img src=${players.player.photo} alt="photo ${players.player.name}" class="player-stats-image">
  <div class="player-stats-attributes">
    <span>Name:</span><p class="name"> ${players.player.name}</p>
    <span>Age:</span><p class="age"> ${players.player.age}</p>
    <span>Height:</span><p class="height"> ${players.player.height}</p>
    <span>Weight:</span><p class="weight"> ${players.player.weight}</p>
    <span>Birth:</span><p class="birth">${players.player.birth.date}</p>
    <span>Nationality:</span><p class="nationality"> ${players.player.nationality}</p>
    </div>
  </div>`;

  for (let i = 0; i < players.statistics.length; i++) {
    let position = generatePlayerPositionHTML(
      players.statistics[i].statistics.games.position
    );
    let tournamentPattern = `<div class="player-stats-turnaments">
    <p class="season">season ${players.statistics[i].statistics.league.season}</p>
    <div class="turnaments-top">
    <div class="league">
        
        <img  class="logo"src= ${players.statistics[i].statistics.league.logo} alt= "${players.statistics[i].statistics.league.name} logo">
        <p class="name"> ${players.statistics[i].statistics.league.name}</p>
    </div>
    <div class="team">
      
      <img class ="logo" src= ${players.statistics[i].statistics.team.logo} alt= "${players.statistics[i].statistics.name} logo">
      <p class="name">${players.statistics[i].statistics.team.name}</p>
    </div>
  </div>
  <div class="turnaments-mid">
     <div class="turnaments-box"><h5><img src="./src/icons/stats_icon/red-card.png" author="Smashicons" alt="fotball cards">Cards</h5><span>yellow cards:</span> <p class="yellow">  ${players.statistics[i].statistics.cards.yellow}</p>
     <span>red cards:</span> <p class="red">  ${players.statistics[i].statistics.cards.red}</p> </div>
     <div class="turnaments-box"><h5><img src="./src/icons/stats_icon/axe.png" author="Darius Dan" alt="axes">Duels</h5>   <span>duels total:</span><p class="total">   ${players.statistics[i].statistics.duels.total}</p>
     <span>duels won:</span><p class="won"> ${players.statistics[i].statistics.duels.won}</p>
   </div>
     <div class="turnaments-box"> <h5><img src="./src/icons/stats_icon/referee.png" author="Freepik" alt="football judge">Drawns</h5>    <span>fouls drawn:</span><p class="drawn"> ${players.statistics[i].statistics.fouls.drawn}</p>
     <span>fouls committed:</span><p class="commited"> ${players.statistics[i].statistics.fouls.committed}</p>
     </div>
     <div class="turnaments-box"> <h5><img src="./src/icons/stats_icon/stadium.png" author="Freepik" alt="football stadion">Games</h5> <span>games appearences:</span><p class="appearences">  ${players.statistics[i].statistics.games.appearences}</p>
     <span>lineups:</span><p class="lineups"> ${players.statistics[i].statistics.games.lineups}</p>
     <span>minutes:</span><p class="minutes"> ${players.statistics[i].statistics.games.minutes}</p>
     <span>position: </span><p class="position">${players.statistics[i].statistics.games.position}${position}</p>
     <span>rating:</span> <p class="rating"> ${players.statistics[i].statistics.games.rating}<img src="./src/icons/stats_icon/star.png" author=" Pixel perfect" alt="gold star"></p>
      </div>
     <div class="turnaments-box"><h5><img src="./src/icons/stats_icon/award.png" author="Freepik" alt="gold award">Goals</h5> <span>goals total:</span><p class="total"> ${players.statistics[i].statistics.goals.total}</p>
     <span>assists:</span><p class="assists"> ${players.statistics[i].statistics.goals.assists}</p>
      </div>
     <div class="turnaments-box"><h5><img src="./src/icons/stats_icon/passing.png" author=" Marz Gallery" alt="Football passes image"> Passes</h5> <span>passes total: </span><p class="total">${players.statistics[i].statistics.passes.total}</p>
     <span>passes key:</span><p class="key"> ${players.statistics[i].statistics.passes.key}</p>
     <span>accuracy:</span><p class="accuracy"> ${players.statistics[i].statistics.passes.accuracy}</p> </div>
     <div class="turnaments-box"><h5><img src="./src/icons/stats_icon/bullet.png" author="Smashicons" alt="bullet in fire">Shots</h5> <span>total shots:</span><p class="total"> ${players.statistics[i].statistics.shots.total}</p>
     <span>On enemy gate:</span><p class="on"> ${players.statistics[i].statistics.shots.on}</p></div>
  </div>
  </div>`;

    tournamentInfo = tournamentInfo + tournamentPattern;
  }

  documentBody = patternInfo + tournamentInfo;
  body.innerHTML = documentBody;
  body.scrollIntoView({ behavior: "smooth" });
}

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
