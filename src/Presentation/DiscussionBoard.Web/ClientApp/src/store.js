import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import callApiMiddleware from './store/middlewares/callApiMiddleware';
import effectsMiddleware from './store/middlewares/effectsMiddleware';
import authReducer from './store/reducers/auth';
import commentsReducer from './store/reducers/comments';
import comments2 from './store/reducers/comments2';
import forumReducer from './store/reducers/forum';
import forumsReducer from './store/reducers/forums';
import forums2 from './store/reducers/forums2';
import postReducer from './store/reducers/post';
import postsReducer from './store/reducers/posts';
import posts2 from './store/reducers/posts2';
import registerReducer from './store/reducers/register';
import snackbarReducer from './store/reducers/snackbar';
import homeReducer from './store/reducers/home';

const composeEnhancers = process.env.NODE_ENV === 'development' 
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
  : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  comments: commentsReducer,
  comments2: comments2,
  posts2: posts2,
  forums2: forums2,
  forum: forumReducer,
  forums: forumsReducer,
  post: postReducer,
  posts: postsReducer,
  register: registerReducer,
  snackbar: snackbarReducer,
  home: homeReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, callApiMiddleware, effectsMiddleware))
);

export default store;