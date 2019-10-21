import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import Root from './components/root'


document.addEventListener( 'DOMContentLoaded' , function(e){
  let store;
  if(window.currentUser){
    store = configureStore({
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id}
    });
  } else {
    store = configureStore()
  }
  window.store = store;
  let root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
})