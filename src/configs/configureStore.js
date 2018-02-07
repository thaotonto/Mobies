import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

export default function configureStore () {
    const sagaMiddleware = createSagaMiddleware();
    let store = createStore(reducers, applyMiddleware(sagaMiddleware));
    // sagaMiddleware.run(rootSaga);
    
    return {store}
  };
