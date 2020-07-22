import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import './App.css';

import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Login from './components/Login';
import Friends from './components/Friends';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BrowserRouter>
        <header className='titleArea'>
          <div className='title'>
            <h1>Friends App-ster</h1>
          </div>
          <nav className='buttonLinks'>
            <Link to='/'><button>Home</button></Link>
            <Link to='/login'><button>Login</button></Link>
            <Link to='/friends'><button>My Friends</button></Link>
          </nav>
        </header>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/friends' component={Friends} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
