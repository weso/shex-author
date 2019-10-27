import { type as getShapes } from '../actions/getShapes';

const Shape = require('../../entities/shexEntities/shape.js');

const defaultState = [
    new Shape(0)
];

function reducer(state = defaultState, { type, payload }) {
    switch (type) {
        case getShapes: {
            //return 
        }

        default:
            return state;
    }
}

export default reducer;