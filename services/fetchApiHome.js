export async function fetchAPI() {
    const moviesHome = [ 
        "the exorcist",
        "the exorcism of Emily Rose",
        "schindler's list",
        "naruto",
        "white chicks",
        "ted"
    ]
    
    const data = [];
    moviesHome.forEach(async (element) => {
    const req = await fetch(`https://www.omdbapi.com/?apikey=654f9fd1&t=${element}`);
    const res = await req.json();
    data.push(res)
});
    
    

console.log(data)
    return data;
};