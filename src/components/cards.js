import { createEle } from "../dom-utils.js";
import { fetchData, fetchURL, isLatex } from "../api-utils.js";
import globalState from "../state.js";

function createCard(cardEle){

    const card = createEle('div', null, document.querySelector(".content__cards")); 
    card.classList.add("card");

    const cardTitle = createEle("div", cardEle.card_title, card);
    cardTitle.classList.add('card__title');

    if(cardEle.card_math){
        const cardMath = createEle("div", null, card);
        cardMath.classList.add('card__math');
        cardMath.innerHTML = `\\(${cardEle.card_math}\\)`;
    }

    if(cardEle.card_other){
        let str = cardEle["card_other"];
        const cardOther = createEle("div", null, card);
        cardOther.classList.add('card_other');
        if(isLatex(str)){
            cardOther.innerHTML = `\\(${str}\\)`;
        }
        else{
            cardOther.innerHTML = `${cardEle["card_other"]}`;
        }
    }

    return card;
}

async function genCards(){
    if(document.querySelector(".content__cards")){
       document.querySelector(".content__cards").remove(); 
    }

    const url = fetchURL(globalState.getState().subject, globalState.getState().grade, globalState.getState().chapter);
    const data = await fetchData(url);
    globalState.setState({currentData: data});

    const contentCards = createEle('div', null, document.querySelector(".content"));
    contentCards.classList.add("content__cards");

    const contentTitle = createEle('h2', `${globalState.getState().chapter}`, contentCards);
    contentTitle.classList.add('title', 'content__title');

    for(const cardEle of globalState.getState().currentData.content){
        const card = createCard(cardEle);
    }

    MathJax.typesetPromise();
    
    return contentCards;
}

export { genCards };