import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './styles/App.scss';

import Search from './components/Search';
import Posts from './components/Posts';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="wrapper">
            <h1>Поиск GitHub</h1>
            <Search />
            <Posts />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
