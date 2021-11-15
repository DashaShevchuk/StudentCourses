import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from "react-redux";
import get from "lodash.get";
import {serverUrl} from '../../config';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config


//const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const UserNavbar = React.lazy(() => import('./UserNavbar'));

class UserLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
  }
  

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
            <UserNavbar/>
        </AppHeader>
       <div className="app-body">
          </div>
          </div>
    )
}
}
const mapStateToProps = (state) => {
  return {
   
  };
}

export default UserLayout;

