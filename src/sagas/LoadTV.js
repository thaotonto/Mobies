import { call, put, takeEvery, takeLatest, take, all } from 'redux-saga/effects';
import { LOAD_POPULAR_TV_SUCCESS, LOAD_POPULAR_TV_FAIL, LOAD_AIRING_TODAY_TV_SUCCESS, LOAD_AIRING_TODAY_TV_FAIL, LOAD_ON_AIR_TV_SUCCESS, LOAD_ON_AIR_TV_FAIL, LOAD_TOP_RATED_TV_SUCCESS, LOAD_TOP_RATED_TV_FAIL, LOAD_GENRE_TV_SUCCESS, LOAD_GENRE_TV_FAIL, LOAD_TV_BY_GENRE_SUCCESS, LOAD_TV_BY_GENRE_FAIL, LOAD_TV_BY_GENRE } from '../configs/constants';
import { fetchPopularTV, fetchAiringTodayTV, fetchTopRatedTV, fetchOnAirTV, fetchTVGenres, fetchDetail } from '../networks/fetchData';

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

export function* loadTVGenres(dispatch) {
    try {
        yield genre = yield call(fetchTVGenres);
        yield all([
            put({type: LOAD_GENRE_TV_SUCCESS, payload: genre}),
            put({type: LOAD_TV_BY_GENRE, payload: genre.genres[0].id})
        ])
    } catch (error) {
        yield put({type: LOAD_GENRE_TV_FAIL});
        return;
    }
}

export function* loadTVByGenre(action) {
    try {
        yield tv = yield call(fetchDetail, `https://api.themoviedb.org/3/discover/tv?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&sort_by=popularity.desc&page=1&with_genres=${action.payload}`);
        yield put({type: LOAD_TV_BY_GENRE_SUCCESS, payload: tv});
    } catch (error) {
        yield put({type: LOAD_TV_BY_GENRE_FAIL});
        return;
    }
}
