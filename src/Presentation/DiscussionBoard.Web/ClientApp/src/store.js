import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import callApiMiddleware from './store/middlewares/callApiMiddleware';
import effectsMiddleware from './store/middlewares/effectsMiddleware';
import authReducer from './store/reducers/auth';
import commentsReducer from './store/reducers/comments';
import forumReducer from './store/reducers/forum';
import forumsReducer from './store/reducers/forums';
import postReducer from './store/reducers/post';
import postsReducer from './store/reducers/posts';
import registerReducer from './store/reducers/register';
import snackbarReducer from './store/reducers/snackbar';
import modalReducer from './store/reducers/modal';

// const composeEnhancers = process.env.NODE_ENV === 'development' 
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
//   : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  comments: commentsReducer,
  forum: forumReducer,
  forums: forumsReducer,
  post: postReducer,
  posts: postsReducer,
  register: registerReducer,
  snackbar: snackbarReducer,
  modal: modalReducer
});

const store = createStore(rootReducer, 
  applyMiddleware(thunk, callApiMiddleware, effectsMiddleware)
);

export default store;