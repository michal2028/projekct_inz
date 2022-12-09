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

export {removeClass,getNormalDate}