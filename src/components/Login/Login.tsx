import React, { Component } from "react";
import axios from "axios";
import "./Login.css";
import { Route, Link, Redirect, BrowserRouter } from "react-router-dom";
import Signup from "../Signup/Signup";
import UserDetails from "../UserDetails";
// jkjkjkjkjkjkjkjkjllllllllllllllll
class Login extends Component {
  state = {
    userEmail: "",
    password: "",
    emailError: "",
    passwordError: "",
    loggedIn: "false",
    isSubmit: false,
  };
  redirect = null;
  data = {
    user: [],
  };
  componentDidMount() {
    UserDetails().then((res) => {
      this.data.user = res;
      console.log(this.data.user);
    });
  }
  //ayushTest123
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
  isLoggedIn() {
    this.data.user.map((userProfile: any) => {
      console.log(userProfile);
      if (
        userProfile.userEmail === this.state.userEmail &&
        userProfile.password === this.state.password
      ) {
        this.setState({ loggedIn: "true" });
      }
    });
  }

  handleSubmit = (event: any) => {
    //   axios.post('/auth/v1' ).send({"username": this.state.userEmail, "password": this.state.password}).end((err: any,res: any) => {if(err){
    //     alert(err);
    //     return;
    //   }
    // console.log(res)});
    event.preventDefault();
    this.isLoggedIn();
    this.setState({ isSubmit: "true" });
    const valid = this.isValid();
    if (valid) {
      console.log(this.state);
    }
  };
  render() {
    let redirect;
    if (this.state.loggedIn === "true") {
      alert("loggedIn successful" + this.state.loggedIn);
      redirect = <Redirect to='/posts' />;
    } else if (this.state.isSubmit) {
      alert("loggedIn Insuccessful" + this.state.loggedIn);
    }

    return (
      <div>
        {redirect}
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='card'>
                <form onSubmit={this.handleSubmit} className='box'>
                  <h1>Login</h1>
                  <p className='text-muted'>
                    {" "}
                    Please enter your login and password!
                  </p>
                  <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={this.state.userEmail}
                    onChange={(event) =>
                      this.setState({ userEmail: event.target.value })
                    }
                  />
                  <div className='inputError'>{this.state.emailError}</div>
                  <input
                    type='password'
                    name='passwrod'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={(event) =>
                      this.setState({ password: event.target.value })
                    }
                  />
                  <div className='inputError'>{this.state.passwordError}</div>
                  <a className='forgot text-muted' href='www.google.com'>
                    Forgot password?
                  </a>
                  <input type='submit' name='' value='Login' />
                  <Link to='/signup'>Signup</Link>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Route exact path='/signup' component={Signup} />
      </div>
    );
  }
}
export default Login;
