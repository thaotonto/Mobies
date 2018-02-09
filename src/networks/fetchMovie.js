export async function fetchPopularMovie () {
    try {
        let response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&page=1');
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return;
    }
}