import React from "react";
import {} from "react-router-dom";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Posts from "../components/Posts/Posts";
import FullPosts from "../components/FullPost/FullPost";

const routerLink = (props: any) => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={Signup} />
            
            <Route path="/posts/:id"  component={FullPosts} />
            <Route path="/posts" component={Posts} />

          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default routerLink;
