import { populateCard } from "./dom-gen-cards.js";


//generates card for one chapter
function genConstantCards(data, number, grade){
    const chapterDiv = document.createElement('div');
    chapterDiv.classList.add(`constants__${grade}__chapter-${number}`, 'chapter', "hidden");
    document.querySelector(".constants").appendChild(chapterDiv);

    const chapterTitle = document.createElement('h2');
    chapterTitle.classList.add('constants__chapter-title', 'title');
    chapterTitle.textContent = `Chapter ${number}`;
    chapterDiv.appendChild(chapterTitle);

    for (const constant of data.constants){
        chapterDiv.appendChild(populateCard(constant, "constant"));
    }
    MathJax.typesetPromise();
}

export {  genConstantCards }
