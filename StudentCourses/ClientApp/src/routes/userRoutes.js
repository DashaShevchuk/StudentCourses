import React from 'react';

const Login = React.lazy(() => import('../views/defaultViews/LoginPage'));
const routes = [
    { path: '/user', exact: true, name: 'Login', component: Login }
];

export default routes;