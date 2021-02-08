import React, { Component } from "react";
import "./Login.css";
import axios from 'axios';
// import { Link } from "react-router-dom";
import { Route, Link, Switch } from 'react-router-dom';
import Signup from '../Signup/Signup'

class Login extends Component {
  state = {
    userEmail: "",
    password: "",
    emailError: "",
    passwordError: "",
     loggedIn: "false"
  };
 data = {
   user: []
 }
  componentDidMount () {
        // console.log(this.props);
        axios.get( 'http://localhost:8000/profile' )
            .then( response => {
                 this.data.user = response.data; 
            } )
            .catch(error => {
                console.log(error);
            });
    }

  isValid() {
    let emailDiscription = "Please enter correct email";
    var email = this.state.userEmail;
    let passwordDiscription = "Weak password ";
    var pass = this.state.password;

    // *********** logic for password validation ***********
    const passwordReg = new RegExp(
      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$"
    );
    var testPassword = passwordReg.test(pass);
    const emailReg = new RegExp(
      "[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9.-]$"
    );
    var testEmail = emailReg.test(email);

    // *********** logic for password and email validation ***********
    if (!testPassword && !testEmail) {
      this.setState({
        emailError: emailDiscription,
        passwordError: passwordDiscription,
      });
      return false;
    }
    // *********** logic for password validation ***********
    if (!testPassword) {
      this.setState({ passwordError: passwordDiscription });
      return false;
    } else {
      this.setState({ passwordError: "" });
    }

    // *********** logic for email validation ***********

    if (!testEmail) {
      this.setState({ emailError: emailDiscription });
      return false;
    } else {
      this.setState({ emailError: "" });
    }

    return true;
  }
  isLoggedIn(){
      this.data.user.map((userProfile: any) => {
                  console.log(userProfile);
                   if(userProfile.userEmail === this.state.userEmail && userProfile.password === this.state.password) {
                     this.setState({loggedIn: true});
                     alert("loggedIn successful")
                   }
                   else{
                    alert("invalid email or password");
                   }
                 });
  }
  handleSubmit = (event: any) => {
    event.preventDefault();
    this.isLoggedIn();
    this.setState({ isSubmit: "true"});
    const valid = this.isValid();
    if (valid) {
      console.log(this.state);
    }

  };
  render() {
    return (
      <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              
              <form onSubmit={this.handleSubmit} className="box">
                <h1>Login</h1>
                <p className="text-muted">
                  {" "}
                  Please enter your login and password!
                </p>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={this.state.userEmail}
                  onChange={(event) =>
                    this.setState({ userEmail: event.target.value })
                  }
                />
                <div className="inputError">{this.state.emailError}</div>
                <input
                  type="password"
                  name="passwrod"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
                <div className="inputError">{this.state.passwordError}</div>
                <a className="forgot text-muted" href="www.google.com">
                  Forgot password?
                </a>
                <input type="submit" name="" value="Login" />
                <Link to="/signup">Signup</Link>
              </form>
              
            </div>
          </div>
        </div>
      </div>
      
      <Route exact path="/signup" component={Signup}/>
      </div>
    );
  }
}
export default Login;
