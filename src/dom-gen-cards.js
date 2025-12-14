function populateCard(topicList, topicName){
    const engMap = {
        formula: "formula_english",
        constant: "const_eng",
        unit: "unit_eng"
    }

    const mathMap = {
        formula: "formula_math",
        constant: "const_math",
        unit: "unit_math"
    }

    const card = document.createElement('div');
    card.classList.add(`${topicName}__card`, 'card');

    const cardEng = document.createElement('div');
    cardEng.classList.add('card__eng');
    cardEng.textContent = `${topicList[engMap[topicName]]}`;
    card.appendChild(cardEng);

    if (Array.isArray(topicList[mathMap[topicName]])) {
        for(const math of topicList[mathMap[topicName]]){
            const cardMath = document.createElement('div');
            cardMath.classList.add('card__math');
            cardMath.innerHTML = `\\(${topicList[mathMap[topicName]]}\\)`;
            card.appendChild(cardMath);
        }
    }
    else{
        const cardMath = document.createElement('div');
        cardMath.classList.add('card__math');
        cardMath.innerHTML = `\\(${topicList[mathMap[topicName]]}\\)`;
        card.appendChild(cardMath);
    }

    if(topicList.similar){
        const cardSimilar = document.createElement('div');
        cardSimilar.classList.add('card__similar');
        cardSimilar.textContent = topicList.similar;
        card.appendChild(cardSimilar);
    }

    if(topicList.variants){
        const cardVariants = document.createElement('div');
        cardVariants.classList.add('card__variation');
        cardVariants.textContent = topicList.variants;
        card.appendChild(cardVariants);
    }

    if(topicList.unit){
        const cardtopicUnit = document.createElement('div');
        cardUnit.classList.add('card__topic-unit');
        cardUnit.textContent = topicList.unit;
        card.appendChild(cardtopicUnit);
    }

    return card;
} 

export { populateCard };