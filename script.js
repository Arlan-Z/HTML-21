const deck = Array(11).fill(0).map((_, index) => index + 1).sort(() => Math.random() - 0.5);;

const dealerHand = document.getElementById("dealer");
const playerHand = document.getElementById("player");

const passBtn = document.getElementById("pass-btn"),
    pickBtn = document.getElementById("pick-btn");

const resultText = document.getElementById("results");

let plrPnts = 0, dlrPnts = 0;
let isPlrPassed = false, isDlrPassed = false;
let isPlrTurn = true;

giveCards();

function getCard(hand){
    if(deck.length == 0){
        alert("Deck is Empty");
        return;
    }

    card = document.createElement('div');
    card.classList.add('card')

    cardValue = document.createElement('h1');
    value = deck.shift(); 
    cardValue.textContent = value;
    card.appendChild(cardValue); 

    if(hand == "D"){
        dealerHand.appendChild(card);
        dlrPnts += value;
    }
    else{
        playerHand.appendChild(card);
        plrPnts += value

    }
}


function giveCards(){
    for(i = 0; i < 4; i++){
        if(i % 2 == 0){
            getCard('P');
        }
        else{
            getCard('D');
        }
    }

    
}

function pass(){
    playerHand.style.backgroundColor = 'grey';
    isPlrPassed = true;
    changeTurn()
}

function pick(){
    getCard('P');
    changeTurn();
}

async function dealerTurn(){
    await new Promise(resolve => setTimeout(resolve, 500));
    if(dlrPnts < 16) {
        getCard('D')
    }
    else{
        dealerHand.style.backgroundColor = 'grey';
        isDlrPassed = true
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    changeTurn();
}

function changeTurn(){
    if(isDlrPassed && isPlrPassed){
        results();
        return;
    }

    isPlrTurn = !isPlrTurn;

    if(!isPlrTurn){
        passBtn.disabled = true;
        pickBtn.disabled = true;

        if(isDlrPassed) {
            changeTurn();
            return;
        }
        dealerTurn();
    }
    else{
        if(isPlrPassed){
            changeTurn();
            return;
        }
        passBtn.disabled = false;
        pickBtn.disabled = false;
    }
}

async function results(){
    await new Promise(resolve => setTimeout(resolve, 500));

    if(plrPnts > 21) {
        gameEnd("Dealer")
        return
    }

    if(dlrPnts > 21) {
        gameEnd("Player")
        return;
    }

    (21 - plrPnts) < (21 - dlrPnts) ? gameEnd("Player") : gameEnd("Dealer");
    return;
}

function gameEnd(winner){
    resultText.textContent = `${winner} wins!`;
    resultText.style.visibility = 'visible'
}