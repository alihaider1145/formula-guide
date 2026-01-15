import globalState from "./state";
import { genChapterBtns } from "./components/chapterBtns";
import { genCards } from "./components/cards";
import { fetchData, fetchURL } from "./api-utils.js";
let cards;

function transitionContainer(container, action){
    if(action === "hide"){
        container.classList.add("hidden");
    }
    else if(action === 'show'){
        container.classList.remove("hidden");
    }
}

function subjectHandler(e){
    globalState.setState({subject: e.target.textContent.split(" ").join("-").toLowerCase()}) ;
    transitionContainer(document.querySelector(".grade-wrapper"), "show");
    transitionContainer(document.querySelector(".subject-wrapper"), "hide");
    transitionContainer(document.querySelector(".back-btn-wrapper"), "show");
}

function gradeHandler(e){
    globalState.setState({grade: e.target.textContent.split(" ").join("-").toLowerCase()}) ;
    transitionContainer(document.querySelector(".grade-wrapper"), "hide");
    if(globalState.getState().subject === "physics"){
        transitionContainer(document.querySelector(".topic__physics"), "show");
    }
    else if(globalState.getState().subject === "maths"){
        transitionContainer(document.querySelector(".topic__maths"), "show");
    }
}

async function topicHandler(e){
    globalState.setState({topic: e.target.textContent.split(" ").join("-").toLowerCase()}) ;
    //physics topics that have a single json files
    if(globalState.getState().topic === "units" 
    || globalState.getState().topic === "constants"){
        cards = await genCards();
        transitionContainer(document.querySelector(".content-wrapper"), "show");
        transitionContainer(document.querySelector(".topic__physics"), "hide");
        return;
    }
    //physics topics with chapter wise json files
    else if(globalState.getState().topic === "formulas" 
    || globalState.getState().topic === "theories"){
        genChapterBtns();
        transitionContainer(document.querySelector(".chapter-wrapper"), "show");
        transitionContainer(document.querySelector(".topic__physics"), "hide");
        return;
    }
    //math topics
    else{
        genChapterBtns();
        transitionContainer(document.querySelector(".chapter-wrapper"), "show");
        transitionContainer(document.querySelector(".topic__maths"), "hide");
    }
}

async function chapterHandler(e){
    globalState.setState({chapter: e.target.textContent.split(" ").join("-").toLowerCase()}) ;
    cards = await genCards();
    transitionContainer(document.querySelector(".content-wrapper"), "show");
    transitionContainer(document.querySelector(".chapter-wrapper"), "hide");
}

function backBtnHandler(){
    if(!document.querySelector(".content-wrapper").classList.contains("hidden")){
        if(globalState.getState().chapter){
            transitionContainer(document.querySelector(".content-wrapper"), "hide");
            transitionContainer(document.querySelector(".chapter-wrapper"), "show");
            globalState.getState().chapter = null;
        }
        else if(globalState.getState().topic){
            transitionContainer(document.querySelector(".content-wrapper"), "hide");
            if(globalState.getState().subject === "physics"){
                transitionContainer(document.querySelector(".topic__physics"), "show");
            }
            else if(globalState.getState().subject === "maths"){
                transitionContainer(document.querySelector(".topic__maths"), "show");
            }
            globalState.getState().topic = null;
        }
    }
    else if(!document.querySelector(".chapter-wrapper").classList.contains("hidden")){
        transitionContainer(document.querySelector(".chapter-wrapper"), "hide");
        if(globalState.getState().subject === "physics"){
            transitionContainer(document.querySelector(".topic__physics"), "show");
        }
        else if(globalState.getState().subject === "maths"){
            transitionContainer(document.querySelector(".topic__maths"), "show");
        }
        globalState.getState().topic = null;
    }
    else if((!document.querySelector(".topic__physics").classList.contains("hidden"))||(!document.querySelector(".topic__maths").classList.contains("hidden"))){
        if(globalState.getState().subject === "physics"){
            transitionContainer(document.querySelector(".topic__physics"), "hide");
        }
        else if(globalState.getState().subject === "maths"){
            transitionContainer(document.querySelector(".topic__maths"), "hide");
        }
        transitionContainer(document.querySelector(".grade-wrapper"), "show");
        globalState.getState().grade = null;
    }
    else if(!document.querySelector(".grade-wrapper").classList.contains("hidden")){
        transitionContainer(document.querySelector(".grade-wrapper"), "hide");
        transitionContainer(document.querySelector(".subject-wrapper"), "show");
        transitionContainer(document.querySelector(".back-btn-wrapper"), "hide");
        globalState.getState().subject = null;
    }
}

export { subjectHandler, gradeHandler, topicHandler, chapterHandler, backBtnHandler };
