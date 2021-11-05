const url = 'https://api.pexels.com/v1/search?query=cats&&per_page=12';
const options = {
    headers: {
        Authorization: '563492ad6f917000010000010a9b52cfbb704750be035a6140194de6',
    }
};
fetch(url, options).then(r => r.json()).then(console.log);