import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects';
import { LOAD_POPULAR_MOVIE_FAIL, LOAD_POPULAR_MOVIE_SUCCESS, LOAD_NOW_PLAYING_MOVIE_SUCCESS, LOAD_NOW_PLAYING_MOVIE_FAIL, LOAD_COMING_SOON_MOVIE_SUCCESS, LOAD_COMING_SOON_MOVIE_FAIL, LOAD_TOP_RATED_MOVIE_SUCCESS, LOAD_TOP_RATED_MOVIE_FAIL } from '../configs/constants';
import { fetchPopularMovie, fetchNowPlayingMovie, fetchComingSoonMovie, fetchTopRatedMovie } from '../networks/fetchData';

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


