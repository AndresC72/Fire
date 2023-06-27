import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Inicio from './components/Inicio'
import Admin from './components/Admin'
 import Login from './components/Login'
import Menu from './components/Menu'
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div className="container">
      <Router>
          <Menu></Menu>
        <Switch>
          <Route exact path='/' component={Inicio}></Route>
          <Route path='/login' component={Login}></Route>
          <ProtectedRoute exact path="/admin" component={Admin} />
        </Switch>

      </Router>
    </div>
  )
}

export default App

