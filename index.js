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
Bank.bankRoll = parseInt(bankTotal.innerHTML);
Bank.betIncrement = betLimit;
Bank.betAmount = parseInt(betTotal.innerHTML);
const deck = new Deck();




window.onload = () =>  {
    document.querySelector('[data-hit-button]').disabled = true;
    document.querySelector('[data-bet-button]').disabled = true;  
    document.querySelector('[data-next-round').style.display = 'none';
}




function startGame() {
    // check if hit button is clicked

        
        deck.shuffle();
       const playerCardOne = deck.cards.pop()
       const playerCardTwo = deck.cards.pop();
       const computerCardOne = deck.cards.pop()
       const computerCardTwo= deck.cards.pop()
       //Handle the Ace score less than 10 ace is 11, if score is above 11 ace is 1
        
       
       playerCards.appendChild(playerCardOne.getHtml());
       playerCards.appendChild(playerCardTwo.getHtml());
       computerCards.appendChild(computerCardOne.getHtml());
       computerCards.appendChild(computerCardTwo.getHtml());

        playerScoreAmmount.innerHTML = parseInt(playerCardOne.addScore()) + parseInt(playerCardTwo.addScore());
        computerScoreAmmount.innerHTML = parseInt(computerCardOne.addScore()) + parseInt(computerCardTwo.addScore());
        
        for (var item in playerCards.children) {
            if (item.value === 'A') {
                if (playerScoreAmmount.innerHTML > '10') {
                    item.innerHTML = '1';
                }
                else {
                    item.innerHTML = '11';
                }
            }
        }
        for (var item in computerCards.children) {
            if (item.value === 'A') {
                if (computerScoreAmmount.innerHTML > '10') {
                    item.innerHTML = '1';
                }
                else {
                    item.innerHTML = '11';
                }
            }
        }


        if (parseInt(computerScoreAmmount.innerHTML) < '16') {
            let computerCard = deck.cards.pop();
            computerCards.appendChild(computerCard.getHtml());
            computerScoreAmmount.innerHTML = parseInt(computerScoreAmmount.innerHTML) + parseInt(computerCard.addScore());

        }
    }

        
       


document.querySelector('[data-raise-button]').addEventListener('click', () => {
    betTotal.innerHTML = Bank.betAmount;
    bankTotal.innerHTML = Bank.bankRoll;
    Bank.raise();
    document.querySelector('[data-hit-button]').disabled = false;
    document.querySelector('[data-bet-button]').disabled = false;

    if (betTotal.innerHTML === bankTotal.innerHTML) {
        document.querySelector('[data-raise-button]').disabled = true;
    }
}); 

document.querySelector('[data-bet-button]').addEventListener('click',  function() {
    Bank.betAmount =betTotal.innerHTML 
    Bank.bankRoll = bankTotal.innerHTML 
    Bank.bet();
    startGame();
    document.querySelector('[data-raise-button]').disabled = true;
});

document.querySelector('[data-lower-button]').addEventListener('click', function() {
    betTotal.innerHTML = Bank.betAmount;
    bankTotal.innerHTML = Bank.bankRoll;
    Bank.lower();
    document.querySelector('[data-hit-button]').disabled = false;
    document.querySelector('[data-bet-button]').disabled = false;

    if (betTotal.innerHTML === '0') {
        document.querySelector('[data-lower-button]').disabled = true;
    }

});

