import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Score() {
  const [score, setScore] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("./dummy_data.json");
      const data = await response.json();
      console.log(data);
      setScore(data);
    })();
  }, []);
  if (score.length === 0) {
    return <div>loading</div>;
  }
  const scoreList = score.score_list.slice();

  const myName = score.my_name;

  scoreList.push({
    score: score.my_score,
    rank: score.my_rank,
    name: score.my_name,
  });
  scoreList.map((item) => {
    item.score = Number(item.score);
  });
  console.log(scoreList);
  scoreList.sort(function (a, b) {
    if (a.score < b.score) return 1;
    if (a.score > b.score) return -1;
    return 0;
  });
  return (
    <div className="App">
      <header className="App-header">score</header>
      <div>
        <h3>ランキング</h3>
        <div>
          <h2>自分のスコア</h2>
          <p>{score.my_name}</p>
          <p>{score.my_rank}</p>
          <p>{score.my_score}</p>
        </div>
        {score.score_list.map((item, i) => {
          if (i < 10) {
            return (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid black",
                }}
              >
                <p> {item.name}</p>
                <p> rank :{i + 1}</p>
                <p> score :{item.score}</p>
              </div>
            );
          }
        })}
      </div>
      <button>
        <Link to={`/login`}>もう一回やる</Link>
      </button>
      <button>twitterで共有</button>
    </div>
  );
}

export default Score;
