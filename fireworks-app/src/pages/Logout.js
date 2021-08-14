import firebase from "../config";
import { useHistory } from "react-router-dom";
function Logout() {
  const history = useHistory();
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      // console.log("ログアウト成功");
      history.push("/login");
    })
    .catch(function (error) {
      // An error happened.
      console.log("ログアウトしっっぱい");
    });
  return <div></div>;
}
export default Logout;
