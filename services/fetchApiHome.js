export async function fetchAPI() {
    const data = [];
    let req = await fetch(`https://www.omdbapi.com/?apikey=654f9fd1&t=the%20exorcist`);
    let res = await req.json();
    data.push(res)

    req = await fetch(`https://www.omdbapi.com/?apikey=654f9fd1&t=the%20exorcism%20of%20Emily%20Rose`);
    res = await req.json();
    data.push(res)

    req = await fetch(`https://www.omdbapi.com/?apikey=654f9fd1&t=schindler%27s%20list`);
    res = await req.json();
    data.push(res)

    req = await fetch(`https://www.omdbapi.com/?apikey=654f9fd1&t=the%20exorcism%20of%20Emily%20Rose`);
    res = await req.json();
    data.push(res)

    req = await fetch(`https://www.omdbapi.com/?apikey=654f9fd1&t=schindler%27s%20list`);
    res = await req.json();
    data.push(res)

    req = await fetch(`https://www.omdbapi.com/?apikey=654f9fd1&t=the%20exorcism%20of%20Emily%20Rose`);
    res = await req.json();
    data.push(res)

    return data;
};