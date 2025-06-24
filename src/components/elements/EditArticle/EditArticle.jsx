import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfo } from '../../../store/slices/allInfoSlice';
import { updateArticle } from '../../../store/slices/articleSlice';
import { useHistory } from 'react-router-dom';
import ArticleForm from '../CreateArticle/ArticleForm';

const EditArticle = ({ slug }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, status } = useSelector(state => state.allInfo);
  const { updateStatus, updateError } = useSelector(state => state.articles);
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    dispatch(fetchInfo(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (data && data.title) {
      setInitial({
        title: data.title,
        description: data.description,
        text: data.body,
        tags: data.tagList || [],
      });
    }
  }, [data]);

  const handleSubmit = async (formData) => {
    const payload = {
      title: formData.title,
      description: formData.description,
      body: formData.text,
      tagList: formData.tags,
    };
    const res = await dispatch(updateArticle({ slug, articleData: payload }));
    if (!res.error) {
      history.push(`/all_info/${slug}`);
    }
  };

  if (status === 'loading' || !initial) return <div>Loading...</div>;

  return (
    <ArticleForm
      initialValues={initial}
      onSubmit={handleSubmit}
      status={updateStatus}
      error={updateError}
      formTitle='Edit article'
      buttonText='Send'
    />
  );
};

export default EditArticle; 