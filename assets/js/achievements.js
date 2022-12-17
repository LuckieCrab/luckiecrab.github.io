const achievement = document.querySelector('#achievement-template');

let codes = {
    soClose: "1",
    soFar: "2",
    newHigh: "3",
    underMin: "4",
    wayTooClose: "5"
}

let codesInverted = [
    "soClose",
    "soFar",
    "newHigh",
    "underMin",
    "wayTooClose"
]

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}  
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

let achievementText = {
    soClose: "So Close; guess within 100 blocks of the location.",
    soFar: "So Far; guess further than 5000 blocks away from the location.",
    newHigh: "New Highscore; break your high score.",
    underMin: "Under Minimum; reach a score that's less than the minimum.",
    wayTooClose: "Way Too Close; guess within 10 blocks of the location."
}

let achievements = getCookie('achievements');

let achievementsGotten = achievements.split("");

for (i = 0; i < codesInverted.length; i++) {
    let clone = achievement.cloneNode(true);

    clone.id = "";

    let a = achievementText[codesInverted[i]];

    let title = a.split(";")[0];
    let description = a.split(";")[1].replace(" ", "");

    clone.children[1].children[0].innerText = title;
    clone.children[1].children[1].innerText = capitalizeFirstLetter(description);

    let confirmOwned = achievementsGotten.includes(codes[codesInverted[i]]);

    if(!confirmOwned) {
        clone.classList.add('locked');
    }

    achievement.before(clone);
}