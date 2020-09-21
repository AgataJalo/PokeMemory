const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('flip');
        //1 kliknięcie
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 
        //2 kliknięcie
        hasFlippedCard=false;
        secondCard=this;

        checkForMatch();
    
}


function checkForMatch(){
//czy to te same karty?
let isMath = firstCard.dataset.framework === 
secondCard.dataset.framework;
   isMath ? disableCards() : unflipCards ();
}

function disableCards (){
    //jezeli te same
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click',flipCard);

    resetBoard();
}

function unflipCards(){
    lockBoard = true;
//nie pasują
setTimeout(()=>{
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip'); 
    lockBoard = false; 
    resetBoard();     
 },1000)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard,secondCard]= [null,null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    });
})();


cards.forEach(card =>card.addEventListener('click', flipCard));