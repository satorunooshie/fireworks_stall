import firebase from "../config";
import Make from "./Make";
import Score from "./Score";
import { useState, useEffect } from "react";

// import history from "history/createBrowserHistory";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
function Login() {
  const [score, setScore] = useState([]);
  const { innerWidth: deviceWidth, innerHeight: deviceHeight } = window;
  useEffect(() => {
    (async () => {
      const response = await fetch("./dummy_data.json");
      const data = await response.json();
      // console.log(data);
      setScore(data);
    })();
  }, []);
  const myHighScore = score !== [] ? score.my_score : 0;
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
        // console.log(user.bc.Aa);
        // console.log(user);
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
        history.push("/choice");
      }
    });
  }

  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact component={PageOne} /> */}
        <Route path="/choice/" exact>
          <Make />
        </Route>
        <Route path="score/" exact>
          <Score />
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
        <header className="App-header"></header>
        <div
          style={{
            width: "150px",
          }}
        >
          <h1
            style={{
              padding: "0",
              margin: "0",
              background: "rgba(255,255,255,0.5)",
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            わくわく花火屋さん
          </h1>
        </div>
        <div
          style={{
            fontSize: "20px",
            background: "rgba(255,255,255,0.5)",
            padding: "20px 10px",
            position: "absolute",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          現在のハイスコア：{myHighScore > 0 ? myHighScore : "未登録"}
        </div>
        <button
          onClick={loginWithTwitter}
          style={{
            display: "block",
            padding: "10px",
            position: "absolute",
            top: "50%",
            left: "48%",
            transform: "translate(-50%, -50%)",
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
            top: "60%",
            left: "48%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            backgroundColor: "#eb6100",
            borderRadius: "100vh",
          }}
        >
          しないで遊ぶ
        </button>
        <button
          onClick={() => {
            history.push("/score");
          }}
        >
          スコアページ
        </button>
      </div>
    </Router>
  );
}

export default Login;
