import { React } from "react";
import { HeartOutlined } from '@ant-design/icons';
import moment from "moment/moment";
import './article.module.css';

const Article = ({title, likes, tags, description, authorName, datePublication, authorPhoto}) => {
  const renderTags = () => {
    if (!tags || tags.length === 0) {
      return <span>Нет тегов</span>;
    }
    return tags.map((tag, idx) => <li className={"tag"} key={idx}>{tag}</li>);
  };

  return (
    <div className={'article'}>
      <div className={"article__header-container"}>
        <div className={"article__title-container"}>
          <div className="article__title-container-top">
            <div className={"article__title-container"}><p className={'article__title'}>{title}</p></div>
            <div className={"article__like-container"}>
              <span className={"like"}><HeartOutlined /></span>
              <p className={"like-text"}>{likes}</p>
            </div>
          </div>
          <ul className={"tags-container"}>
            {renderTags()}
          </ul>
        </div>
        <div className={"article__user-container"}>
          <div className={"user-info"}>
            <div className={"user-name"}>{authorName}</div>
            <div className={"date"}>{moment(datePublication).format('LL')}</div>
          </div>
          <img className={"user-photo"} src={authorPhoto} alt="Фото профиля"/>
        </div>
      </div>
      <div className={"description-container"}>
        <p className={"description-text"} style={{display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default Article;