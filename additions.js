function removeClass(cssRule) {
    const country = document.querySelectorAll(".country-list p");
    country.forEach((el) => {
      if (el.classList.contains(cssRule)) {
        el.classList.remove(cssRule);
      }
    });
  }


export {removeClass}