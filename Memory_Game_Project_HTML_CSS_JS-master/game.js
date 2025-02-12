const griddisplay = document.querySelector('#gameBoard');
const scoretime = document.querySelector(".scoretime")
const resultdisplay = document.querySelector("#score")
const timedisplay = document.querySelector("#time");
const won = document.querySelector("#won");
const sec = document.querySelector("#sec");
const startgame = document.getElementById("start");
const head = document.querySelector(".head");
const mem = document.querySelector(".mem");

const cardArray = [
    {
        name : "Thor",
        image : 'img/thor.jpg'
    },
    {
        name:"Iron Man",
        image:"img/ironman.jpg"
    },
    {
        name:"Captain",
        image:"img/captainamerica.jpg"
    },
    {
        name:"Spider Man",
        image:"img/spiderman.jpg"
    },
    {
        name:"Batman",
        image:"img/batman.jpg"
    },
    {
        name:"Joker",
        image:"img/joker.jpg"
    },
    {
        name : "Thor",
        image : "img/thor.jpg"
    },
    {
        name:"Iron Man",
        image:"img/ironman.jpg"
    },
    {
        name:"Captain",
        image:"img/captainamerica.jpg"
    },
    {
        name:"Spider Man",
        image:"img/spiderman.jpg"
    },
    {
        name:"Batman",
        image:"img/batman.jpg"
    },
    {
        name:"Joker",
        image:"img/joker.jpg"
    },
    {
        name:"Deadpool",
        image:"img/deadpool.jpg"
    },
    {
        name:"Wolverine",
        image:"img/wolverine.jpg"
    },
    {
        name:"Thanos",
        image:"img/thanos.jpg"
    },
    {
        name:"Superman",
        image:"img/superman.jpg"
    },
    {
        name:"Deadpool",
        image:"img/deadpool.jpg"
    },
    {
        name:"Wolverine",
        image:"img/wolverine.jpg"
    },
    {
        name:"Thanos",
        image:"img/thanos.jpg"
    },
    {
        name:"Superman",
        image:"img/superman.jpg"
    }
];


let score = 0;
let time = 0;
let interval;

startgame.addEventListener("click", () =>{
    shuffleCards();
    generateboard();
    startgame.style.display = "none";
    griddisplay.style.border = "2px solid black";
    scoretime.style.gridTemplateColumns = "1fr 1fr";
    head.classList.remove("head");
    mem.style.margin = "0";
    resultdisplay.innerHTML = "Score : 0";
    scoretime.style.marginBottom = "0";
    timedisplay.innerHTML = "Time : 00 Seconds";
});



function shuffleCards(){
    for(let i=cardArray.length-1;i>=0;i--)
    {
        const randIndex = Math.floor(Math.random()*(i+1));
        [cardArray[i],cardArray[randIndex]] = [cardArray[randIndex],cardArray[i]]; //swapping
    }
}

function generateboard(){
    for(let i=0; i<cardArray.length; i++)
    {
        const card = document.createElement('img');
        card.setAttribute('src','img/bg.jpg');
        card.setAttribute('id',i);
        card.addEventListener('click',flipcard);
        griddisplay.appendChild(card);  
    }
    interval = setInterval(() => {
        time++;
        timedisplay.innerHTML = "Time : " + padZero(time) + " Seconds";
    } , 1000);
}

function padZero(num)
{
    return num<10?"0"+num:num;
}

card_chosen = [];
card_chosen_id = [];

function flipcard(){
    const card_id = this.getAttribute("id");
    this.setAttribute('src',cardArray[card_id].image);
    card_chosen_id.push(card_id);
    card_chosen.push(cardArray[card_id].name);
    this.removeEventListener('click',flipcard);

    if(card_chosen.length === 2)
    {
        setTimeout(checkmatch,500);
    }
    
}

cardsWon = [];

function checkmatch(){
    const cards = document.querySelectorAll('img');

    if(card_chosen[0] === card_chosen[1])
    {
        cards[card_chosen_id[0]].setAttribute('src','img/done.jpg');
        cards[card_chosen_id[1]].setAttribute('src','img/done.jpg');
        cards[card_chosen_id[0]].style.border = "none";
        cards[card_chosen_id[1]].style.border = "none";
        cardsWon.push(card_chosen);
        resultdisplay.innerHTML = "Score : " + cardsWon.length;
    }
    else{
        cards[card_chosen_id[0]].setAttribute('src','img/bg.jpg')
        cards[card_chosen_id[1]].setAttribute('src','img/bg.jpg')
        cards[card_chosen_id[0]].addEventListener('click',flipcard);
        cards[card_chosen_id[1]].addEventListener('click',flipcard);
    }

    card_chosen = [];
    card_chosen_id = [];

    if(cardsWon.length == cardArray.length/2)
    {
        griddisplay.remove('img');
        clearInterval(interval);
        won.innerHTML = `You have successfully completed the game`;
    }

}