import "./index.css";
import "./dom-buttons.js"
import { genFormulaCards } from "./dom-gen-formula.js";
import { genUnitCards } from "./dom-gen-units.js";
import { genConstantCards } from "./dom-gen-constants.js";
import { fetchData, getFetchURL } from "./data-utils.js";

//as of now, there is only a button for math, entire code has to be added for math subj
(async function generateDOM(){
    const num = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    //physics ---------------->

    //formulas -------->
    //1st-year
    for(const number of num){
        let formulaData = await fetchData(await getFetchURL("physics", "1st-year", "formula", `chapter-${number}`));
        genFormulaCards(formulaData, number, "1st-year");
    }

    //2nd-year
    for(const number of num){
        let formulaData = await fetchData(await getFetchURL("physics", "2nd-year", "formula", `chapter-${number}`));
        genFormulaCards(formulaData, number, "2nd-year");
    }

    //units ---------->
    //1st-year
    for(const number of num){
        let unitsData = await fetchData(await getFetchURL("physics", "1st-year", "units", `chapter-${number}`));
        genUnitCards(unitsData, number, "1st-year");
    }

    //2nd-year
    for(const number of num){
        let unitsData = await fetchData(await getFetchURL("physics", "2nd-year", "units", `chapter-${number}`));
        genUnitCards(unitsData, number, "2nd-year");
    }

    //constants -------->
    //1st-year
    for(const number of num){
        let constantsData = await fetchData(await getFetchURL("physics", "1st-year", "constants", `chapter-${number}`));
        genConstantCards(constantsData, number, "1st-year");
    }

    //2nd-year
    for(const number of num){
        let constantsData = await fetchData(await getFetchURL("physics", "2nd-year", "constants", `chapter-${number}`));
        genConstantCards(constantsData, number, "2nd-year");
    }
})();
