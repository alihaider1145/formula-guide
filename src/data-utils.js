const getFetchURL = async (subject, grade, topic, chapter) => {
    const owner = "alihaider1145";
    const repo = "formula-guide";
    const directoryPath = `/dist/assets/${subject}/${grade}/${topic}/${chapter}.json`;

    const apiUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${directoryPath}`;

    return  apiUrl;
    // const fetchURL = `/assets/${subject}/${grade}/${topic}/${chapter}.json`;
    // return fetchURL;
}

const  fetchData = async (jsonFilePath) => {
    const response = await fetch(jsonFilePath);
    const data = await response.json();

    return data;
}

const countFiles = async (jsonFilePath) => {
    const response = await fetch(`${jsonFilePath}`);
    const data = await response.json();
    return data.files.length;
}

export { getFetchURL, fetchData, countFiles };