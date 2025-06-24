import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../../store/slices/articleSlice";
import { Link } from "react-router-dom";
import Error from "../errror";
import Loader from "../Loader";
import Article from "../Article";
import styles from './content-container.module.css';

const ContentContainer = () => {
  const dispatch = useDispatch();
  const { data, status, allPages, pageSize } = useSelector(state => state.articles);
  const page = useSelector(state => state.pagination); 

  useEffect(() => {
    dispatch(fetchArticles({ page, pageSize })); 
  }, [dispatch, page, pageSize]); 

  if (status === 'filed') return <Error text={'error'} />;
  if (status === 'loading') return <Loader />;

  console.log(`Статус: ${status}\nТекущая страница: ${page}\nВсего статей: ${allPages}`);

  return (
    <div className={styles['content-container']}>
      {data.map(article => (
        <Link key={article.slug} to={`/all_info/${article.slug}`}>
          <Article
            title={article.title}
            likes={article.favoritesCount}
            tags={article.tagList}
            description={article.body}
            authorName={article.author.username}
            datePublication={article.createdAt}
            authorPhoto={article.author.image}
          />
        </Link>
      ))}
    </div>
  );
};

export default ContentContainer;