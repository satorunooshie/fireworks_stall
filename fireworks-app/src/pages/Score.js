import { Link } from "react-router-dom";

function Score() {
  return (
    <div className="App">
      <header className="App-header">score</header>
      <div>
        <div>得点</div>
        <div>ランキング</div>
      </div>
      <button>
        <Link to={`/login`}>もう一回やる</Link>
      </button>
      <button>twitterで共有</button>
    </div>
  );
}

export default Score;
