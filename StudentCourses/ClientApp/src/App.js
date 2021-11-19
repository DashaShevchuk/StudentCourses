import React, { Suspense, Component } from 'react';
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import './App.scss';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Pages
const LoginPage = React.lazy(() => import("./views/defaultViews/LoginPage/LoginPage"));

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
        </Switch>
      </Suspense>
      </Router> 
    );
  }
};

export default App;