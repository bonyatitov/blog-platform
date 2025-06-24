import { React, useEffect } from 'react';
import { HeartTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInfo } from '../../../store/slices/allInfoSlice';
import { deleteArticle } from '../../../store/slices/articleSlice';
import moment from "moment/moment";
import Loader from '../Loader';
import Error from '../errror';
import './allInfo.css';
import { useHistory } from 'react-router-dom';
import { sendLike } from '../../../store/slices/likeSlice';

const AllInfo = ({slug}) => {
  const {data, status} = useSelector(state => state.allInfo);
  const colorLike = useSelector(state => state.like.likes[slug] || null);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchInfo(slug))
  }, [dispatch, slug]);

  if (status === 'filed') return <Error text={'error'} />;
  if (status === 'loading') return <Loader />;
  if (Object.keys(data).length === 0) return <Error text={'error'} />

  const renderTags = () => {
    const { tagList } = data;
    if (tagList.length === 0 || tagList === undefined)  {
      return <span>Нет тегов</span>
    }
    return tagList.map(tag => <li key={tag} className={"tag"}>{tag}</li>)
  }

  const isOwner = user && data.author && user.username === data.author.username;

  const handleEdit = () => {
    history.push(`/articles/${slug}/edit`);
  };

  const handleLikeClick = () => {
    if (!isAuthenticated) {
      alert("Войдите, чтобы поставить лайк!");
      return;
    }
    const liked = !!colorLike;
    dispatch(sendLike({ slug, liked }));
  };

  const handleDelete = async () => {
    await dispatch(deleteArticle(slug));
    history.push('/');
  };

  return (
    <div className={'article'}>
      <div className={"article__header-container"}>
          <div className={"article__title-container"}>
            <div className="article__title-container-top">
              <div className={"article__title-container"}><p className={'article__title'}>{data.title}</p></div>
              <div className={"article__like-container"}>
                <span className={"like"}>
                  <HeartTwoTone onClick={handleLikeClick} twoToneColor={colorLike || "#bbb"} style={{ cursor: isAuthenticated ? "pointer" : "not-allowed" }} />
                </span>
                <p className={"like-text"}>{data.favoritesCount}</p>
              </div>
            </div>
            <ul className={"tags-container"}>
              {renderTags()}
            </ul>
          </div>
          <div className={"article__user-container"}>
            <div className={"user-info"}>
              <div className={"user-name"}>{data.author.username || 'No name'}</div>
              <div className={"date"}>{moment(data.createdAt).format('LL')}</div>
            </div>
            <img className={"user-photo"} src={data.author.image} alt="Фото профиля"/>
          </div>
        </div>
        <div className={"description-container"}>
          <p className={"description-text"}>
            {data.description}
          </p>
        </div>
        {isOwner && (
          <div className="article__actions article__actions--horizontal">
            <button className="article__button-delete" onClick={handleDelete}>Delete</button>
            <button className="article__button-edit" onClick={handleEdit}>Edit</button>
          </div>
        )}
        <div className={"content-container"}>
          <p className={"content-text"}>
            {data.body}
          </p>
        </div>
      </div>
  )
}

export default AllInfo;