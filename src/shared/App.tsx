import React, { useState, Profiler } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './i18n';
import './App.scss';
import ErrorBoundary from 'components/ErrorBoundary';
import { TestPage, BoardPage, PostPage, EditorPage } from './pages';
// import componentSplitting from 'lib/componentSplitting';
import Header from 'components/Header';
import { Provider } from 'react-redux';
import configureStore from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import MyEditor from 'components/MyEditor';
import MyEditorContainer from 'components/MyEditor/MyEditorContainer';
import { useTranslation } from 'react-i18next';
import t from './t';

// import D from './pages/Draggable/Drag';

import * as util from 'lib/util';

const { store, persistor } = configureStore();

const App = () => {
  const { t } = useTranslation();
  return (
    <ErrorBoundary>
      <div className="dd">
        <h1>{t('submit')}</h1>
        {/* <MyEditorContainer /> */}
        {/* <MyEditor content="<h1>asdfsadfsdf</h1>console.log(123123)</script>" mode="CREATE" /> */}
        {/* <MyEditor content="<h1>asdfsadfsdf</h1>console.log(123123)</script>" mode="EDIT" /> */}
        <Header />
        <Link to="/">home</Link>
        <Link to="/test">test</Link>
        <Link to="/board">boardddd</Link>
        <Link to="/post">boardddd</Link>
        <Link to="/post">Editor</Link>
        <Route exact path="/" render={() => <div>home</div>} />
        <Route exact path="/test" component={TestPage} />
        <Route exact path="/board" component={BoardPage} />
        <Route exact path="/post" component={PostPage} />
        <Route exact path="/editor" component={EditorPage} />
        {/* <div styleName="ttt1">2</div>
            <div styleName="ttt2">1</div>
            <div styleName="ttt3">1</div>
            <div styleName="ttt4">1</div>
            <div styleName="ttt5">1</div>
            <div styleName="ttt6">1</div>
            <div styleName="ttt7">1</div>
            <div className="global">dd</div> */}
      </div>
    </ErrorBoundary>
  );
};

// const App = () => {
//   const { t } = useTranslation();
//   return (
//     <ErrorBoundary>
//       <Provider store={store}>
//         <div className="dd">
//           <h1>{t('submit')}</h1>
//           {/* <MyEditorContainer /> */}
//           {/* <MyEditor content="<h1>asdfsadfsdf</h1>console.log(123123)</script>" mode="CREATE" /> */}
//           {/* <MyEditor content="<h1>asdfsadfsdf</h1>console.log(123123)</script>" mode="EDIT" /> */}
//           <Header />
//           <Link to="/">home</Link>
//           <Link to="/test">test</Link>
//           <Link to="/board">boardddd</Link>
//           <Link to="/post">boardddd</Link>
//           <Link to="/post">Editor</Link>
//           <Route exact path="/" render={() => <div>home</div>} />
//           <Route exact path="/test" component={TestPage} />
//           <Route exact path="/board" component={BoardPage} />
//           <Route exact path="/post" component={PostPage} />
//           <Route exact path="/editor" component={EditorPage} />
//           {/* <div styleName="ttt1">2</div>
//             <div styleName="ttt2">1</div>
//             <div styleName="ttt3">1</div>
//             <div styleName="ttt4">1</div>
//             <div styleName="ttt5">1</div>
//             <div styleName="ttt6">1</div>
//             <div styleName="ttt7">1</div>
//             <div className="global">dd</div> */}
//         </div>
//       </Provider>
//     </ErrorBoundary>
//   );
// };

export default App;
