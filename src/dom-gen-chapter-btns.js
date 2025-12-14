import { countFiles } from "./data-utils.js";
import { chapterBtnFunc } from "./dom-buttons.js";

function countTotalChapters(subject, grade) {
    const totalChapters = countFiles(subject, grade);
    return totalChapters;
}

async function genChapterBtns(totalChapters){
    let num = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
    for (let i = 0; i < (await totalChapters); i++) {
        const chapterBtn = document.createElement("button");
        chapterBtn.classList.add("chapter__btn", "btn");
        chapterBtn.textContent = `Chapter ${num[i]}`;
        document.querySelector(".chapter").appendChild(chapterBtn);

        chapterBtn.addEventListener("click", chapterBtnFunc)
    }
}

export { genChapterBtns, countTotalChapters }