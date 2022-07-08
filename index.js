import Deck from './deck.js';
import Card from './deck.js';
import bank from './bank.js';


const Bank = new bank();
const computerCards = document.querySelector('.dealer-cards');
const playerCards = document.querySelector('.player-cards');
let betTotal = document.querySelector('[data-bet-amount]')
let bankTotal = document.querySelector('[data-bank]');
let playerScoreAmmount = document.querySelector('.player-score');
let computerScoreAmmount = document.querySelector('.dealer-score');

let betLimit = 10;
let buttonArea = document.querySelector('.scores')
Bank.bankRoll = parseInt(bankTotal.innerText);
Bank.betIncrement = betLimit;
Bank.betAmount = parseInt(betTotal.innerText);
const deck = new Deck();




window.onload = () =>  {
    document.querySelector('[data-hit-button]').disabled = true;
    document.querySelector('[data-bet-button]').disabled = true;  
    document.querySelector('[data-next-round').style.display = 'none';
    gameOver()
}




function startGame() {
    // check if hit button is clicked
        deck.shuffle();
       const playerCardOne = deck.cards.pop()
       const playerCardTwo = deck.cards.pop();
       const computerCardOne = deck.cards.pop()
       
       //Handle the Ace score less than 10 ace is 11, if score is above 11 ace is 1
        
       
       playerCards.appendChild(playerCardOne.getHtml());
       playerCards.appendChild(playerCardTwo.getHtml());
       computerCards.appendChild(computerCardOne.getHtml());
       

        playerScoreAmmount.innerText = parseInt(playerCardOne.addScore()) + parseInt(playerCardTwo.addScore());
        computerScoreAmmount.innerText = parseInt(computerCardOne.addScore());
        
        for (var item in playerCards.children) {
            if (item.value === 'A') {
                if (playerScoreAmmount.innerText >='11' || computerCards.innerText >='11') {
                    item.innerText = '1';
                }
                else {
                    item.innerText = '11';
                }
            }
        }
        for (var item in computerCards.children) {
            if (item.value === 'A') {
                if (computerScoreAmmount.innerText > '10') {
                    item.innerText = '1';
                }
                else {
                    item.innerText = '11';
                }
            }
        }
    }

        
       


document.querySelector('[data-raise-button]').addEventListener('click', () => {
    betTotal.innerText = Bank.betAmount;
    bankTotal.innerText = Bank.bankRoll;
    Bank.raise();
    document.querySelector('[data-hit-button]').disabled = false;
    document.querySelector('[data-bet-button]').disabled = false;

    if (betTotal.innerText == bankTotal.innerText) {
        document.querySelector('[data-raise-button]').disabled = true;
    }
}); 

document.querySelector('[data-bet-button]').addEventListener('click',  function() {
    Bank.betAmount =betTotal.innerText 
    Bank.bankRoll = bankTotal.innerText 
    Bank.bet();
    startGame();
    winningConditions()
    document.querySelector('[data-raise-button]').disabled = true;
});

document.querySelector('[data-lower-button]').addEventListener('click', function() {
    betTotal.innerText = Bank.betAmount;
    bankTotal.innerText = Bank.bankRoll;
    Bank.lower();
    document.querySelector('[data-hit-button]').disabled = false;
    document.querySelector('[data-bet-button]').disabled = false;

    if (betTotal.innerText === '0') {
        document.querySelector('[data-lower-button]').disabled = true;
    }

});

function dealerHit() {
    //checks if stand button is clicked
    //checks if player score is 21 or greater than 21
     
    let dealerSum = parseInt(computerScoreAmmount.innerText);
    if(dealerSum < 17) {
        let computerCard = deck.cards.pop();
        computerCards.appendChild(computerCard.getHtml());
        computerScoreAmmount.innerText = parseInt(computerScoreAmmount.innerText) + parseInt(computerCard.addScore());
        dealerHit();
    }
}

