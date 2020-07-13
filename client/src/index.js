import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

  

// // Get a non-default Storage bucket
// var storage = firebase.app().storage("gs://vutudu-1535457518831.appspot.com");


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
