import globalState from "./state.js";

const dataCache = new Map();

const getCacheKey = () => {
    let subject = globalState.getState().subject;
    let grade = globalState.getState().grade;
    let topic = globalState.getState().topic;
    let chapter = globalState.getState().chapter;
    return `${subject}-${grade}-${topic}-${chapter}`;
}

function fetchURL() {
    let subject = globalState.getState().subject;
    let grade = globalState.getState().grade;
    let topic = globalState.getState().topic;
    let chapter = globalState.getState().chapter;
    const owner = "alihaider1145";
    const repo = "revision-guide";
    let directoryPath;
    if(globalState.getState().chapter === null 
    || globalState.getState().topic === "constants"
    || globalState.getState().topic === "units"){
        directoryPath = `dist/assets/${subject}/${grade}/${topic}/${topic}.json`;
    }
    else{
        directoryPath = `dist/assets/${subject}/${grade}/${topic}/${chapter}.json`;
    }
    
    return `https://raw.githubusercontent.com/${owner}/${repo}/main/${directoryPath}`;
}

async function fetchData(url) {
    const cacheKey = getCacheKey();
    
    if (dataCache.has(cacheKey)) {
        return dataCache.get(cacheKey);
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        dataCache.set(cacheKey, data);
        
        return data;
    } catch (error) {
        console.error(`❌ Failed to load: ${cacheKey}`, error);
        return null; 
    }
}

function isLatex(str) {
  const latexRegex = /(\\[a-zA-Z]+|{.*}|_|\^|\\frac|\\pi|\\varepsilon)/;
  return latexRegex.test(str);
}

export { fetchData, fetchURL, isLatex };