//button event for player to deal cards
document.querySelector('[data-hit-button]').addEventListener('click', function() {
    let playerCard = deck.cards.pop();
    playerCards.appendChild(playerCard.getHtml());
    playerScoreAmmount.innerText = parseInt(playerScoreAmmount.innerText) + parseInt(playerCard.addScore());        
    
    if (playerScoreAmmount.innerText > '21') {
        winningConditions();
        dealerHit();
        gameOver
        document.querySelector('[data-hit-button]').disabled = true;
    }
    if (playerScoreAmmount.innerText == '21') {
        document.querySelector('[data-hit-button]').disabled = true;
        winningConditions();
        dealerHit()
        gameOver();
    }
});

//Once player is done, computer will hit until they have a score of 16 or more



document.querySelector('[data-next-round]').addEventListener('click', function() {
    // reomove all cards
    while (playerCards.firstChild) {
        playerCards.removeChild(playerCards.firstChild);
    }
    while (computerCards.firstChild) {
        computerCards.removeChild(computerCards.firstChild);
    }
    // reset the score
    playerScoreAmmount.innerText = '0';
    computerScoreAmmount.innerText = '0';
    // reset the bet
    betTotal.innerText = 0;
    
    // reset butttons
    document.querySelector('[data-hit-button]').disabled = true;
    document.querySelector('[data-bet-button]').disabled = true;
    document.querySelector('[data-raise-button]').disabled = false;
    document.querySelector('[data-next-round]').style.display = 'none';
    document.querySelector('[data-raise-button]').style.display = 'block';


    
    playerScoreAmmount.innerText = '0';
    computerScoreAmmount.innerText = '0';
    document.querySelector('.winner').innerText = '';
});

document.querySelector('[data-stand-button]').addEventListener('click', function() {
    winningConditions();
    dealerHit();
    gameOver();
}); 
    // winning conditions


function winningConditions(){
    let message = '';
    let playerSum = parseInt(playerScoreAmmount.innerText);
    let computerSum = parseInt(computerScoreAmmount.innerText);
    let winner = document.createElement('div');
        winner.className = 'winner';
    if (playerSum === 21) {
        document.querySelector('[data-hit-button]').disabled = true;
        document.querySelector('[data-next-round]').style.display = 'block';
        message ='You win';
        winner.innerText = message;
        let scoreSection = document.querySelector('.scores')
        scoreSection.appendChild(winner);
        gameOver();

    } 
    
    
    else if(computerSum === 21) {
        document.querySelector('[data-hit-button]').disabled = true;
        document.querySelector('[data-next-round]').style.display = 'block';
        message ='You lose';
        winner.innerText = message;
        let scoreSection = document.querySelector('.scores')
        scoreSection.appendChild(winner);
        gameOver();

    }
    else if (playerSum === 21) {
        document.querySelector('[data-hit-button]').disabled = true;
        document.querySelector('[data-next-round]').style.display = 'block';
        message ='You win';
        winner.innerText = message;
        let scoreSection = document.querySelector('.scores')
        scoreSection.appendChild(winner);
        gameOver();

    }
    else if(computerSum < playerSum && playerSum > 21) {
        document.querySelector('[data-hit-button]').disabled = true;
        document.querySelector('[data-next-round]').style.display = 'block';
        winner.innerText = 'You lose';
        let scoreSection = document.querySelector('.scores')
        scoreSection.appendChild(winner);
        gameOver();

    }
    else if(playerSum < computerSum && computerSum > 21) {
        document.querySelector('[data-hit-button]').disabled = true;
        document.querySelector('[data-next-round]').style.display = 'block';
        message = 'You win';
        winner.innerText = message;
        let scoreSection = document.querySelector('.scores')
        scoreSection.appendChild(winner);
        gameOver();

    }



}
//game is over when bank is empty
function gameOver(){
   
    if (parseInt(bankTotal.innerText) == 0) {

    
    while (playerCards.firstChild) {
        playerCards.removeChild(playerCards.firstChild);
    }
    while (computerCards.firstChild) {
        computerCards.removeChild(computerCards.firstChild);
    }
        let gameEnds = document.createElement('button')
        gameEnds.className = 'game-ends';
        gameEnds.innerText = 'Play Again';
        let scoreSection = document.querySelector('.scores')
        scoreSection.appendChild(gameEnds);
        document.querySelector('[data-next-round').style.display = 'none';
        gameEnds.addEventListener('click', function(){
            location.reload();
        });
        // remove all elements from the screen
        

    }
    


    

}











     

