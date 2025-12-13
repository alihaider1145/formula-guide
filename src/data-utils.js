const getFetchURL = async (subject, grade, topic, chapter) => {
    const owner = "alihaider1145";
    const repo = "formula-guide";
    const directoryPath = `dist/assets/${subject}/${grade}/${topic}/${chapter}.json`;

    const apiUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${directoryPath}`;

    return  apiUrl;
}

const  fetchData = async (jsonFilePath) => {
    const response = await fetch(jsonFilePath);
    const data = await response.json();

    return data;
}

const countFiles = async (subject, grade) => {
    const chapterCount = {
    physics: {
        "1st-year": 10,
        "2nd-year": 10
    },
    maths: {
        "1st-year": 9,
        "2nd-year": 10
    }
    };
    return chapterCount[subject][grade];
}

export { getFetchURL, fetchData, countFiles };