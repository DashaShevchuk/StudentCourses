import React from 'react';

const Login = React.lazy(() => import('../views/defaultViews/LoginPage'));
const UsersTable = React.lazy(() => import('../views/adminViews/UsersTable'));
const AddCourse = React.lazy(() => import('../views/adminViews/AddCourse'));
const GetCourses = React.lazy(() => import('../views/adminViews/CoursesTable'));

const routes = [
    { path: '/', exact: true, name: 'Login', component: Login },
    { path: '/admin/users', exact: true, name: 'Users', component: UsersTable },
    { path: '/admin/addcourse', exact: true, name: 'AddCourse', component: AddCourse },
    { path: '/admin/courses', exact: true, name: 'Courses', component: GetCourses },
];

export default routes;