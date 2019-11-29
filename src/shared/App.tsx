import React, { useState, Profiler } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.scss';
import { TestPage, BoardPage, PostPage } from './pages';
import componentSplitting from 'lib/componentSplitting';
import Header from 'components/Header';
import { Provider } from 'react-redux';
import configureStore from 'store';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="dd">
          <Header />
          <Link to="/">home</Link>
          <Link to="/test">test</Link>
          <Link to="/board">boardddd</Link>
          <Link to="/post">boardddd</Link>
          <Route exact path="/" render={() => <div>home</div>} />
          <Route exact path="/test" component={TestPage} />
          <Route exact path="/board" component={BoardPage} />
          <Route exact path="/post" component={PostPage} />
          <div styleName="ttt1">2</div>
          <div styleName="ttt2">1</div>
          <div styleName="ttt3">1</div>
          <div styleName="ttt4">1</div>
          <div styleName="ttt5">1</div>
          <div styleName="ttt6">1</div>
          <div styleName="ttt7">1</div>
          <div className="global">dd</div>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
