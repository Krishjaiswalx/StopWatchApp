const minuteslabel = document.getElementById("minutes");
const secondslabel = document.getElementById("seconds");
const millisecondslabel = document.getElementById("milliseconds");

const startbutton = document.getElementById('startbtn');
const stopbutton = document.getElementById('stopbtn');
const pausebutton = document.getElementById('pausebtn');
const resetbutton = document.getElementById('resetbtn');

const laplist = document.getElementById('laplist');

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

startbutton.addEventListener('click', startTimer);
stopbutton.addEventListener('click', stopTimer);
pausebutton.addEventListener('click', pauseTimer);
resetbutton.addEventListener('click', resetTimer);

function startTimer(){
    interval = setInterval(updateTimer, 10);
    startbutton.disabled = true;
}

function stopTimer(){
    clearInterval(interval);
    addToLapList();
    resetTimerData();
    startbutton.disabled = false;
}

function pauseTimer(){
    clearInterval(interval);
    startbutton.disabled = false;
}

function resetTimer(){
    clearInterval(interval);
    resetTimerData();
    startbutton.disabled = false;
}

function updateTimer(){
    milliseconds++;
    if(milliseconds === 100){  //// 1000  -> 1 seconds = 1000 millseconds
        milliseconds = 0;
        seconds++;
        if(seconds === 60){
            seconds = 0;
            minutes++;
        }
    }
    displayTimer();
}

function displayTimer(){
    millisecondslabel.textContent =  padTime(milliseconds);
    secondslabel.textContent =  padTime(seconds);
    minuteslabel.textContent =  padTime(minutes);
}

function padTime(time){ // to show 2 digit
    return time.toString().padStart(2,'0');
}

function resetTimerData(){
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
}

function addToLapList(){
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${laplist.childElementCount + 1}: </span>${lapTime}`;
    laplist.appendChild(listItem);
}