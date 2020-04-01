import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from './Pages/Homepage/homepage.component';
import ShopPage from './Components/Shop/shop.component';
import Header from './Components/header/header.component';
import SignInAndSignUpPage from './Pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth} from './Components/firebase/firebase.utils';

class App extends React.Component  {
  constructor() {
    super();

    this.state = {
      currentUser : null
    }
  }
  
  unsubscribeFromAuth = null

  componentDidMount() {
   this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
     this.setState({currentUser : user});
   }) 
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path ='/' component = {HomePage} />
          <Route exact path ='/shop' component = {ShopPage} />
          <Route exact path ='/signin' component = {SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
    
}

export default App;
