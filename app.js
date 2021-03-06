/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let scores, roundScore, activePlayer, gamePlaying;
// Init
init();


// Roll dice event
document.querySelector(".btn-roll").addEventListener("click", function(){
    if( gamePlaying ) {
        let dice = Math.floor( (Math.random() * 6 ) +1);
        // Display the result
        let diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";


        if( dice !== 1 ){
            // Add score
            roundScore += dice;

            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer()
        }   
    }
});
// Hold click event
document.querySelector(".btn-hold").addEventListener("click", function() {
    if( gamePlaying ) {
        // Update score
        scores[activePlayer] += roundScore;
        // Change styles
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if( scores[activePlayer] >= 20 ) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            // Next turn 
            nextPlayer()
        }
    }
});
// New game button event listener
document.querySelector(".btn-new").addEventListener("click", init);


function init() {
    // Init
    scores = [0,0]; // 0 -> player 1, 1 -> player 2
    roundScore = 0;
    activePlayer = 0; // 0 first, 1 the second
    gamePlaying = true;

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
}


// Side effect funtion that changes the player that is playing to the next
function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;         
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    // Style active player
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    // Hide dice
    document.querySelector(".dice").style.display = "none";
}



