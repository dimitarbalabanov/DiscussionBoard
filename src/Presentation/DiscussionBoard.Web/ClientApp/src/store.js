import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import callApiMiddleware from './store/middlewares/callApiMiddleware';
import effectsMiddleware from './store/middlewares/effectsMiddleware';
import authReducer from './store/reducers/auth';
import registerReducer from './store/reducers/register';
import newHome from './store/reducers/newHome';
import forumReducer from './store/reducers/forum';
import postReducer from './store/reducers/post';
import snackbarReducer from './store/reducers/snackbar';

// const composeEnhancers = process.env.NODE_ENV === 'development' 
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
//   : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  home: newHome,
  forum: forumReducer,
  post: postReducer,
  register: registerReducer,
  snackbar: snackbarReducer
});

const store = createStore(rootReducer, 
  applyMiddleware(thunk, callApiMiddleware, effectsMiddleware)
);

export default store;