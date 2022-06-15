import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createHashHistory';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

///reducers
import { loginReducer } from '../views/defaultViews/LoginPage/reducer';
import { registerReducer } from '../views/defaultViews/RegisterPage/reducer';
import { usersTableReducer } from '../views/adminViews/UsersTable/reducer';
import { coursesTableReducer } from '../views/adminViews/CoursesTable/reducer';
import { addCourseReducer } from '../views/adminViews/AddCourse/reducer';
import { allCoursesReducer } from '../views/userViews/AllCourses/reducer';
import { myCoursesReducer } from '../views/userViews/MyCourses/reducer';
import { emailConfirmationReducer } from '../views/defaultViews/EmailConfirmation/reducer';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createHistory({ basename: baseUrl });

export default function configureStore(history, initialState) {
  const reducers = {
    login: loginReducer,
    register: registerReducer,
    usersTable: usersTableReducer,
    coursesTable: coursesTableReducer,
    addCorse: addCourseReducer,
    allCourses: allCoursesReducer,
    myCourses: myCoursesReducer,
    confirmEmail: emailConfirmationReducer
    };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  // if (typeof window !== 'undefined' && window.REDUX_DEVTOOLS_EXTENSION_COMPOSE) {
  //   enhancers.push( window.__REDUX_DEVTOOLS_EXTENSION__());
  // }



  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    {},
    composeWithDevTools(
      applyMiddleware(...middleware),
      // other store enhancers if any
    )
  );
}