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
    
    let parsedDate1 = new Date(date1)
    let parsedDate2 = new Date(date2)
    if(parsedDate1 > parsedDate2){
      
      return false;
    }

   return true;
  }

function generateError(section, error="can't load data, sorry"){
  let errorMessage = `<p class="error-message">${error}</p>`;
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


export {removeClass,getNormalDate,dateValidation,generateError,clearHTML}