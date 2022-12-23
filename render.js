
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
  <span class="matches">Matches</span>
  <span class="wins">Wins</span>
  <span class="draw">Draws</span>
  <span class="lose">Loses</span>
  <span class="goals">Balance</span>
  <span class="points">Points</span>
  <span class="balance">Last matches</span>
  
</div></div>`;

  if (leagues === false) {
    let errorMessage = `<div class="error"><p>We can't download this data, sorry</p></div>`;
    body.innerHTML = errorMessage;
  } else {
    for (let i = 0; i < leagues.length; i++) {
      let form = generateFormHTML(leagues[i].form)
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
    body.scrollIntoView({behavior:"smooth"})
  }
  
}

function generateFormHTML(formString){
  

  let arr = formString.split('');
  for(let i =0;i<arr.length;i++){
    if(arr[i] === "W"){
      arr[i] = `<span class="form-win">${arr[i]}</span>`
    }
    if(arr[i] === "D"){
      arr[i] =`<span class="form-remis">${arr[i]}</span>`
    }
    if(arr[i] === "L"){
      arr[i] = `<span class="form-lose">${arr[i]}</span>`
    }
  }
    return arr.join('');
  
  
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
  let header =`<div class="player-box top">
  <p class="player-name"><img src="./icons/id.png" alt=""> Name</p>
     <p class="player-age"> <img src="./icons/age.png" alt=""> Age</p>
     <p class="player-number"><img src="./icons/shirt.png" alt=""> Number</p>
     <p class="player-position"><img src="./icons/location.png" alt=""> Position</p>
   </div>`;
  let logo = `<div class="players-logo-box-text">
  <h3>${logoSrc[1]}</h3>
  <img src="${logoSrc[0]}">
  
</div>

<h4>Squad</h4>`;

  for (let i = 0; i < players.length; i++) {
    let positionIcon = generatePlayerPositionHTML(players[i].position)
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
  body.scrollIntoView({behavior:"smooth"})
}
function generatePlayerPositionHTML(playerPos){
  if(playerPos ==="Goalkeeper"){
    return `<img src="./icons/players_icon/goalkeeper.png" author="Freepik" alt="goalkeeper icon">`
  }
  if(playerPos ==="Defender"){
    return `<img src="./icons/players_icon/shield.png"
    author="Freepik" alt="shield icon">`
  }
  if(playerPos ==="Midfielder"){
    return `<img src="./icons/players_icon/injury.png"
    author="Freepik" alt="shirt with plus icon">`
  }
  if(playerPos ==="Attacker"){
    return `<img src="./icons/players_icon/soccer-player.png"
    author="Freepik" alt="soccer player icon">`
  }
}

function createPlayerStatistics(players) {
  console.log(players);
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
    let position = generatePlayerPositionHTML(players.statistics[i].statistics.games.position)
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
     <div class="turnaments-box"><h5><img src="./icons/stats_icon/red-card.png" author="Smashicons" alt="fotball cards">Cards</h5><span>yellow cards:</span> <p class="yellow">  ${players.statistics[i].statistics.cards.yellow}</p>
     <span>red cards:</span> <p class="red">  ${players.statistics[i].statistics.cards.red}</p> </div>
     <div class="turnaments-box"><h5><img src="./icons/stats_icon/axe.png" author="Darius Dan" alt="axes">Duels</h5>   <span>duels total:</span><p class="total">   ${players.statistics[i].statistics.duels.total}</p>
     <span>duels won:</span><p class="won"> ${players.statistics[i].statistics.duels.won}</p>
   </div>
     <div class="turnaments-box"> <h5><img src="./icons/stats_icon/referee.png" author="Freepik" alt="football judge">Drawns</h5>    <span>fouls drawn:</span><p class="drawn"> ${players.statistics[i].statistics.fouls.drawn}</p>
     <span>fouls committed:</span><p class="commited"> ${players.statistics[i].statistics.fouls.committed}</p>
     </div>
     <div class="turnaments-box"> <h5><img src="./icons/stats_icon/stadium.png" author="Freepik" alt="football stadion">Games</h5> <span>games appearences:</span><p class="appearences">  ${players.statistics[i].statistics.games.appearences}</p>
     <span>lineups:</span><p class="lineups"> ${players.statistics[i].statistics.games.lineups}</p>
     <span>minutes:</span><p class="minutes"> ${players.statistics[i].statistics.games.minutes}</p>
     <span>position: </span><p class="position">${players.statistics[i].statistics.games.position}${position}</p>
     <span>rating:</span> <p class="rating"> ${players.statistics[i].statistics.games.rating}<img src="./icons/stats_icon/star.png" author=" Pixel perfect" alt="gold star"></p>
      </div>
     <div class="turnaments-box"><h5><img src="./icons/stats_icon/award.png" author="Freepik" alt="gold award">Goals</h5> <span>goals total:</span><p class="total"> ${players.statistics[i].statistics.goals.total}</p>
     <span>assists:</span><p class="assists"> ${players.statistics[i].statistics.goals.assists}</p>
      </div>
     <div class="turnaments-box"><h5><img src="./icons/stats_icon/passing.png" author=" Marz Gallery" alt="Football passes image"> Passes</h5> <span>passes total: </span><p class="total">${players.statistics[i].statistics.passes.total}</p>
     <span>passes key:</span><p class="key"> ${players.statistics[i].statistics.passes.key}</p>
     <span>accuracy:</span><p class="accuracy"> ${players.statistics[i].statistics.passes.accuracy}</p> </div>
     <div class="turnaments-box"><h5><img src="./icons/stats_icon/bullet.png" author="Smashicons" alt="bullet in fire">Shots</h5> <span>total shots:</span><p class="total"> ${players.statistics[i].statistics.shots.total}</p>
     <span>On enemy gate:</span><p class="on"> ${players.statistics[i].statistics.shots.on}</p></div>
     
     
     
     
     
 
     
   
     
    
     
    
     
     
     
     
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
