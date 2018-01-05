import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import MemberResources from "./MemberResources";
import Login from "./Login";
import MemberProfile from "./MemberProfile";
import MemberProfileEdit from "./MemberProfileEdit";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EmailList from "./EmailList";
import "./App.css";
import { componentWithLoggedInUser } from './utils';
import UsersList from "./UsersList";


class App extends Component {
  render() {
    const { User } = this.props.data || {};
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <a href="/">
              <img className="cfd-logo" src="images/cfd-circle-white.png" alt="code for denver logo"/>
            </a>
            <Login user={User} />
            <Link to="/admin/onboarding">All Users</Link>
          </div>
          <Route exact path="/" component={MemberResources} />
          <Route
            exact path="/me"
            render={() => <MemberProfile user={User} />}
          />
          <Route exact path="/me/edit" component={MemberProfileEdit} />
          <Route exact path="/admin/onboarding" component={EmailList} />
          <Route exact path="/volunteers" component={UsersList} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default componentWithLoggedInUser(App);
