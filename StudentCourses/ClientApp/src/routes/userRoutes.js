import React from 'react';

const Login = React.lazy(() => import('../views/defaultViews/LoginPage'));
const AllCourses = React.lazy(() => import('../views/userViews/AllCourses'));
const MyCourses = React.lazy(() => import('../views/userViews/MyCourses'));

const routes = [
    { path: '/', exact: true, name: 'Login', component: Login },
    { path: '/user/allcourses', exact: true, name: 'AllCourses', component: AllCourses },
    { path: '/user/mycourses', exact: true, name: 'MyCourses', component: MyCourses },
];

export default routes;