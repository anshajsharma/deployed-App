import React from 'react';
import {BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import themeFile from './util/themes'
import AuthRoute from './util/AuthRoute'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

//Page
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import Navbar from './components/navbar'

const theme = createMuiTheme(themeFile);

// axios.defaults.baseURL =    
// // 'https://europe-west1-socialape-d081e.cloudfunctions.net/api';
//   // 'https://us-central1-blog-ape.cloudfunctions.net/api';
//   'https://us-central1-blog-ape.cloudfunctions.net/api';


// const token = localStorage.FBIdToken;
// let authenticated;
// if(token){
//   const decodedToken = jwtDecode(token);
//   console.log(decodedToken);
//   if(decodedToken.exp*1000 < Date.now()){
//     window.location.href = '/login'
//     authenticated =false;
//   }else{
//     authenticated=true;
//   }
// }

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>  
           <div className="App">
            <Router>    
               <Navbar /> 
             <div className="container">         
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute exact path='/login' component={login} />
                <AuthRoute exact path='/signup' component={signup} />
              </Switch>
             </div>  
            </Router>  
           </div> 

      </Provider>
      
    </MuiThemeProvider>
  );
}

export default App;
