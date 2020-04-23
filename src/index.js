import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

setTimeout(() => {    
    for(let i=0;i<10;i++){
        let spaces = ' ';
        for(let j=0;j<i;j++){
        spaces+='  ';
        }
        console.log('%c'+spaces,'color:pink;font-weight:bold;background-color:black; font-size:33px')

    }
    console.log('%c JavaScript is beautiful','color:pink;font-weight:bold;background-color:black; font-size:33px')
}, 1000);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

