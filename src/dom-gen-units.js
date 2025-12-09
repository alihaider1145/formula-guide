import { populateCard } from "./dom-gen-cards.js";


//generates card for one chapter
function genUnitCards(data, number, grade){
    const chapterDiv = document.createElement('div');
    chapterDiv.classList.add(`unit__${grade}__chapter-${number}`, 'chapter', "hidden");
    document.querySelector(".unit").appendChild(chapterDiv);

    const chapterTitle = document.createElement('h2');
    chapterTitle.classList.add('unit__chapter-title', 'title');
    chapterTitle.textContent = `Chapter ${number}`;
    chapterDiv.appendChild(chapterTitle);

    for (const unit of data.units){
        chapterDiv.appendChild(populateCard(unit, "unit"));
    }
    MathJax.typesetPromise();
}

export {  genUnitCards }
