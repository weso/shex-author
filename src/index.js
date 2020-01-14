import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

/*
import Shape from './entities/shexEntities/shape';
import Triple from './entities/shexEntities/triple';

let shape = new Shape(0);
shape.addTriple(new Triple(0));

console.log(shape)
*/

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

