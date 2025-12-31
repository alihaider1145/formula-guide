import globalState from "../state";
import { createEle } from "../dom-utils.js";

function genChapterBtns(){
    const subj = globalState.getState().subject;
    const grade = globalState.getState().grade;
    const num = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
    for(let i = 0; i < globalState.getState()[`${subj}Chapter`][grade]; i++){
        const chapterBtn = createEle("button", `Chapter ${num[i]}`, document.querySelector(".chapter"));
        chapterBtn.classList.add("chapter__btn", "btn");
        console.log(chapterBtn);
        console.log(chapterBtn.parentElement);
    }

    return document.querySelectorAll(".chapter__btn");
}

export { genChapterBtns };