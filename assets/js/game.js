const queryString = window.location.search, urlParams = new URLSearchParams(queryString);
const dimension = (urlParams.get('d') ? urlParams.get('d') : 'overworld');
const message = document.querySelector('.message');
const center = document.querySelector('.center');
const content = document.querySelector('.content');
const screenshot = document.querySelector('#screenshot');
const controls = document.querySelector('.controls');
const picker = document.querySelector('.picker');
const hotbar = document.querySelector('.hotbar');
const tDisplay = document.querySelector('.stopwatch');
const map = document.querySelector('#map');
const marker = document.querySelector('#marker');
const mapdiv = document.querySelector('#map-div');
const endscreen = document.querySelector('#endscreen');
const endMarker = document.querySelector('#end-marker');
const endLocation = document.querySelector('.end-location');
const endMapDiv = document.querySelector('.end-map');
const endMap = document.querySelector('#end-map');
const score = document.querySelector('.score');
const distanceSpan = document.querySelector('.distance');
const pointsSpan = document.querySelector('#point');
const pointsProgress = document.querySelector('#points');
const demotivation = document.querySelector('#demotivating-message');
const next = document.querySelector('.next');
const results = document.querySelector('#results');
const stats = document.querySelector('#stats');
const totalSpan = document.querySelector('.total');
const highSpan = document.querySelector('.highscore');
const high = document.querySelector('#high');
const highbroke = document.querySelector('#highbroke');
const notif = document.querySelector('#notif-template');
const body = document.body;
let gameCount = 1;
let totalScore = 0;
const screenshotThreshold = {
    overworld: 10,
    nether: 0,
    end: 0
}
const zeropoints = {
    overworld: [5000, 5000],
    nether: [5000, 5000],
    end: [5000, 5000]
}
const blockDimensions = {
    overworld: [10000, 10000],
    nether: [10000, 10000],
    end: [10000, 10000]
}
// you can cheat but is that how you want to play it? also these numbers are modified later but that's too long to explain so will probably fail
const answers = {
    overworld: [
        [5000, 5000],
        [5000, 5000],
        [5000, 5000],
        [5000, 5000],
        [5000, 5000],
        [5000, 5000],
        [5000, 5000],
        [5000, 5000],
        [5000, 5000],
        [5000, 5000]
    ],
    nether: [
        [5000, 5000],
        [5000, 5000],
        [5000, 5000],
        [5000, 5000],
        [5000, 5000]
    ],
    end: [
        [5000, 5000],
        [5000, 5000],
        [5000, 5000],
        [5000, 5000],
        [5000, 5000]
    ]
}
let pastIds = [];
let demotivationalMessages = [
    "[Insert demotivational text]",
    "So close!",
    "Just not yet!",
    "[Insert demotivational text]",
    "Better luck next time!",
    "At least you tried!",
    "It's just a game anyway."
]

document.title = `LoonyGuesser | ${dimension.charAt(0).toUpperCase() + dimension.slice(1)}`

const sleep = s => new Promise(r => setTimeout(r, Math.round(s*1000)));

document.querySelector(".nav").classList.add('hidden');

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
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

document.startCountdown = async function(t, e) {
    e.innerHTML = t;

    for(i = 0; i <= t; i++) {
        e.innerHTML = t - i;

        await sleep(1);
    }

    return;
}

function computeTime (t, e) {
    if(t < 60) {
        e.innerHTML = `00:${t < 10 ? '0' + t : t}`
    } else {
        const minutes = Math.floor(t / 60);
        const seconds = t - Math.floor(t / 60) * 60;

        e.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }
}

let timer;

let t;

document.startTimer = async function (e) {
    t = 0;

    timer = setInterval(add, 1000);

    function add() {
        t = t + 1;

        if(t > 1 * 60) {
            e.classList.add('overtime');
        }

        return computeTime(t, e);
    }
}

document.stopTimer = async function (e) {
    clearInterval(timer);

    e.classList.remove('overtime');
}

let d;
let c;

document.startCountUp = async function (fs) {
    c = 0;
    d = setInterval(addUp, 10);

    function addUp() {
        c = c + fs;

        pointsSpan.innerText = c;
        pointsProgress.value = c;

        return;
    }
}

document.stopCountUp = async function (total) {
    pointsSpan.innerText = total;
    pointsProgress.value = total;
    
    clearInterval(d);
}

function randomScreenshot(dimension) {
    let sid = Math.floor(Math.random() * screenshotThreshold[dimension]);

    if(pastIds.includes(sid)) return randomScreenshot(dimension);

    pastIds.push(sid);

    return `loony_world_${dimension}_${sid}.png`
}

