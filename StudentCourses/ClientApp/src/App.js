import React, { Suspense, Component } from 'react';
import { Route, Switch, HashRouter as Router } from "react-router-dom";
//import './App.scss';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const AdminLayout = React.lazy(() => import("./layouts/adminLayout/AdminLayout"));
const UserLayout = React.lazy(() => import("./layouts/userLayout/UserLayout"));

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
          <Route path="/admin" name="Admin" render={ props => <AdminLayout { ...props } /> } />
          <Route exact path="/" name="User" render={ props => <UserLayout { ...props } /> } />
        </Switch>
      </Suspense>
      </Router> 
    );
  }
};

export default App;