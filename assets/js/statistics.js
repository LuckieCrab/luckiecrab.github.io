function humanReadable(num) {
    let abbreviations = {
        3: ["K", 1000],
        6: ["M", 1000000],
        9: ["B", 1000000000],
        12: ["t", 1000000000000],
        15: ["q", 1000000000000000]
    }
    
    let zeros = num.toExponential().split("+")[1];

    let value = (abbreviations[zeros] || abbreviations[zeros - 1] || abbreviations[zeros - 2] || abbreviations[15]);
    
    
    return `${(num / value[1]).toFixed(0).toString().endsWith(".0") ? (num / value[1]).toFixed(0) : (num / value[1]).toFixed(1)}${value[0]}`;
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

const points = document.getElementById('points');
const highscore = document.getElementById('highscore');
const rounds = document.getElementById('rounds');

let rPoints = getCookie('score');
let rHighscore = getCookie('highscore');
let rRounds = getCookie('rounds');

rPoints ? points.innerText = (rPoints / 1000) > 1 ? humanReadable(Number(rPoints)) : rPoints : "";
rHighscore ? highscore.innerText = (rHighscore / 1000) > 1 ? humanReadable(Number(rHighscore)) : rHighscore : "";
rRounds ? rounds.innerText = (rRounds / 1000) > 1 ? humanReadable(Number(rRounds)) : rRounds : "";

const aScore = document.getElementById('aScore');
const aTime = document.getElementById('aTime');
const aDistance = document.getElementById('aDistance');

let avgScore = getCookie('score') && getCookie('cScore') ? (getCookie('score') / getCookie('cScore')).toFixed() : false;
let avgTime = getCookie('time') && getCookie('cTime') ? (getCookie('time') / getCookie('cTime')).toFixed() : false;
let avgDistance = getCookie('distance') && getCookie('cDistance') ? (getCookie('distance') / getCookie('cDistance')).toFixed() : false;

avgScore ? aScore.innerText = avgScore : "";
avgTime ? aTime.innerText = avgTime : "";
avgDistance ? aDistance.innerText = avgDistance : "";