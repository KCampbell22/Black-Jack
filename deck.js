const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export default class Deck{
    constructor(cards = freshDeck()) {
        this.cards = cards
    }

    get numbeOfCards() {
        return this.cards.length; // this is a getter
    }
    
    shuffle() {
        for (let i = this.numbeOfCards - 1; i > 0; i--) { 
           const newIndex =  Math.floor(Math.random() * (i + 1));
           const oldIndex = this.cards[newIndex]; 
           this.cards[newIndex] = this.cards[i];
           this.cards[i] = oldIndex;

   }
}
}



export class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        return this.suit === '♠' || this.suit === '♣' ? 'black' : 'red';
    }
    getHtml() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.suit;
        cardDiv.classList.add('card', this.color);
        cardDiv.dataset.value = `${this.value} ${this.suit}`;
        return cardDiv;
        
        }

    addScore() {
       let score;
        if (this.value === 'A') {
           if (document.querySelector('.player-score').innerHTML > '10') {
               return score =+ 1;
           }
              else {
                    return score =+ 11;
                }
            
            
        } else if (this.value === 'J' || this.value === 'Q' || this.value === 'K') {
            return 10;
        } else {
            return score =+ this.value;
        }
        
    }

    combineCardValues() {
        
    }
        
}






 function freshDeck() {
    return SUITS.flatMap( suit => {
      return VALUES.map( value => {
            return new Card(suit, value);
        })
    })
}