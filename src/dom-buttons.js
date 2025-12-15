import { countTotalChapters, genChapterBtns } from "./dom-gen-chapter-btns.js";
import { fetchData } from "./data-utils.js";
import { genContentCards } from "./dom-gen-content.js";

const subjPhysicsBtn = document.querySelector(".subject__physics-btn");
const subjMathsBtn = document.querySelector(".subject__maths-btn");
const grade1stYrBtn = document.querySelector(".grade__1styr-btn");
const grade2ndYrBtn = document.querySelector(".grade__2ndyr-btn");
const topicFormulasBtn = document.querySelector(".topic__formulas-btn");
const topicConstantsBtn = document.querySelector(".topic__constants-btn");
const topicUnitsBtn = document.querySelector(".topic__units-btn");
const topicDefinitionBtn = document.querySelector(".topic__definition-btn");
const topicEquationBtn = document.querySelector(".topic__equation-btn");
const topicPropertiesBtn = document.querySelector(".topic__properties-btn");
const topicTheoremBtn = document.querySelector(".topic__theorem-btn");
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
        if(subject === "physics"){
            topicFormulasBtn.parentElement.classList.add("hidden");
        }
        else if(subject === "maths"){
            topicDefinitionBtn.parentElement.classList.add("hidden");
        }
    }
    else if(action === 'show'){
        if(subject === "physics"){
            topicFormulasBtn.parentElement.classList.remove("hidden");
        }
        else if(subject === "maths"){
            topicDefinitionBtn.parentElement.classList.remove("hidden");
        }
    }
}

async function chapterBtnFunc(event){
    chapter = event.target.textContent.split(" ").join("-").toLowerCase();

    let contentContainer = document.querySelector(`.${topic}__${grade}__${chapter}`);
   
    if (!contentContainer) {
        const data = await fetchData(subject, grade, topic, chapter);
         
        if (!data) {
            console.error(`Failed to load ${subject} ${grade} ${topic} ${chapter}`);
            alert("Failed to load chapter data. Please try again.");
            return;
        }
        
        // Convert chapter name to number word (chapter-one -> "one")
        const chapterNum = chapter.replace("chapter-", "");
        
        // Generate cards based on topic type
        genContentCards(data, chapterNum, grade, topic);

        // Add maths topics when you uncomment them
        // else if (topic === "definition") { genDefinitionCards(data, chapterNum, grade); }
        // ... etc

        contentContainer = document.querySelector(`.${topic}__${grade}__${chapter}`);
    }
    
    document.querySelector(".chapter-wrapper").classList.add("hidden");
    contentContainer.classList.remove("hidden");
}

function transitionBackBtn(action){
    if(action === "hide"){
        backBtn.parentElement.classList.add("hidden");
    }
    else if(action === 'show'){
        backBtn.parentElement.classList.remove("hidden");
    }
}

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
        topic = "constants";
        transitionTopic("hide");
        genChapterBtns(countTotalChapters(subject, grade));
        chapterBtns = document.querySelectorAll(".chapter__btn");
        document.querySelector(".chapter-wrapper").classList.remove("hidden");
    })

    topicFormulasBtn.addEventListener("click", () => {
        topic = "formulas";
        transitionTopic("hide");
        genChapterBtns(countTotalChapters(subject, grade));
        chapterBtns = document.querySelectorAll(".chapter__btn");
        document.querySelector(".chapter-wrapper").classList.remove("hidden");
    })

    topicUnitsBtn.addEventListener("click", () => {
        topic = "units";
        transitionTopic("hide");
        genChapterBtns(countTotalChapters(subject, grade));
        chapterBtns = document.querySelectorAll(".chapter__btn");
        document.querySelector(".chapter-wrapper").classList.remove("hidden");
    })

    topicDefinitionBtn.addEventListener("click", () => {
        topic = "definition";
        transitionTopic("hide");
        genChapterBtns(countTotalChapters(subject, grade, topic));
        chapterBtns = document.querySelectorAll(".chapter__btn");
        document.querySelector(".chapter-wrapper").classList.remove("hidden");
    })

    topicEquationBtn.addEventListener("click", () => {
        topic = "equation";
        transitionTopic("hide");
        genChapterBtns(countTotalChapters(subject, grade, topic));
        chapterBtns = document.querySelectorAll(".chapter__btn");
        document.querySelector(".chapter-wrapper").classList.remove("hidden");
    })

    topicPropertiesBtn.addEventListener("click", () => {
        topic = "properties";
        transitionTopic("hide");
        genChapterBtns(countTotalChapters(subject, grade, topic));
        chapterBtns = document.querySelectorAll(".chapter__btn");
        document.querySelector(".chapter-wrapper").classList.remove("hidden");
    })

    topicTheoremBtn.addEventListener("click", () => {
        topic = "theorem";
        transitionTopic("hide");
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