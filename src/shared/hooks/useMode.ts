import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import * as appActions from 'store/common/app';
import { AppMode } from 'store/common/app';

export default function useMode(): {
  isDark: boolean;
  isLight: boolean;
  mode: AppMode;
  toggleMode: () => void;
} {
  const { isDark, isLight, mode } = useSelector((state: StoreState) => ({
    isDark: state.app.isDark,
    isLight: state.app.isLight,
    mode: state.app.mode,
  }));
  const dispatdh = useDispatch();

  const toggleMode = useCallback(() => {
    dispatdh(appActions.toggleMode());
  }, []);

  return { isDark, isLight, mode, toggleMode };
}
