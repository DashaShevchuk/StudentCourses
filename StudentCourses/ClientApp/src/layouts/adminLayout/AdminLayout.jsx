import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { connect } from "react-redux";
import get from "lodash.get";
import { logout } from '../../views/defaultViews/LoginPage/reducer';

import {
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../navs/_adminNavs';
// routes config
import routes from '../../routes/adminRoutes';

import "../../assets/css/adminLayoutStyle.css";

//const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const AdminNavbar = React.lazy(() => import('./AdminNavbar'));

class AdminLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }


  render() {
    const { login } = this.props;
    console.log("login",login);
    let isAccess = false;
    if (login.isAuthenticated === undefined) {
      console.log(login.isAuthenticated);
      return (
        <Redirect to="/" />
      );
    }
    if (login.isAuthenticated) {
      const { roles } = login.user;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'Admin')
          isAccess = true;
      }
      console.log('auth', roles);
    }
    const content = (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <AdminNavbar onLogout={e => this.signOut(e)} name={login.user.name}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main main-div p-2">
            <Suspense fallback={this.loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null);
                })}
                <Redirect from="/" to="/admin/courses" />
              </Switch>
            </Suspense>
          </main>
        </div>
      </div>
    );
    return (
      isAccess ? 
      content
        : <Redirect to="/" />  
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: get(state, 'login')
  };
}

export default connect(mapStateToProps, { logout })(AdminLayout);

