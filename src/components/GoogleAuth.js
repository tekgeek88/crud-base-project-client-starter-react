import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '846575880195-ra492k6865varmcfrrh2ua70r66qmko1.apps.googleusercontent.com',
        scope: 'email'
      })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      // return <div>I don't know if we are signed in</div>;
      return null;
    } else if (this.props.isSignedIn) {
      // return <div>I am signed in!</div>;
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          Sign Out
        </button>
      );
    } else {
      // return <div>I am not signed in</div>;
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon"/>
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn};
};

export default connect(
  mapStateToProps,
  {signIn, signOut}
)(GoogleAuth);