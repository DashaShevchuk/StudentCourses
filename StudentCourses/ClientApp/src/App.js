import React, { Suspense, Component } from 'react';
import { Route, Switch, HashRouter as Router } from "react-router-dom";
// import './App.scss';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'antd/dist/antd.css';
// import './scss/style.scss';
// Pages
const LoginPage = React.lazy(() => import("./views/defaultViews/LoginPage/LoginPage"));
const RegistrationPage = React.lazy(() => import("./views/defaultViews/RegisterPage/RegisterPage"));
const EmailConfirmation = React.lazy(() => import("./views/defaultViews/EmailConfirmation/EmailConfirmation"));

// Layouts
const AdminLayout = React.lazy(() => import("./layouts/adminLayout/AdminLayout"));
const UserLayout = React.lazy(()=> import("./layouts/userLayout/UserLayout"));


//const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
class App extends Component {

  state = {
    isLoading: false,
    isError: false
  }

  render() { 
    return (
      <Router>  
      <Suspense fallback={ <div>Загрузка...</div> }>
        <Switch>
          <Route exact path="/" name="Login" render={ props => <LoginPage { ...props } /> } />
          <Route path="/admin" name="Admin" render={ props => <AdminLayout { ...props } /> } />
          <Route path="/user" name="User" render={ props => <UserLayout { ...props } /> } />
          <Route path="/register" name="Registartion" render={ props => <RegistrationPage {...props}/> } />
          <Route path="/:token" name="EmailConfirmation" render={ props => <EmailConfirmation {...props} /> } />
        </Switch>
      </Suspense>
      </Router> 
    );
  }
};

export default App;