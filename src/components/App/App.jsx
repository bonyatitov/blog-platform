import styles from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';

// Loyouts
import Header from '../loyout/Header';
import Content from '../loyout/Content';
import Footer from '../loyout/Footer';
// Elements
import ContentContainer from '../elements/ContentContainer';
import PaginationComponent from '../elements/Pagination';
import AllInfo from '../elements/AllInfo';
import ButtonAuth from '../elements/Button';
import Registration from '../elements/auth/Registration/Registration';
import Authorization from '../elements/auth/Authorization';
import UserBage from '../elements/UserBage';
import EditProfile from '../elements/EditProfile';
import CreateArticle from '../elements/CreateArticle';
import EditArticle from '../elements/EditArticle';
//React-router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link, Switch, Redirect } from 'react-router-dom';
import GuestRoute from '../Routes/GuestRoute';
import PrivatRoute from '../Routes/PrivatRoute';
import { initAuth } from '../../store/slices/authSlice';



const EditArticleWrapper = (props) => <EditArticle slug={props.match.params.slug} />;

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  React.useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className={styles['app-layout']}>
        <Header>
          <Link to='/'>
            <div className={styles['logo-container']}>
              <h1>Realworld Blog</h1>
            </div>
          </Link>
          
          <div className={styles['btn-container']}>
            {isAuthenticated ? (
              <UserBage user={user} />
            ) : (
              <>
                <Link to="/authorization">
                  <ButtonAuth type={'signIn'} text={'Sign in'} />
                </Link>
                <Link to="/registration">
                  <ButtonAuth type={'signUp'} text={'Sign up'} />
                </Link>
              </>
            )}
          </div>
        </Header>
        
        <Content>
          <Switch>
            <Route path="/all_info/:slug" render={({match}) => (
              <AllInfo slug={match.params.slug} />
            )} />
            
            <GuestRoute path="/registration" component={Registration} />
            <GuestRoute path="/authorization" component={Authorization} />
            
            <Route path="/" exact component={ContentContainer} />
            <PrivatRoute path="/edit-profile" component={EditProfile} /> 
            <PrivatRoute path="/new-article" component={CreateArticle} />
            <PrivatRoute path="/articles/:slug/edit" component={EditArticleWrapper} />
            
            <Redirect to="/" />
          </Switch>
        </Content>
        
        <Footer>
          <Route path="/" exact component={PaginationComponent} />
        </Footer>
      </div>
    </Router>
  );
};

export default App;