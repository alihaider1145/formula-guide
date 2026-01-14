import { createEle } from "../dom-utils.js";
import { fetchData, fetchURL } from "../api-utils.js";
import globalState from "../state.js";

function createCard(cardEle){

    const card = createEle('div', null, document.querySelector(".content__cards")); 
    card.classList.add("card");

    const cardTitle = createEle("div", cardEle.card_title, card);
    cardTitle.classList.add('card__title');

    const cardMath = createEle("div", null, card);
    cardMath.classList.add('card__math');
    cardMath.innerHTML = `\\(${cardEle.card_math}\\)`;

    if(cardEle.card_other){
        const cardOther = createEle("div", null, card);
        cardOther.classList.add('card__other');
        cardOther.innerHTML = `${cardEle["card_other"]}`;
    }

    return card;
}

async function genCards(){
    globalState.setState({currentData: await fetchData(fetchURL())});

    const contentCards = createEle('div', null, document.querySelector(".content"));
    contentCards.classList.add("content__cards");

    const contentTitle = createEle('h2', `${globalState.getState().chapter}`, contentCards);
    contentTitle.classList.add('title', 'content__title');

    for(const cardEle of globalState.getState().currentData.content){
        const card = createCard(cardEle);
    }

    MathJax.typesetPromise();
    
    return document.querySelectorAll(".card");
}

function removeCards(cards){
    cards.forEach(card => {
        card.remove();
    });
}

export { genCards, removeCards };