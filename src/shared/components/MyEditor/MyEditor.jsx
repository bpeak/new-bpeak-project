import React, { useState, useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import * as api from 'lib/api';
import './Edit.scss';

const MyEditor = ({ content: defaultContent, mode }) => {
  const [content, setContent] = useState(defaultContent);

  const onEditorChangeHandler = useCallback((content, editor) => {
    setContent(content);
  }, []);

  const onSubmitClickHandler = useCallback(() => {
    api.createPost(content);
  }, [content]);

  const onUploadHandler = useCallback((blobInfo, success, failure) => {
    (async function() {
      try {
        const blob = blobInfo.blob();
        const formData = new FormData();
        formData.append('imgFile', blob);
        const response = await api.uploadImgFile(formData);
        console.log(response);
        success('https://webkit.org/demos/srcset/image-src.png');
      } catch (err) {
        console.log(err);
        failure('err!');
      }
    })();
  }, []);

  return (
    <div styleName="MyEditor">
      <Editor
        value={content}
        init={{
          height: '100%',
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | image |\
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
          images_upload_handler: onUploadHandler,
        }}
        onEditorChange={onEditorChangeHandler}
      />
      {mode === 'CREATE' && <button onClick={onSubmitClickHandler}>등록</button>}
      {mode === 'EDIT' && <button onClick={onSubmitClickHandler}>수정</button>}
    </div>
  );
};

export default MyEditor;
