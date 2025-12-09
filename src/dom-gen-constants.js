import { populateCard } from "./dom-gen-cards.js";


//generates card for one chapter
function genConstantCards(data, number, grade){
    const chapterDiv = document.createElement('div');
    chapterDiv.classList.add(`constant__${grade}__chapter-${number}`, 'chapter', "hidden");
    document.querySelector(".constant").appendChild(chapterDiv);

    const chapterTitle = document.createElement('h2');
    chapterTitle.classList.add('constant__chapter-title', 'title');
    chapterTitle.textContent = `Chapter ${number}`;
    chapterDiv.appendChild(chapterTitle);

    for (const constant of data.constants){
        chapterDiv.appendChild(populateCard(constant, "constant"));
    }
    MathJax.typesetPromise();
}

export {  genConstantCards }
