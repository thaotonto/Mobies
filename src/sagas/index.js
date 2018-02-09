import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOAD_POPULAR_MOVIE } from '../configs/constants';
import {loadPopularMovie} from './LoadPopularMovie';

export default function* rootSaga() {
    yield [
        takeLatest(LOAD_POPULAR_MOVIE, loadPopularMovie)
    ];
}