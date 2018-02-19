import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOAD_POPULAR_MOVIE, LOAD_POPULAR_TV, LOAD_NOW_PLAYING_MOVIE, LOAD_AIRING_TODAY_TV } from '../configs/constants';
import {loadPopularMovie, loadNowPlayingMovie} from './LoadMovie';
import {loadPopularTV, loadAiringTodayTV} from './LoadTV';

export default function* rootSaga() {
    yield [
        takeLatest(LOAD_POPULAR_MOVIE, loadPopularMovie),
        takeLatest(LOAD_POPULAR_TV, loadPopularTV),
        takeLatest(LOAD_NOW_PLAYING_MOVIE, loadNowPlayingMovie),
        takeLatest(LOAD_AIRING_TODAY_TV, loadAiringTodayTV)
    ];
}