async function game() {
    message.innerHTML = 'Are you ready?';

    await sleep(2);

    message.innerHTML = 'Here we go...';

    await sleep(2);

    await document.startCountdown(3, message);

    message.classList.add('inactive');

    screenshot.src = `/assets/i/${randomScreenshot(dimension)}`;
    endMap.src = `/assets/i/loony_world_${dimension}.png`;
    map.src = `/assets/i/loony_world_${dimension}.png`;

    await sleep(0.3);

    center.classList.add('inactive');

    content.classList.add('active');

    await sleep(0.3);

    $('#full-i').removeClass('active');
    screenshot.classList.add('active');

    document.startTimer(tDisplay);
}

$('#map-div').draggable();
$('#end-map-holder').draggable();

map.addEventListener("auxclick", (evt) => {
    if(evt.button === 2) {
        var x = (evt.pageX - $(map).offset().left) + $(window).scrollLeft();
        var y = (evt.pageY - $(map).offset().top) + $(window).scrollTop();

        marker.style.left = (x - (marker.clientWidth / 2)) + "px";
        marker.style.top = (y - (marker.clientHeight / 2)) + "px";
        marker.style.marginTop = 0 + "px";
        marker.classList.add('active');
    };
});

async function submit () {
    content.classList.remove('active');
    screenshot.classList.remove('active');

    let endTime = t - 5;
    let endX = marker.style.left.split('px')[0];
    let endY = marker.style.top.split("px")[0];
    let answerX = answers[dimension][screenshot.src.split(`${dimension}_`)[1].split('.png')[0]][0] 
    let answerY = answers[dimension][screenshot.src.split(`${dimension}_`)[1].split('.png')[0]][1]
    let answerWorldX = answerX + (blockDimensions[dimension][0] / 2);
    let answerWorldY = answerY + (blockDimensions[dimension][1] / 2);
    let factorX = blockDimensions[dimension][0] / 1000;
    let factorY = blockDimensions[dimension][1] / 1000;
    let answerMapX = answerX / factorX;
    let answerMapY = answerY / factorY;
    let distanceX = (endX > answerMapX ? endX - answerMapX : answerMapX - endX) * factorX;
    let distanceY = (endY > answerMapY ? endY - answerMapY : answerMapY - endY) * factorY;
    let distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)).toFixed();
    let endScore;
    let maxScore;
    let minScore;

    minScore = 1;
    maxScore = 3000;

    dScore = maxScore - Math.expm1(distance / 5000) * 3000;

    endScore = (dScore - (endTime * 15));

    if(endScore < minScore) endScore = minScore;

    totalScore = totalScore + Number(endScore.toFixed());

    if(distance < 100) achievement("soClose");
    if(distance > 5000) achievement("soFar");
    if(endScore < minScore) achievement("underMin");

    distanceSpan.innerText = distance + " blocks";
    pointsSpan.innerText = endScore.toFixed();

    endMarker.style.top = ((endY - (endMarker.clientWidth / 2))) + "px";
    endMarker.style.left = ((endX - (endMarker.clientWidth / 2))) + "px";
    endMarker.style.marginTop = 0 + "px";

    endLocation.style.top = ((answerMapY - (endMarker.clientWidth / 2))) + "px";
    endLocation.style.left = ((answerMapX - (endMarker.clientWidth / 2))) + "px";
    endLocation.style.marginTop = 0 + "px";

    document.stopTimer(tDisplay);

    endscreen.classList.add('active');

    await sleep(0.3);

    endMapDiv.classList.add('active');

    pointsProgress.value = 0;
    pointsSpan.innerText = 0;
    demotivation.innerText = demotivationalMessages[Math.floor(Math.random() * demotivationalMessages.length)];
    
    if(gameCount >= 5) {
        document.querySelector('.next-btn').innerText = "Next";
    }

    await sleep(0.3);

    endMarker.classList.add('active');
    endLocation.classList.add('active');
    score.classList.add('active');

    await sleep(0.3);

    document.startCountUp(Math.floor(endScore / 130));

    await sleep(1.3);

    document.stopCountUp(endScore.toFixed());

    await sleep(0.3);

    next.classList.add('active');
}

