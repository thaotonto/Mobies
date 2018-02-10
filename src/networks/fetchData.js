async function fetchData(dataUrl) {
    try {
        let response = await fetch(dataUrl);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return;
    }
}

export async function fetchPopularMovie () {
    return fetchData('https://api.themoviedb.org/3/movie/popular?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&page=1');
}

export async function fetchNowPlayingMovie () {
    return fetchData('https://api.themoviedb.org/3/movie/now_playing?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&page=1');
}

export async function fetchPopularTV () {
    return fetchData('https://api.themoviedb.org/3/tv/popular?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&page=1');
}