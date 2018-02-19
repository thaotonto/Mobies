import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOAD_POPULAR_TV_SUCCESS, LOAD_POPULAR_TV_FAIL, LOAD_AIRING_TODAY_TV_SUCCESS, LOAD_AIRING_TODAY_TV_FAIL } from '../configs/constants';
import { fetchPopularTV, fetchAiringTodayTV } from '../networks/fetchData';

export function* loadPopularTV () {
    try {
        yield popular = yield call(fetchPopularTV);
        yield put({type: LOAD_POPULAR_TV_SUCCESS, payload: popular});
    } catch (error) {
        yield put({type: LOAD_POPULAR_TV_FAIL});
        return;
    }
}

export function* loadAiringTodayTV () {
    try {
        yield airingToday = yield call(fetchAiringTodayTV);
        yield put({type: LOAD_AIRING_TODAY_TV_SUCCESS, payload: airingToday});
    } catch (error) {
        yield put({type: LOAD_AIRING_TODAY_TV_FAIL});
        return;
    }
}
