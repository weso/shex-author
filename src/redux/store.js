import { createStore, combineReducers } from 'redux';

import shapes from './reducers/shapes';

const reducer = combineReducers({
    shapes
});

const store = createStore(reducer);

export default store;