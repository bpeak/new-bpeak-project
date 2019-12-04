import React from 'react';
import MyEditor from './MyEditor';

type Props = {
  content?: string;
  mode: 'EDIT' | 'CREATE';
};

const MyEditorContainer = ({ content = '', mode }: Props) => {
  return <MyEditor content={content} mode={mode} />;
};

export default MyEditorContainer;
