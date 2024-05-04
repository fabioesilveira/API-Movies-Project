async function fetchAPI(query) {
    const req = await fetch(`https://www.omdbapi.com/?apikey=654f9fd1&t=${query}`);
    const res = await req.json();
    return res
};