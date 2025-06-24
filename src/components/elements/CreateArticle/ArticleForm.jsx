import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './create-article.css';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Short description is required'),
  text: yup.string().required('Text is required'),
  tags: yup.array().of(yup.string().max(20, 'Tag too long')),
});

const ArticleForm = ({
  initialValues = { title: '', description: '', text: '', tags: [] },
  onSubmit,
  status,
  error,
  formTitle = 'Create new article',
  buttonText = 'Send',
}) => {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(initialValues.tags || []);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset({
      title: initialValues.title,
      description: initialValues.description,
      text: initialValues.text,
    });
    setTags(initialValues.tags || []);
  }, [initialValues, reset]);

  const onAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const onDeleteTag = (idx) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, tags });
  };

  return (
    <form className='form' onSubmit={handleSubmit(handleFormSubmit)}>
      <h2 className='form__title'>{formTitle}</h2>
      <label className='form__label'>
        <span>Title</span>
        <input {...register('title')} className='form__input' placeholder='Title' />
        {errors.title && <div className='form__error'>{errors.title.message}</div>}
      </label>
      <label className='form__label'>
        <span>Short description</span>
        <input {...register('description')} className='form__input' placeholder='Title' />
        {errors.description && <div className='form__error'>{errors.description.message}</div>}
      </label>
      <label className='form__label'>
        <span>Text</span>
        <textarea {...register('text')} className='form__input' placeholder='Text' rows={6} />
        {errors.text && <div className='form__error'>{errors.text.message}</div>}
      </label>
      <div className='form__label'>
        <span>Tags</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {tags.map((tag, idx) => (
            <React.Fragment key={idx}>
              <input className='form__input' value={tag} disabled style={{ width: 150 }} />
              <button type='button' className='form__button-delete' onClick={() => onDeleteTag(idx)}>Delete</button>
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <input
            className='form__input'
            placeholder='Tag'
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onAddTag(); } }}
            style={{ width: 150 }}
          />
          <button type='button' className='form__button-add' onClick={onAddTag}>Add tag</button>
        </div>
      </div>
      {error && <div className='form__error'>{typeof error === 'string' ? error : 'Ошибка'}</div>}
      <button className='form__button' type='submit' style={{ marginTop: 20 }} disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : buttonText}
      </button>
    </form>
  );
};

export default ArticleForm; 