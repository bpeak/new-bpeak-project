import React, { useEffect } from 'react';
import useMode from 'hooks/useMode';
import cx from 'classnames';
import './PostPage.scss';

const PostPage = () => {
  const { toggleMode, isDark } = useMode();

  useEffect(() => {
    console.log(234);
  }, []);

  return (
    <div styleName={cx('PostPage', { dark: isDark })}>
      123
      <button onClick={toggleMode}>toggle</button>
    </div>
  );
};

export default PostPage;
