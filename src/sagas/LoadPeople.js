import { call, put, takeEvery, takeLatest, take, all } from 'redux-saga/effects';
import { LOAD_PEOPLE_SUCCESS, LOAD_PEOPLE_FAIL, LOAD_PEOPLE_SUCCESS_MORE } from '../configs/constants';
import { fetchDetail } from '../networks/fetchData';

export function* loadPeople(action) {
    try {
        yield people = yield call(fetchDetail, `https://api.themoviedb.org/3/person/popular?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&page=${action.payload}`);
        if (action.payload === 1)
            yield put({type: LOAD_PEOPLE_SUCCESS, payload: people});
        else yield put({type: LOAD_PEOPLE_SUCCESS_MORE, payload: people})
    } catch (error) {
        yield put({type: LOAD_PEOPLE_FAIL});
        return;
    }
}