async function newGame () {
    if(gameCount >= 5) {
        let cookie = getCookie('highscore');
        let broke;

        if(cookie != "") {
            if(totalScore >= cookie) {
                broke = true;
                setCookie('highscore', totalScore);
                achievement('newHigh')
            }
        } else {
            broke = false;
            setCookie("highscore", totalScore)
        }

        endMarker.classList.remove('active');
        endLocation.classList.remove('active');
        score.classList.remove('active');
        next.classList.remove('active');
        endMapDiv.classList.remove('active');

        await sleep(0.6);

        results.classList.add('active');

        totalSpan.innerText = totalScore;
        highSpan.innerText = cookie || totalScore;

        if(broke == true) {
            highbroke.classList.add('active');
        } else high.classList.add('active')

        $("#endscreen").fireworks();
        jQuery("#endscreen").before(jQuery("canvas")); 

        await sleep(0.3);

        return stats.classList.add('active');
    };

    endMarker.classList.remove('active');
    endLocation.classList.remove('active');
    score.classList.remove('active');
    next.classList.remove('active');
    endMapDiv.classList.remove('active');
    tDisplay.innerText = "00:00";

    await sleep(0.6);

    endscreen.classList.remove('active');

    gameCount = gameCount + 1;

    center.classList.remove('inactive');
    message.innerHTML = `Round ${gameCount}`;

    await sleep(0.3);

    message.classList.remove('inactive');

    await sleep(1.5);

    await document.startCountdown(3, message);

    message.classList.add('inactive');

    screenshot.src = `/assets/i/${randomScreenshot(dimension)}`;
    endMap.src = `/assets/i/loony_world_${dimension}.png`;
    map.src = `/assets/i/loony_world_${dimension}.png`;

    await sleep(0.3);

    center.classList.add('inactive');

    content.classList.add('active');

    await sleep(0.3);

    screenshot.classList.add('active');

    document.startTimer(tDisplay);

    await sleep(2);

    let feedback = getCookie('feedback');

    if(feedback != "true" || !feedback) {
        let random = Math.floor(Math.random() * 15);

        if(random == 7) {
            notification('feedback', 'Send your opinion', '<a style="color:rgba(255, 255, 255, 0.7);text-decoration:underline;cursor:pointer;" href="/feedback.html?ref=ingame" target="_blank">Give feedback</a>', 7)
        }
    }
}

let clone;

async function notification (type, title, content, t) {
    let types = {
        question: "/question.png",
        achievement: "/achievement.png",
        warning: "/warning.png",
        feedback: "/message.png"
    }

    if(!clone) {
        clone = notif.cloneNode(true);

        clone.id = "notification";
    }

    let notifCheck = clone.children[0].children[1].classList.contains('inactive');

    if(notifCheck) {
        await sleep(1);

        return notification(type, title, content, t);
    }

    clone.children[0].children[1].classList.add('inactive');

    clone.children[0].children[0].children[0].src = `/assets/i${types[type] ? types[type] : "/question.png"}`;
    clone.children[0].children[1].children[0].innerHTML = title;
    clone.children[0].children[1].children[1].innerHTML = content;

    if(!document.getElementById('#notification')) {
        notif.after(clone);
    }

    body.style.setProperty('--max-width-notif', clone.children[0].children[1].clientWidth + "px");

    clone.children[0].children[1].classList.remove('inactive');
    clone.children[0].children[1].classList.add('prepare');

    await sleep(.7);

    clone.classList.add('active');

    await sleep(.35);

    clone.children[0].children[1].classList.add('active');

    await sleep(.7);

    clone.children[0].children[1].classList.remove('prepare');

    await sleep(t)

    clone.children[0].children[1].classList.remove('active');
    clone.children[0].children[1].classList.add('prepare');

    await sleep(.35);

    clone.classList.remove('active');

    await sleep(.7)
    
    clone.children[0].children[1].classList.remove('prepare');;
}

async function achievement (a) {
    let codes = {
        soClose: "1",
        soFar: "2",
        newHigh: "3",
        underMin: "4"
    }

    let achievementText = {
        soClose: "So Close; guess within 100 blocks of the location.",
        soFar: "So Far; guess further than 5000 blocks away from the location.",
        newHigh: "New Highscore; break your high score.",
        underMin: "Under Minimum; reach a score that's less than the minimum."
    }

    let code = codes[a];

    if(!code) return;

    let achievements = getCookie('achievements');

    if(achievements && achievements != "") {
        let achievementsGotten = achievements.split("");

        if(achievementsGotten.includes(code)) return;

        setCookie('achievements', achievements + code);

        return notification("achievement", "Achievement Unlocked!", achievementText[a], 7);
    }

    setCookie('achievements', code);

    return notification("achievement", "Achievement Unlocked!", achievementText[a], 7);
}