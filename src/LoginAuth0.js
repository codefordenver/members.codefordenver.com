import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import auth0 from "auth0-js";

const authenticateQuery = gql`
  mutation authenticate($accessToken: String!) {
    authenticateUser(accessToken: $accessToken) {
      id
      token
    }
  }
`;

class LoginAuth0 extends Component {
  constructor(props) {
    super(props);
    this.webAuth = new auth0.WebAuth({
      domain: props.domain,
      clientID: props.clientId
    });
  }

  componentDidMount() {
    const props = this.props;
    this.webAuth.parseHash(
      { hash: window.location.hash },
      (err, authResult) => {
        if (err) {
          // TODO: Handle errors
          return console.error(err);
        }
        if (!authResult || !authResult.accessToken) {
          return;
        }

        // The contents of authResult depend on which authentication parameters were used.
        // It can include the following:
        // authResult.accessToken - access token for the API specified by `audience`
        // authResult.expiresIn - string with the access token's expiration time in seconds
        // authResult.idToken - ID token JWT containing user profile information

        props.authenticate({
          variables: {
            accessToken: authResult.accessToken
          }
        }).then(({ data }) => console.log('userInfo', data.authenticateUser));

        window.localStorage.setItem("cfd-members-auth0-AccessToken", authResult.accessToken);
      }
    );
  }
  _showLogin = () => {
    this.webAuth.authorize({
      audience: "http://localhost:3000", // TODO: Verify this is correct
      redirectUri: "http://localhost:3000", // TODO: Verify this is correct
      responseType: "token",
      scope: "openid email"
    });
  };

  render() {
    return <span onClick={this._showLogin}>Log in with Auth0</span>;
  }
}

const LoginAuth0WithData = compose(
  graphql(authenticateQuery, {
    name: "authenticate"
  })
)(withRouter(LoginAuth0));

export default LoginAuth0WithData;
