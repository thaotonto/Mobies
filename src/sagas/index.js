import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOAD_POPULAR_MOVIE, LOAD_POPULAR_TV } from '../configs/constants';
import {loadPopularMovie} from './LoadMovie';
import {loadPopularTV} from './LoadTV';

export default function* rootSaga() {
    yield [
        takeLatest(LOAD_POPULAR_MOVIE, loadPopularMovie),
        takeLatest(LOAD_POPULAR_TV, loadPopularTV)
    ];
}