document.querySelector('[data-hit-button]').addEventListener('click', function() {
    let playerCard = deck.cards.pop();
    let dealerCard = deck.cards.pop();
    playerCards.appendChild(playerCard.getHtml());
    computerCards.appendChild(dealerCard.getHtml());
    playerScoreAmmount.innerHTML = parseInt(playerScoreAmmount.innerHTML) + parseInt(playerCard.addScore());
    computerScoreAmmount.innerHTML = parseInt(computerScoreAmmount.innerHTML) + parseInt(dealerCard.addScore());
    if (playerScoreAmmount.innerHTML > '21' && computerScoreAmmount.innerHTML < '21' || computerScoreAmmount.innerHTML == '21') {
        document.querySelector('[data-hit-button]').disabled = true;
        document.querySelector('[data-next-round]').style.display = 'block';
        let winner = document.createElement('div');
        winner.className = 'winner';
        winner.innerText = 'You Lose';
        let scoreSection = document.querySelector('.scores')
        scoreSection.appendChild(winner);
        gameOver();
    }
    if (playerScoreAmmount.innerHTML > '21' && computerScoreAmmount.innerHTML > '21') {
        document.querySelector('[data-hit-button]').disabled = true;
        document.querySelector('[data-next-round]').style.display = 'block';
        let winner = document.createElement('div');
        winner.className = 'winner';
        winner.innerText = 'You Lose';
        let scoreSection = document.querySelector('.scores')
        scoreSection.appendChild(winner);
        gameOver();
    }
    if (computerScoreAmmount.innerHTML > '21' && playerScoreAmmount.innerHTML < '21' || playerScoreAmmount.innerHTML == '21') {
        document.querySelector('[data-hit-button]').disabled = true;
        document.querySelector('[data-next-round]').style.display = 'block';
        let winner = document.createElement('div');
        winner.className = 'winner';
        winner.innerText = 'You win';
        let scoreSection = document.querySelector('.scores')
        scoreSection.appendChild(winner);
        gameOver();
    }

    
});



document.querySelector('[data-next-round]').addEventListener('click', function() {
    // reomove all cards
    while (playerCards.firstChild) {
        playerCards.removeChild(playerCards.firstChild);
    }
    while (computerCards.firstChild) {
        computerCards.removeChild(computerCards.firstChild);
    }
    // reset the score
    playerScoreAmmount.innerHTML = '0';
    computerScoreAmmount.innerHTML = '0';
    // reset the bet
    betTotal.innerHTML = 0;
    
    // reset butttons
    document.querySelector('[data-hit-button]').disabled = true;
    document.querySelector('[data-bet-button]').disabled = true;
    document.querySelector('[data-raise-button]').disabled = false;
    document.querySelector('[data-next-round]').style.display = 'none';
    document.querySelector('[data-raise-button]').style.display = 'block';


    
    playerScoreAmmount.innerHTML = '0';
    computerScoreAmmount.innerHTML = '0';
    document.querySelector('.winner').innerHTML = '';
});

document.querySelector('[data-stand-button]').addEventListener('click', winningConditions); 
    // winning conditions


function winningConditions(){
    if (playerScoreAmmount.innerHTML > '21' && computerScoreAmmount.innerHTML < '21' || computerScoreAmmount.innerHTML == '21') {
        document.querySelector('[data-hit-button]').disabled = true;
        document.querySelector('[data-next-round]').style.display = 'block';
        let winner = document.createElement('div');
        winner.className = 'winner';
        winner.innerText = 'You Lose';
        let scoreSection = document.querySelector('.scores')
        scoreSection.appendChild(winner);
    }
    if (playerScoreAmmount.innerHTML < '21' && computerScoreAmmount.innerHTML > '21') {
        document.querySelector('[data-hit-button]').disabled = true;
        document.querySelector('[data-next-round]').style.display = 'block';
        let winner = document.createElement('div');
        winner.className = 'winner';
        winner.innerText = 'You Win';
        let scoreSection = document.querySelector('.scores')
        scoreSection.appendChild(winner);
    }
}
//game is over when bank is empty
function gameOver(){
    winningConditions();
    if (bankTotal.innerHTML == '0' ) {
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
        while (playerCards.firstChild) {
            playerCards.removeChild(playerCards.firstChild);
        }
        while (computerCards.firstChild) {
            computerCards.removeChild(computerCards.firstChild);
        }

        
    }

    

}











     

