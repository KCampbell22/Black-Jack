let bankRoll = 100;
const betIncrement = 10;


export default class bank {
    constructor(bankRoll, betAmount,) {
        this.betAmount = betAmount;
        this.bankRoll = bankRoll;
        

    }
    get betAmount() {
        return this._betAmount;
    }
    set betAmount(betAmount) {
        this._betAmount = betAmount;
    }

    get bankRoll() {
        return this._bankRoll;
    }

    set bankRoll(bankRoll) {
        this._bankRoll = bankRoll;
    }
    raise() {
        this.betAmount = parseInt(document.querySelector('[data-bet-amount]').innerHTML) + betIncrement;
        
        
        
    }
    
    lower() {
        this.betAmount = parseInt(document.querySelector('[data-bet-amount]').innerHTML) - betIncrement;
        
        
    }

    bet() {
        this.bankRoll = this.bankRoll - this.betAmount;
        document.querySelector('[data-bank]').innerHTML = this.bankRoll;
        document.querySelector('[data-bet-amount]').innerHTML = this.betAmount;
        
    }
    

    getHTML() {
        let betHTML = document.createElement('div');
        betHTML.innerText = this.betAmount;
        return betHTML;
    }
    
}