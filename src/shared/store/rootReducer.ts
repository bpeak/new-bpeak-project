import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const appPersistConfig = {
  key: 'app',
  storage,
};

// common
import app from './common/app';

const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, app),
});

export default rootReducer;
