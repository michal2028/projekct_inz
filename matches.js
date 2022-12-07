const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "dc935f1d6emsh3dde368f85b528ep1aca42jsnaaeaf9657fab",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };
  
function createLiveMatches(table){
 const body = document.querySelector('.matches-body');
 body.innerHTML = ""
 let patternAll = '';
    for(let i =0;i<table.length;i++){
      
        let pattern = ` <div data-id=${i} class="match">
        <div class="match-top">
            <p class="time">${table[i].matchInfo.matchTime}</p>
            <p class="team-name">${table[i].teams.home.name}</p>
            <div class="team">
                <img src=${table[i].teams.home.logo} alt="">
            </div>
            <div class="score">
                <p>${table[i].score.home}:${table[i].score.away}</p>
            </div>
            <div class="team">
                <img src=${table[i].teams.away.logo} alt="">
            </div>
            <p class="team-name">${table[i].teams.away.name}</p>
       
        </div>
       
       </div>`

       patternAll += pattern;
    }
    body.innerHTML = patternAll;
    createListenerMatch(table);
}

function createListenerMatch(table){
const matchComponent = document.querySelectorAll('.match');
    matchComponent.forEach(el=>{

        el.addEventListener('click', () =>{
            console.log(el)
            localStorage.setItem("data-match",JSON.stringify(table[el.getAttribute("data-id")]))
            window.open('./match.html')
        })
    })

}


function responseLiveMatches(){
   
   
    let liveScores =[]
    fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all',options)
    .then(res => res.json())
    .then(res =>{
        liveScores = res.response.map(el=>{

            return{
                matchInfo:{
                    data: el.fixture.date,
                    id: el.fixture.id,
                    matchTime: el.fixture.status.elapsed,
                    half: el.fixture.status.long,
                    stadion: el.fixture.venue.name

                },
                score:{
                    home:el.goals.home,
                    away:el.goals.away
                },
                league:{
                    country:el.league.country,
                    countryId:el.league.id,
                    countryFlag:el.league.flag,
                    leagueName:el.league.name,
                    leagueLogo:el.league.logo,
                    season: el.league.season
                },
                teams:{
                    home:{
                        id:el.teams.home.id,
                        logo:el.teams.home.logo,
                        name:el.teams.home.name,
                        winner:el.teams.home.winner
                        
                    },
                    away:{
                        id:el.teams.away.id,
                        logo:el.teams.away.logo,
                        name:el.teams.away.name,
                        winner:el.teams.away.winner
                    }
                }

            }


        })
      
        createLiveMatches(liveScores)
    })
    .catch(err => console.log(err))

    
  }
  
  responseLiveMatches()
  
