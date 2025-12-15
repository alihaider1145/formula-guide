import { populateCard } from "./dom-gen-cards.js";

// Generates cards for one chapter based on subject type
function genContentCards(data, number, grade, topic) {
    const chapterDiv = document.createElement('div');
    chapterDiv.classList.add(`${topic}__${grade}__chapter-${number}`, 'chapter', "hidden");
    document.querySelector(`.${topic}`).appendChild(chapterDiv);

    const chapterTitle = document.createElement('h2');
    chapterTitle.classList.add(`${topic}__chapter-title`, 'title');
    chapterTitle.textContent = `Chapter ${number}`;
    chapterDiv.appendChild(chapterTitle);

    const items = data[topic];

    // Iterate through each content type for the subject
    if (items && Array.isArray(items)) {
        for (const item of items) {
            const cardType = `${topic.slice(0, -1)}`; // Remove plural 's'
            chapterDiv.appendChild(populateCard(item, cardType));
        }
    }
    else{
        alert("the topic array was not found");
    }

    MathJax.typesetPromise();
}

export { genContentCards };