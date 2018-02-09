import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOAD_POPULAR_MOVIE_FAIL, LOAD_POPULAR_MOVIE, LOAD_POPULAR_MOVIE_SUCCESS } from '../configs/constants';
import { fetchPopularMovie } from '../networks/fetchMovie';

export function* loadPopularMovie () {
    try {
        yield popular = yield call(fetchPopularMovie);
        yield put({type: LOAD_POPULAR_MOVIE_SUCCESS, payload: popular});
    } catch (error) {
        yield put({type: LOAD_POPULAR_MOVIE_FAIL});
        return;
    }

}
