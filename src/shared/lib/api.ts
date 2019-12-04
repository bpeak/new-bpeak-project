import axios from 'axios';

export const uploadImgFile = (formData: FormData) =>
  axios.post('http://localhost:70/api/r', formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });

export const createPost = (str: string) => {
  console.log(`axios : ${str}`);
};
