/* Initialize SFX*/
const bgMusic = new Audio('./sounds/Jungle music.wav'); 
bgMusic.loop = true;
bgMusic.load();
bgMusic.autoplay = true;  // starts Background music upon clicking on a cell 
const gameOverLose = new Audio('./sounds/gameover.mp3'); 
gameOverLose.load();
gameOverLose.loop= true;
const monkeySound = new Audio('./sounds/Monkey scream.wav');
monkeySound.load();
const youWonSound = new Audio('./sounds/you won.wav');
youWonSound.load();
const playAgainButton = document.getElementById("play-again");
playAgainButton.addEventListener("click", playAgain);
const backButton = document.getElementById("back");
backButton.addEventListener("click", back);

/* Variable declarations */
const board = document.getElementById("status");
const score = document.getElementById("score");
let bananas = 0;

/* Initialize DOM */
let grid = document.querySelector(".grid");
let cells = grid.children;
console.log("Here's the collections of cells", cells);

/* Generate a random index for the monkey cell, give each cell an event listener */
function randNum(min, max) { return Math.floor(Math.random()*cells.length); } 
let monkeyCell = cells[randNum(0,cells.length)];
console.log(monkeyCell.getAttribute("id"));
for (let i = 0; i < cells.length; i++) { cells[i].addEventListener("click", guess); }

/* function to check if the cell has been hit. If so, perform necessary actions */
let bananasToFind = cells.length-1;
let gameIsOver = false;


function guess(event) { 
        bgMusic.play();
        let clickedCell = document.getElementById(event.target.getAttribute("id"));                           
        console.log("Here is the clicked cell's ID: ", clickedCell);
        const pop = new Audio('./sounds/pop.mp3');
        pop.currentTime = 0;
        pop.load();

        

        if (clickedCell === monkeyCell) {  /* It checks every hit if it's the monkey */
            monkeySound.play();
            clickedCell.style.backgroundImage = "url('pictures/monkey-boo!.png')";
            board.innerText = "Game Over! The monkey caught you. \n You Got:";
            gameOver();   
            deactivateCell()
            gameOverLose.play();
        } else { 
                bananas++;
                console.log(bananas);
                score.innerText = bananas;
                board.innerText = randomPhrase();
                pop.play();
                deactivateCell();

            if (bananas == bananasToFind) {
                 clickedCell.style.backgroundImage = "url('pictures/banana.png')";
                 monkeyCell.style.backgroundImage = "url('pictures/frustrated monkey.png')";
                 clickedCell.removeEventListener("click", guess);
                 gameOver();
                 deactivateCell();
                 board.innerText = "You Won! \n You have bagged all the bananas!";
                 youWonSound.play();
            }     
        }

        function deactivateCell() {
            if(gameIsOver) {
                for (let i = 0; i < cells.length; i++) {
                    cells[i].style.border = "5px solid rgb(129, 163, 71)"; 
                    cells[i].style.backgroundColor = "rgb(206, 206, 183)";
                }
                
            } else {
                clickedCell.style.backgroundImage = "url('pictures/banana.png')";
                clickedCell.removeEventListener("click", guess);
                
            }
       }
}   

/* This function shows random phrases. To eliminate repetition, previously used phrase will be removed */
function randomPhrase() {
    let phrases = new Array (
        "You’ve got the instincts of a tiger!",
        "Swinging through like a true jungle explorer!",
        "That’s a wild success!",
        "You’re roaring with confidence!",
        "Spot on, just like a jaguar in the night!",
        "That’s the way, jungle master!",
        "Perfect aim, like an eagle’s!",
        "You’re as clever as a monkey!",
        "Trekking through like a pro adventurer!",
        "Bingo! You’re the king of this jungle!",
    );
    function randNum(min, max) { return Math.floor(Math.random()*phrases.length); } /* Generate a random index */ 
    let randPhrase = phrases[randNum(0,cells.length)]; 
    return randPhrase;
}
/* Finally, the gameOver function */
function gameOver() {
    gameIsOver = true;
    bgMusic.pause();
    removeAllListeners();
    let finalScore = bananas;
    score.innerText = finalScore;
    playAgainButton.style.display = "flex";
}
function removeAllListeners() { /* A function to remove all listeners, triggered when the game is over */
    for (let i = 0; i < cells.length; i++) { cells[i].removeEventListener("click", guess); }
}
function playAgain() {
    location.reload();
}
function back() {
    location.replace("index.html");
}





/* This is a project of mine so I can be familiar again with programming, 
test my logical power and imagination though writting codes. This is just a generic name that over time will 
get updated with more functions and features to make it as exciting and fun to play.

I do hope that along the way,
 I will be able to make the code as efficient and as precise as I could, 
 promoting flexibility and readabilty 

===================================================================================================================

Monkey Boo project all rights reserved 2024

Mechanics:

Reveal the monkey when there is only 1 cell left (meaning all fruits were gathered) - done
Add more Buttons and options like "Try again" and revise scoring system - done
Get as much fruit as you can by click-guessing on each of the cells - done
Different fruits will be added (different points)
Add more cells 
Different fruits will be added (different points)
difficulty progress (more monkeys will be added)


User Interface/Audio:
User interface should be improved - long term plan
more SFX
Get the BG music running - ys but with flaw
===================================================================================================================
PSEUDOCODE

Pseudocode Monkey Boo!

Everytime the player clicks, checks two conditions

1. if it hits the cell containing the monkey, then call gameOver function. Otherwise, register the click and store it in an incrementing variable.
   and then prevent the player from clicking on the cell.
2.If the player has enough bananas, call gameOver function


gameOver function:

If bananas were all gathered, do action 1
Otherwise, do action 2

Finally,
 displays the final score; disable clicks on all cells; the "Play again Button"(reset the browser)


Action 1: play winning audio, reveal monkey 1
Action 2: play losing audio, reveal monkey 2

===================================================================================================================

 UPDATES WRITTEN HERE 




















*/










