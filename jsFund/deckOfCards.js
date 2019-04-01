class Card{
    constructor(suit,card){
        this.suit = suit;
        this.card = card;
        this.value = Card.cards[card];
    }

    show(){
        console.log(`${this.card} of ${this.suit} `)
    }

    static suits = ['hearts','diamonds','spades','clubs']
    static cards = {
        'ace': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'ten': 10,
        'jack': 11,
        'queen': 12,
        'kind': 13
    }
}

class Deck{
    constructor(){
        this.count = 52;
        this.cards = Deck.create()
    }
    static create(){
        var deckofcards =[]
        for(let i = 0; i < Card.suits.length; i++){
            for (let key in Card.cards) {
                deckofcards.push(new Card(Card.suits[i],key))
            }
        }
        return deckofcards 
    }

    reset() {
        this.cards = Deck.create()
        this.count = 52;
    }

    deal() {
        this.count --;
        return this.cards.pop()
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        return this;
    }
}



