import React, { useState, useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Edit.scss';

const MyEditor = () => {
  const [content, setContent] = useState('');

  const onEditorChangeHandler = useCallback((content, editor) => {
    setContent(content);
  }, []);

  return (
    <div styleName="MyEditor">
      <Editor
        value={content}
        init={{
          height: '100%',
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | image |\
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',
          // images_upload_url: '/upload',
          images_upload_handler: function(blobInfo, success, failure) {
            console.log(blobInfo);
            var xhr, formData;

            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', 'postAcceptor.php');

            xhr.onload = function() {
              // var json;

              // if (xhr.status != 200) {
              //   failure('HTTP Error: ' + xhr.status);
              //   return;
              // }

              // json = JSON.parse(xhr.responseText);

              // if (!json || typeof json.location != 'string') {
              //   failure('Invalid JSON: ' + xhr.responseText);
              //   return;
              // }

              success('https://webkit.org/demos/srcset/image-src.png');
            };

            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            xhr.send(formData);
          },
        }}
        onEditorChange={onEditorChangeHandler}
      />
    </div>
  );
};

export default MyEditor;
