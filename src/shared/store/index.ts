import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from './rootReducer';

// Type 스토어 스테이트
export type StoreState = ReturnType<typeof rootReducer>;

const logger = createLogger({
  collapsed: true, // false로 변경시 개발자콘솔의 prev, action, next 자세히(열림)
});

const middlewares = [logger];

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);
  return { store, persistor };
}
