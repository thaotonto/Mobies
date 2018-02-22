import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOAD_POPULAR_MOVIE, LOAD_POPULAR_TV, LOAD_NOW_PLAYING_MOVIE, LOAD_AIRING_TODAY_TV, LOAD_ON_AIR_TV, LOAD_TOP_RATED_MOVIE, LOAD_TOP_RATED_TV, LOAD_COMING_SOON_MOVIE } from '../configs/constants';
import {loadPopularMovie, loadNowPlayingMovie, loadTopRatedMovie, loadComingSoonMovie} from './LoadMovie';
import {loadPopularTV, loadAiringTodayTV, loadOnAirTV, loadTopRatedTV} from './LoadTV';

export default function* rootSaga() {
    yield [
        takeLatest(LOAD_POPULAR_MOVIE, loadPopularMovie),
        takeLatest(LOAD_POPULAR_TV, loadPopularTV),
        takeLatest(LOAD_NOW_PLAYING_MOVIE, loadNowPlayingMovie),
        takeLatest(LOAD_AIRING_TODAY_TV, loadAiringTodayTV),
        takeLatest(LOAD_ON_AIR_TV, loadOnAirTV),
        takeLatest(LOAD_TOP_RATED_MOVIE, loadTopRatedMovie),
        takeLatest(LOAD_TOP_RATED_TV, loadTopRatedTV),
        takeLatest(LOAD_COMING_SOON_MOVIE, loadComingSoonMovie)
    ];
}