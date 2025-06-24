import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createArticle } from '../../../store/slices/articleSlice';
import ArticleForm from './ArticleForm';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { createStatus, createError } = useSelector(state => state.articles);

  const handleSubmit = async (formData) => {
    const payload = {
      title: formData.title,
      description: formData.description,
      body: formData.text,
      tagList: formData.tags,
    };
    const res = await dispatch(createArticle(payload));
    if (!res.error) {
      history.push('/');
    }
  };

  return (
    <ArticleForm
      initialValues={{ title: '', description: '', text: '', tags: [] }}
      onSubmit={handleSubmit}
      status={createStatus}
      error={createError}
      formTitle='Create new article'
      buttonText='Send'
    />
  );
};

export default CreateArticle;
export { ArticleForm }; 