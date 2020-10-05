import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import registerReducer from './store/reducers/register';
import homeReducer from './store/reducers/home';
import forumReducer from './store/reducers/forum';
import postReducer from './store/reducers/post';
import snackbarReducer from './store/reducers/snackbar';

const composeEnhancers = process.env.NODE_ENV === 'development' 
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
  : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  forum: forumReducer,
  post: postReducer,
  register: registerReducer,
  snackbar: snackbarReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;