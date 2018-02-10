import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOAD_POPULAR_TV_SUCCESS, LOAD_POPULAR_TV_FAIL } from '../configs/constants';
import { fetchPopularTV } from '../networks/fetchData';

export function* loadPopularTV () {
    try {
        yield popular = yield call(fetchPopularTV);
        yield put({type: LOAD_POPULAR_TV_SUCCESS, payload: popular});
    } catch (error) {
        yield put({type: LOAD_POPULAR_TV_FAIL});
        return;
    }
}
