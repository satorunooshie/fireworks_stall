import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Score() {
  const [score, setScore] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8888/ranking", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
          username: localStorage.getItem("username"),
        },
      });
      const data = await response.json();
      console.log(data);
      setScore(data);
    })();
  }, []);
  if (score.length === 0) {
    return <div>loading</div>;
  }
  const scoreList = score.rankings.slice();

  const myName = score.my_name;

  scoreList.push({
    score: score.my_score,
    rank: score.my_rank,
    name: score.my_name,
  });
  scoreList?.map((item) => {
    item.score = Number(item.score);
  });
  console.log(scoreList);
  scoreList?.sort(function (a, b) {
    if (a.score < b.score) return 1;
    if (a.score > b.score) return -1;
    return 0;
  });
  return (
    <div className="App">
      <div>
        <h3 style={{ margin: "0.5px" }}>ランキング</h3>

        {score.rankings.map((item, i) => {
          if (i < 10) {
            return (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid black",
                }}
              >
                <p
                  style={{
                    fontSize: "1.25rem",
                  }}
                >
                  {i + 1}位&emsp;{item.name} :{item.score}m
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Score;
