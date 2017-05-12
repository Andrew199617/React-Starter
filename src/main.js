'use strict;'

import React from 'react';
import ReactDOM from 'react-dom';

//Loading Components
import Home from './Home';
import Footer from './Footer';
import Header from './Header';

//Routing
import {Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
 
//Redux
import { Provider, connect } from 'react-redux';
import store from './Store';

//firebase
import firebase from './Firebase'

const browserHistory = createBrowserHistory({
  forceRefresh: false
})

if(browserHistory.location.pathname === '/')
{
   browserHistory.push('/home')
}

let HomeContainer = connect(state => {
    return {
        firebase : {firebase}
    };
}, {})(Home);

class BodyContainer extends React.Component {
  render() {
    return (
     <Router history={browserHistory}>
        <div>
          <Route path="/" component={Header}/>
          <Route path="/home" component={HomeContainer}/>
        </div>
     </Router> 
    )
  };
}

class FooterContainer extends React.Component {
  render() {
        return (  
          <Router history={browserHistory}>
            <div>
              <Route path="/" component={Footer}/>
            </div>
          </Router>
        );
    };
}


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={store}>
      <BodyContainer />
    </Provider>,
    document.getElementById('root')
  );
  ReactDOM.render(
    <FooterContainer />, 
    document.getElementById('footer'));
});
