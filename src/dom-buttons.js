import { countTotalChapters, genChapterBtns } from "./dom-gen-chapter-btns.js";

//add showing the selected chapter in the last event listener
const subjPhysicsBtn = document.querySelector(".subject__physics-btn");
const subjMathsBtn = document.querySelector(".subject__maths-btn");
const grade1stYrBtn = document.querySelector(".grade__1styr-btn");
const grade2ndYrBtn = document.querySelector(".grade__2ndyr-btn");
const topicFormulasBtn = document.querySelector(".topic__formulas-btn");
const topicConstantsBtn = document.querySelector(".topic__constants-btn");
const topicUnitsBtn = document.querySelector(".topic__units-btn");
const backBtn = document.querySelector(".back-btn");
let chapterBtns = [];
const chapterWrapper = document.querySelector(".chapter-wrapper");
const formulaWrapper = document.querySelector(".formula-wrapper");
const constantWrapper = document.querySelector(".constant-wrapper");
const unitWrapper = document.querySelector(".unit-wrapper");
let subject = "";
let grade = "";
let topic = "";
let chapter = "";

//btn section transitions
function transitionSubject(action){
    if(action === "hide"){
        subjPhysicsBtn.parentElement.parentElement.classList.add("hidden");
    }
    else if(action === 'show'){
        subjPhysicsBtn.parentElement.parentElement.classList.remove("hidden");
    }
}

function transitionGrade(action){
    if(action === "hide"){
        grade1stYrBtn.parentElement.parentElement.classList.add("hidden");
    }
    else if(action === 'show'){
        grade1stYrBtn.parentElement.parentElement.classList.remove("hidden");
    }
}

function transitionTopic(action){
    if(action === "hide"){
        topicFormulasBtn.parentElement.parentElement.classList.add("hidden");
    }
    else if(action === 'show'){
        topicFormulasBtn.parentElement.parentElement.classList.remove("hidden");
    }
}

function chapterBtnFunc(event){
    chapter = event.target.textContent.split(" ").join("-").toLowerCase();
    console.log("checkpoint 2");
    document.querySelector(".chapter-wrapper").classList.add("hidden");
    document.querySelector(`.${topic}__${grade}__${chapter}`).classList.remove("hidden");
}

function transitionBackBtn(action){
    if(action === "hide"){
        backBtn.parentElement.classList.add("hidden");
    }
    else if(action === 'show'){
        backBtn.parentElement.classList.remove("hidden");
    }
}

//wrapper section transitions
document.addEventListener("DOMContentLoaded", () => {
    subjPhysicsBtn.addEventListener("click", () => {
        subject = "physics";
        transitionBackBtn("show");
        transitionSubject("hide");
        transitionGrade("show");
    })

    subjMathsBtn.addEventListener("click", () => {
        subject = "maths";
        transitionBackBtn("show");
        transitionSubject("hide");
        transitionGrade("show");
    })

    grade1stYrBtn.addEventListener("click", () => {
        grade = "1st-year";
        transitionTopic("show");
        transitionGrade("hide");
    })

    grade2ndYrBtn.addEventListener("click", () => {
        grade = "2nd-year";
        transitionTopic("show");
        transitionGrade("hide");
    })

    topicConstantsBtn.addEventListener("click", () => {
        topic = "constant";
        transitionTopic("hide");
        genChapterBtns(countTotalChapters(subject, grade, topic));
        chapterBtns = document.querySelectorAll(".chapter__btn");
        document.querySelector(".chapter-wrapper").classList.remove("hidden");
    })

    topicFormulasBtn.addEventListener("click", () => {
        topic = "formula";
        console.log("checkpoint 1");
        transitionTopic("hide");
        genChapterBtns(countTotalChapters(subject, grade, topic));
        chapterBtns = document.querySelectorAll(".chapter__btn");
        document.querySelector(".chapter-wrapper").classList.remove("hidden");
    })

    topicUnitsBtn.addEventListener("click", () => {
        topic = "unit";
        transitionTopic("hide");
        console.log("checkpoint 1");
        genChapterBtns(countTotalChapters(subject, grade, topic));
        chapterBtns = document.querySelectorAll(".chapter__btn");
        document.querySelector(".chapter-wrapper").classList.remove("hidden");
    })

    backBtn.addEventListener("click", () => {
        if(chapter){
            document.querySelector(".chapter-wrapper").classList.remove("hidden");
            document.querySelector(`.${topic}__${grade}__${chapter}`).classList.add("hidden");
            chapter = "";
        }
        else if(topic){
            transitionTopic("show");
            document.querySelector(".chapter-wrapper").classList.add("hidden");
            topic = "";
        }
        else if(grade){
            transitionTopic("hide");
            transitionGrade("show");
            grade = "";
        }
        else if(subject){
            transitionGrade("hide");
            transitionSubject("show");
            transitionBackBtn("hide");
            subject = "";
        }
    })
})

export { chapterBtnFunc };