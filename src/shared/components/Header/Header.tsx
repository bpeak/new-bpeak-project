import React, { useState, useEffect } from 'react';
import useMode from 'hooks/useMode';
import cx from 'classnames';
import './Header.scss';

const Header = () => {
  const [t, setT] = useState(false);
  const { isDark } = useMode();
  useEffect(() => {
    setTimeout(() => {
      setT(true);
    }, 30000);
  }, []);

  return (
    <div styleName={cx('Header', { dark: isDark })} style={t ? { transform: 'translateY(-100%)' } : {}}>
      <div styleName="top">1</div>
      <div styleName="bottom">2</div>
    </div>
  );
};

export default Header;
