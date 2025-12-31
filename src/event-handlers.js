import globalState from "./state";
import { genChapterBtns } from "./components/chapterBtns";
import { genCards } from "./components/cards";
import { fetchData, fetchURL } from "./api-utils.js";

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

function topicHandler(e){
    globalState.setState({topic: e.target.textContent.split(" ").join("-").toLowerCase()}) ;
    //physics topics that have a single json files
    if(globalState.getState().topic === "units" || globalState.getState().topic === "constants"){
        transitionContainer(document.querySelector(".content-wrapper"), "show");
        transitionContainer(document.querySelector(".topic__physics"), "hide");
        return;
    }
    //physics topics with chapter wise json files
    else if(globalState.getState().topic === "formulas"){
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
    globalState.setState({currentData: await fetchData(fetchURL())});
    const cards = genCards();
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
            transitionContainer(document.querySelector(".topic-wrapper"), "show");
            globalState.getState().topic = null;
        }
    }
    else if(!document.querySelector(".chapter-wrapper").classList.contains("hidden")){
        transitionContainer(document.querySelector(".chapter-wrapper"), "hide");
        transitionContainer(document.querySelector(".topic-wrapper"), "show");
        globalState.getState().topic = null;
    }
    else if(!document.querySelector(".topic-wrapper").classList.contains("hidden")){
        transitionContainer(".topic-wrapper", "hide");
        transitionContainer("grade-wrapper", "show");
        globalState.getState().grade = null;
    }
    else if(!document.querySelector(".grade-wrapper").classList.contains("hidden")){
        transitionContainer(".grade-wrapper", "hide");
        transitionContainer(".subject-wrapper", "show");
        transitionContainer(document.querySelector(".back-btn"), "hide");
        globalState.getState().subject = null;
    }
}

export { subjectHandler, gradeHandler, topicHandler, chapterHandler, backBtnHandler };

// //TODO-done(NR): add the logic for units/constants (no chapters)
// async function chapterBtnFunc(event){
//     chapter = event.target.textContent.split(" ").join("-").toLowerCase();

//     let contentContainer = document.querySelector(`.${topic}__${grade}`);
   
//     if (!contentContainer) {
//         const data = await fetchData(subject, grade, topic, chapter);
         
//         if (!data) {
//             console.error(`Failed to load ${subject} ${grade} ${topic} ${chapter}`);
//             alert("Failed to load chapter data. Please try again.");
//             return;
//         }
        
//         // Convert chapter name to number word (chapter-one -> "one")
//         const chapterNum = chapter.replace("chapter-", "");
        
//         // Generate cards based on topic type
//         genContentCards(data, grade, topic, chapterNum);

//         contentContainer = document.querySelector(`.${topic}__${grade}`);
//     }
    
//     document.querySelector(".chapter-wrapper").classList.add("hidden");
//     contentContainer.classList.remove("hidden");
// }

// function transitionBackBtn(action){
//     if(action === "hide"){
//         backBtn.parentElement.classList.add("hidden");
//     }
//     else if(action === 'show'){
//         backBtn.parentElement.classList.remove("hidden");
//     }
// }


// export { chapterBtnFunc };