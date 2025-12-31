import { createEle } from "../dom-utils.js";
import globalState from "../state.js";

function createCards(cardEle){

    const card = createEle('div', null, document.querySelector(".content__cards")); 
    card.classList.add("card");

    const cardTitle = createEle("div", cardEle["card_title"], card);
    cardTitle.classList.add('card__title');

    const cardMath = createEle("div", null, card);
    cardMath.classList.add('card__math');
    cardMath.innerHTML = `${cardEle["card_math"]}`;

    const cardOther = createEle("div", null, card);
    cardOther.classList.add('card__other');
    cardOther.innerHTML = `${cardEle["card_other"]}`;

    return card;
}

function genCards(){
    console.log(globalState.getState().currentData);
    const contentCards = createEle('div', null, document.querySelector(".content"));
    contentCards.classList.add("content__cards");

    const contentTitle = createEle('h2', `${globalState.getState().chapter}`, contentCards);
    contentTitle.classList.add('title', 'content__title');

    for(const cardEle of globalState.getState().currentData[globalState.getState().topic]){
        console.log(globalState.getState().currentData);
        console.log(cardEle);
        const card = createCards(cardEle);
    }

    MathJax.typesetPromise();
    
    return document.querySelectorAll(".card");
}

export { genCards };