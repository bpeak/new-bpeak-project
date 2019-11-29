import { createAction, ActionType, createReducer } from 'typesafe-actions';
import produce from 'immer';

export enum AppMode {
  DARK,
  LIGHT,
}

// 액션 타입
const TOGGLE_MODE = 'app/TOGGLE/MODE';

// 액션 생성자
export const toggleMode = createAction(TOGGLE_MODE)();

// Type 액션
const actions = {
  toggleMode,
};
type AppAction = ActionType<typeof actions>;

// Type 초기 상태
type AppState = {
  mode: AppMode;
  isLight: boolean;
  isDark: boolean;
};

// 초기 상태
const initialState: AppState = {
  mode: AppMode.LIGHT,
  isLight: true,
  isDark: false,
};

// 리듀서
const reducer = createReducer<AppState, AppAction>(initialState, {
  [TOGGLE_MODE]: (state, action) => {
    return produce(state, draft => {
      if (state.mode === AppMode.DARK) {
        draft.isDark = !state.isDark;
        draft.isLight = !state.isLight;
        draft.mode = AppMode.LIGHT;
      }
      if (state.mode === AppMode.LIGHT) {
        draft.isDark = !state.isDark;
        draft.isLight = !state.isLight;
        draft.mode = AppMode.DARK;
      }
    });
  },
});

export default reducer;
