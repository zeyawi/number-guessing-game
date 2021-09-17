// random number and max try times and history records
let randomNumber = Math.floor(Math.random()*100+1);
const totalTryTimes = 7;
let history = []

// button
const submitButton = document.querySelector('#ng-submit');
const restartButton = document.querySelector('#ng-restart');
restartButton.style.display = "none";

// text
const divHistory = document.querySelector('.ng-history');
const divRestTimes = document.querySelector('.ng-rest-times');
const divPrompt = document.querySelector('.ng-prompt');

// form
const inputGuessNumber = document.querySelector('#game-input');

// event binding
submitButton.addEventListener('click', checkGuess);
restartButton.addEventListener('click', setGameRestart);

// key binding
inputGuessNumber.addEventListener("keyup",function (event){
    if(event.keyCode===13){
        checkGuess();
    }
});
document.body.addEventListener("keyup",function (event){
    console.log(event)
    if(event.key==="r"){
        setGameRestart();
    }
});

function setGameStatusColor(status){
    if(status === "right"){
        divPrompt.style.color="#6fff6f";
    }else {
        divPrompt.style.color="#ff0f0f";
    }
}

function setGameRestart(){
    randomNumber = Math.floor(Math.random()*100+1);
    history = [];
    submitButton.disabled = false;
    inputGuessNumber.disabled = false;
    divHistory.textContent = "";
    divRestTimes.textContent = "";
    divPrompt.textContent = "";
    restartButton.style.display = "none";
    inputGuessNumber.focus();
}
function timesUsedUp(){
    submitButton.disabled = true;
    inputGuessNumber.disabled = true;
    divRestTimes.textContent = "Rest times used up";
    divPrompt.textContent = "Game Over";
    restartButton.style.display = "block";
}

function guessTooHigh(restTimes){
    setGameStatusColor("wrong")
    divHistory.textContent =  "Previous guesses : " + String(history);
    if(restTimes===0){
        timesUsedUp();
    }else{
        divRestTimes.textContent = "Rest times : " + String(restTimes);
        divPrompt.textContent = "Wrong! Last guess was too high!"
    }
}
function guessTooLow(restTimes){
    setGameStatusColor("wrong")
    divHistory.textContent =  "Previous guesses : " + String(history);
    if(restTimes===0){
        timesUsedUp();
    }else{
        divRestTimes.textContent = "Rest times : " + String(restTimes);
        divPrompt.textContent = "Wrong! Last guess was too low!"
    }
}
function guessRight(){
    setGameStatusColor("right")
    divHistory.textContent =  "Previous guesses : " + String(history);
    divRestTimes.textContent = "";
    divPrompt.textContent = "Congratulations! You got it right!";
    submitButton.disabled = true;
    inputGuessNumber.disabled = true;
    restartButton.style.display = "block";
}

function checkGuess(){
    const val = Number(inputGuessNumber.value);
    if(val<1 || val> 99){
        setGameStatusColor("wrong");
        divHistory.textContent = "";
        divRestTimes.textContent = ""
        divPrompt.textContent = "Input a integer range from 1 to 99";
        inputGuessNumber.value = undefined;
        inputGuessNumber.focus();
        return;
    }
    history.push(val)
    inputGuessNumber.value = undefined;
    const restTimes = totalTryTimes - history.length;
    if(val<randomNumber){
        guessTooLow(restTimes);
    }else if(val>randomNumber){
        guessTooHigh(restTimes)
    }else{
        guessRight();
    }
    inputGuessNumber.focus();
}

