import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import callApiMiddleware from './store/middlewares/callApiMiddleware';
import effectsMiddleware from './store/middlewares/effectsMiddleware';
import authReducer from './store/reducers/auth';
import homeReducer from './store/reducers/home';
import commentsReducer from './store/reducers/entities/comments';
import postsReducer from './store/reducers/entities/posts';
import forumsReducer from './store/reducers/entities/forums';
import commentsUiReducer from './store/reducers/ui/commentsUi';
import postsUiReducer from './store/reducers/ui/postsUi';
import forumsUiReducer from './store/reducers/ui/forumsUi';
import snackbarReducer from './store/reducers/ui/snackbar';
import modalReducer from './store/reducers/ui/modal';

const composeEnhancers = process.env.NODE_ENV === 'development' 
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
  : null || compose;
  
const entitiesReducer = combineReducers({
  comments: commentsReducer,
  posts: postsReducer,
  forums: forumsReducer
});

const uiReducer = combineReducers({
  comments: commentsUiReducer,
  posts: postsUiReducer,
  forums: forumsUiReducer,
  snackbar: snackbarReducer,
  modal: modalReducer
});

const rootReducer = combineReducers({
  auth: authReducer,
  entities: entitiesReducer,
  ui: uiReducer,
  home: homeReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, callApiMiddleware, effectsMiddleware))
);

export default store;