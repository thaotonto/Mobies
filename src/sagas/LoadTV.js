import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects';
import { LOAD_POPULAR_TV_SUCCESS, LOAD_POPULAR_TV_FAIL, LOAD_AIRING_TODAY_TV_SUCCESS, LOAD_AIRING_TODAY_TV_FAIL, LOAD_ON_AIR_TV_SUCCESS, LOAD_ON_AIR_TV_FAIL, LOAD_TOP_RATED_TV_SUCCESS, LOAD_TOP_RATED_TV_FAIL } from '../configs/constants';
import { fetchPopularTV, fetchAiringTodayTV, fetchTopRatedTV, fetchOnAirTV } from '../networks/fetchData';

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

export function* loadOnAirTV () {
    try {
        yield onAir = yield call(fetchOnAirTV);
        yield put({type: LOAD_ON_AIR_TV_SUCCESS, payload: onAir});
    } catch (error) {
        yield put({type: LOAD_ON_AIR_TV_FAIL});
        return;
    }
}

export function* loadTopRatedTV () {
    try {
        yield topRated = yield call(fetchTopRatedTV);
        yield put({type: LOAD_TOP_RATED_TV_SUCCESS, payload: topRated});
    } catch (error) {
        yield put({type: LOAD_TOP_RATED_TV_FAIL});
        return;
    }
}
