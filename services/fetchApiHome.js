export async function fetchAPI(movies) {
    const data = [];
    for (const element of movies) {
        const req = await fetch(`https://www.omdbapi.com/?apikey=654f9fd1&t=${element}`);
        const res = await req.json();
        data.push(res)
    }

    return data;
};