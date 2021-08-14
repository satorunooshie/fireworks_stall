import firebase from "../config";
import Make from "./Make";
import { useState } from "react";
// import history from "history/createBrowserHistory";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
function Login() {
  const token = localStorage.getItem("username");
  console.log(token);
  const [logined, setLogined] = useState(false);
  const history = useHistory();
  function loginWithTwitter() {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = credential.accessToken;
        var secret = credential.secret;

        // The signed-in user info.
        var user = result.user;
        var usename = user.displayName;
        localStorage.setItem("username", usename);
        localStorage.setItem("Authorization", "Bearer " + user.bc.Aa);
        console.log(user.bc.Aa);
        console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // const signOutMessage = `
        // // <p>Hello, ${user.displayName}!<\/p>
        // // <button type="submit"  onClick="signOut()">サインアウト<\/button>
        // // `;
        // // document.getElementById('auth').innerHTML =  signOutMessage;
        // setLogined(true);
        history.push("/make");
        console.log("ログインしています");
      }
    });
  }
  function logoutHandler() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  }
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact component={PageOne} /> */}
        <Route path="/make/" exact>
          <Make />
        </Route>
      </Switch>
      <div
        className="App background-img"
        style={{
          backgroundImage: 'url("../../073294.jpg")',
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <button
            onClick={loginWithTwitter}
            style={{
              display: "block",
              padding: "10px",
              position: "absolute",
              bottom: "300px",
              right: "100px",
              color: "#fff",
              backgroundColor: "#eb6100",
              borderRadius: "100vh",
            }}
          >
            ログインして遊ぶ
          </button>
          <button
            onClick={loginWithTwitter}
            style={{
              display: "block",
              padding: "10px",
              position: "absolute",
              bottom: "200px",
              right: "120px",
              color: "#fff",
              backgroundColor: "#eb6100",
              borderRadius: "100vh",
            }}
          >
            しないで遊ぶ
          </button>
          <button onClick={logoutHandler}>ログアウト</button>
        </header>
      </div>
    </Router>
  );
}

export default Login;
