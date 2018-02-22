import { call, put, takeEvery, takeLatest, take, all } from 'redux-saga/effects';
import { LOAD_POPULAR_MOVIE_FAIL, LOAD_POPULAR_MOVIE_SUCCESS, LOAD_NOW_PLAYING_MOVIE_SUCCESS, LOAD_NOW_PLAYING_MOVIE_FAIL, LOAD_COMING_SOON_MOVIE_SUCCESS, LOAD_COMING_SOON_MOVIE_FAIL, LOAD_TOP_RATED_MOVIE_SUCCESS, LOAD_TOP_RATED_MOVIE_FAIL, LOAD_GENRE_MOVIE_SUCCESS, LOAD_GENRE_MOVIE_FAIL, LOAD_MOVIE_BY_GENRE, LOAD_MOVIE_BY_GENRE_SUCCESS, LOAD_MOVIE_BY_GENRE_FAIL } from '../configs/constants';
import { fetchPopularMovie, fetchNowPlayingMovie, fetchComingSoonMovie, fetchTopRatedMovie, fetchDetail, fetchMovieGenres } from '../networks/fetchData';

export function* loadPopularMovie () {
    try {
        yield popular = yield call(fetchPopularMovie);
        yield put({type: LOAD_POPULAR_MOVIE_SUCCESS, payload: popular});
    } catch (error) {
        yield put({type: LOAD_POPULAR_MOVIE_FAIL});
        return;
    }
}

export function* loadNowPlayingMovie () {
    try {
        yield nowPlaying = yield call(fetchNowPlayingMovie);
        yield put({type: LOAD_NOW_PLAYING_MOVIE_SUCCESS, payload: nowPlaying});
    } catch (error) {
        yield put({type: LOAD_NOW_PLAYING_MOVIE_FAIL});
        return;
    }
}

export function* loadComingSoonMovie () {
    try {
        yield comingSoon = yield call(fetchComingSoonMovie);
        yield put({type: LOAD_COMING_SOON_MOVIE_SUCCESS, payload: comingSoon});
    } catch (error) {
        yield put({type: LOAD_COMING_SOON_MOVIE_FAIL});
        return;
    }
}

export function* loadTopRatedMovie () {
    try {
        yield topRated = yield call(fetchTopRatedMovie);
        yield put({type: LOAD_TOP_RATED_MOVIE_SUCCESS, payload: topRated});
    } catch (error) {
        yield put({type: LOAD_TOP_RATED_MOVIE_FAIL});
        return;
    }
}

export function* loadMovieGenres() {
    try {
        yield genre = yield call(fetchMovieGenres);
        yield all([
            put({type: LOAD_GENRE_MOVIE_SUCCESS, payload: genre}),
            put({type: LOAD_MOVIE_BY_GENRE, payload: genre.genres[0].id})
        ]);
    } catch (error) {
        yield put({type: LOAD_GENRE_MOVIE_FAIL});
        return;
    }
}

export function* loadMovieByGenre(action) {
    try {
        yield movie = yield call(fetchDetail, `https://api.themoviedb.org/3/discover/movie?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&sort_by=popularity.desc&page=1&with_genres=${action.payload}`);
        yield put({type: LOAD_MOVIE_BY_GENRE_SUCCESS, payload: movie});
    } catch (error) {
        yield put({type: LOAD_MOVIE_BY_GENRE_FAIL});
        return;
    }
}


