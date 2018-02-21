import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects';
import { LOAD_POPULAR_MOVIE_FAIL, LOAD_POPULAR_MOVIE_SUCCESS, LOAD_NOW_PLAYING_MOVIE_SUCCESS, LOAD_NOW_PLAYING_MOVIE_FAIL } from '../configs/constants';
import { fetchPopularMovie, fetchNowPlayingMovie } from '../networks/fetchData';

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


