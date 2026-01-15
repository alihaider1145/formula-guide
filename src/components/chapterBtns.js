import globalState from "../state";
import { createEle } from "../dom-utils.js";

function genChapterBtns(){
    while(document.querySelector(".chapter").lastChild){
       document.querySelector(".chapter").removeChild(document.querySelector(".chapter").lastChild); 
    }

    const subj = globalState.getState().subject;
    const grade = globalState.getState().grade;
    const num = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
    for(let i = 0; i < globalState.getState()[`${subj}Chapter`][grade]; i++){
        const chapterBtn = createEle("button", `Chapter ${num[i]}`, document.querySelector(".chapter"));
        chapterBtn.classList.add("chapter__btn", "btn");
    }

    return document.querySelectorAll(".chapter__btn");
}

export { genChapterBtns };