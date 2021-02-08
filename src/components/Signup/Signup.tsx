import React, { Component } from "react";
import "./Signup.css";
import axios from "axios";
import UserDetails from "../UserDetails";

class Signup extends Component {
  state = {
    userName: "",
    userEmail: "",
    password: "",
    phoneNumber: "",
    emailError: "",
    passwordError: "",
    userNameError: "",
    loggedIn: "false",
    confirmPassword: "",
    confirmPasswordError: "",
    emailAlreadyExist: false
  };

data ={
  user: []
 }
   componentDidUpdate () {
    UserDetails().then((res) =>{
      this.data.user  = res;
      console.log(this.data.user)
    });
   }
 
  postDataHandler = () => {
    const userData = {
        id:"",
        userName: this.state.userName,
        userEmail: this.state.userEmail,
        password: this.state.password,
        contactNumber: this.state.phoneNumber,
        Dob: ""
    };
    axios.post('http://localhost:8000/profile', userData)
        .then(response => {
            console.log(response);
        });
}

  isValid() {
    let emailDiscription = "Please enter correct email";
    var email = this.state.userEmail;
    let passwordDiscription = "Weak password ";
    var pass = this.state.password;
    var invalidUsername = false;
    var userNameDiscription = "User Name can't be empty";
    // let userName = this.state.userEmail;
    // let passwordDiscription = "Weak password ";

    // *********** logic for password validation ***********
    const passwordReg = new RegExp(
      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$"
    );
    var testPassword = passwordReg.test(pass);
    const emailReg = new RegExp(
      "[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9.-]$"
    );
    var testEmail = emailReg.test(email);

    if (this.state.userName.trim() === "") {
      invalidUsername = true;
    }

    // *********** logic for password and email validation ***********

    if (!testPassword && !testEmail && invalidUsername) {
      this.setState({
        emailError: emailDiscription,
        passwordError: passwordDiscription,
        userNameError: userNameDiscription,
      });
      // alert(this.state.passwordError + "dddddddddd");
      return false;
    }
    if (!testPassword && invalidUsername) {
      this.setState({
        passwordError: passwordDiscription,
        userNameError: userNameDiscription,
        emailError: ""
      });
      // alert(this.state.passwordError + "dddddddddd");
      return false;
    }
    if (!testEmail && invalidUsername) {
      this.setState({
        emailError: emailDiscription,
        userNameError: userNameDiscription,
        passwordError:""
      });
      // alert(this.state.passwordError + "dddddddddd");
      return false;
    }
    if (!testPassword && !testEmail) {
      this.setState({
        emailError: emailDiscription,
        passwordError: passwordDiscription,
        userNameError: ""
      });
      // alert(this.state.passwordError + "dddddddddd");
      return false;
    }
    // *********** logic for password validation ***********
    if (!testPassword) {
      this.setState({ passwordError: passwordDiscription,emailError: "",
      userNameError: "" });
      
      return false;
    } else {
      this.setState({ passwordError: "" });
    }

    // *********** logic for email validation ***********

    if (!testEmail) {
      this.setState({ emailError: emailDiscription,  passwordError:"", userNameError: ""});
      return false;
    } else {
      this.setState({ emailError: "" });
    }

    if (invalidUsername) {
      this.setState({ userNameError: userNameDiscription, emailError: "",  passwordError:"" });
      return false;
    } else {
      this.setState({ userNameError: "" });
    }

    return true;
  }
 
    handleSubmit = (event: any) => {
    event.preventDefault();
     
    
    var passwordMatch = false
    const valid = this.isValid();
    alert(this.state.password)
    if( this.state.password === this.state.confirmPassword){
     passwordMatch = true;
     this.setState({confirmPasswordError: ""})
    //  this.postDataHandler();
    }
    else{
      this.setState({confirmPasswordError: "does not match with confirm password"});
    }
    

    this.data.user.map((userProfile: any) => {
      console.log(userProfile);
       if(userProfile.userEmail ===  this.state.userEmail){
         this.state.emailAlreadyExist = true;
    }
 
  })
  if(valid && passwordMatch && this.state.emailAlreadyExist){
      alert("email already exist");
    }
    else if(valid && passwordMatch && !this.state.emailAlreadyExist){
      this.postDataHandler();
    }

  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card card-signin flex-row my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Register</h5>
                {/* <form className="form-signin" onSubmit={this.handleSubmit}> */}
                <form onSubmit={this.handleSubmit} className="form-signin">
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="Username"
                      name="Username"
                      className="form-control"
                      placeholder="Username"
                      onChange={(event) =>
                        this.setState({ userName: event.target.value })
                      }
                      
                    />
                    <label htmlFor="Username" className="text-muted">Username</label>
                    <div className="inputError">{this.state.userNameError}</div>
                  </div>

                  <div className="form-label-group">
                  <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="form-control"
                  value={this.state.userEmail}
                  onChange={(event) =>
                    this.setState({ userEmail: event.target.value })
                  }
                />
                     <label htmlFor="email" className="text-muted">email</label>
                    <div className="inputError">{this.state.emailError}</div>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      id="inputPhoneNumber"
                      name="inputPhoneNumber"
                      className="form-control"
                      placeholder="Phone Number"
                      onChange={(event) =>
                        this.setState({ phoneNumber: event.target.value })
                      }
                      
                    />
                    <label htmlFor="inputPhoneNumber" className="text-muted">PhoneNumber</label>
                  </div>
                  <hr />

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(event) =>
                        this.setState({ password: event.target.value })
                      }
                    />
                      <label htmlFor="password" className="text-muted">password</label>
                     <div className="inputError">{this.state.passwordError}</div>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="ConfirmPassword"
                      name="ConfirmPassword"
                      className="form-control"
                      placeholder="Password"
                      onChange={(event) =>
                        this.setState({ confirmPassword: event.target.value })
                      }
                      
                    />
                        <label htmlFor="ConfirmPassword" className="text-muted">ConfirmPassword</label>
                     <div className="inputError">{this.state.confirmPasswordError}</div>
                  </div>
                  {/* <input type="submit" name="" value="Login" /> */}
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit"> Register </button>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;
