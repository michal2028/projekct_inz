import { responseLiveMatches } from "./matches.js";

function upButton(){
  const body = document.querySelector('body')
  const button = document.querySelector('.up-button');
  button.addEventListener('click',() =>{
    body.scrollIntoView({ behavior: "smooth" })
  })
}

function removeClass(cssRule) {
    const country = document.querySelectorAll(".country-list p");
    country.forEach((el) => {
      if (el.classList.contains(cssRule)) {
        el.classList.remove(cssRule);
      }
    });
  }
  function getNormalDate(data){
    let date = data.substring(0,10) + " " + data.substring(11,16)
    return date;
  }
  function dateValidation(date1,date2){
    
    const parsedDate1 = new Date(date1)
    const parsedDate2 = new Date(date2)
    if(parsedDate1 > parsedDate2){
      
      return false;
    }

   return true;
  }

function generateError(section, error="can't load data, sorry"){
  const errorMessage = `<p class="error-message">${error}</p>`;
  section.innerHTML = "";
  section.innerHTML = errorMessage;

}

function clearHTML(){
  const table = document.querySelector('.table');
  const players = document.querySelector('.players')
  const playerStats = document.querySelector('.player-stats')
  table.innerHTML = "";
  playerStats.innerHTML ="";
  players.innerHTML = "";
}

function selectDateFrom(selectOption) {
  const dateFrom = document.getElementById("date-from");
  dateFrom.disabled = false;
  dateFrom.addEventListener("change", () => {
    selectOption.from = dateFrom.value;
    selectDateTo(selectOption);
  });
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

export {removeClass,getNormalDate,dateValidation,generateError,clearHTML,selectDateFrom,upButton}