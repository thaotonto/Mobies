import reducers from '../reducers';
// import { persistStore, persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/es/storage';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

export default function configureStore () {
    const sagaMiddleware = createSagaMiddleware();
    let store = createStore(reducers, applyMiddleware(sagaMiddleware));
    // let persistor = persistStore(store, null, () => {store.getState()});
    // sagaMiddleware.run(rootSaga);
    
    // return { persistor, store }
    return {store}
  };
