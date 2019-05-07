import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
// import ShoppingList from './components/ShoppingList';
// import ItemModal from './components/ItemModal';
import { Provider } from 'react-redux';
import store from 'store'
import Layout from './layout/layout'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './App.css';

class App extends Component {
  

  render() {
    return (
      <React.Fragment>  
        <link href="https://diegoddox.github.io/react-redux-toastr/7.1/react-redux-toastr.min.css" rel="stylesheet" type="text/css"></link>    
        <Provider store={store}>
          <div className="App">
            <Layout />
            <ReduxToastr
            timeOut={2000}
            newestOnTop={false}
            preventDuplicates
            position="top-center"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick/>
          </div>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
