import React, { useEffect } from "react";
import { useState } from "react";
import P5Wrapper from "react-p5-wrapper";
import testSketch from "../components/fireworks";
import "./Setup.css";
import { Link, useParams } from "react-router-dom";
import Score from "./Score";

function Setup() {
  const [fin, setFin] = useState(false);
  const [colorArray, setColorArray] = useState(null);
  const { color, p } = useParams();
  //const p = 1; //Math.random(0,1);
  const [score, setScore] = useState([]);

  setTimeout(function () {
    console.log("time out");
    setFin(true);
    //多分10秒くらいがちょうどいい
  }, 3000);

  useEffect(() => {
    const f = async () => {
      const ca = [];
      for (let i = 0; i < color.length / 6; i++) {
        if (i === 0) {
          ca.push(`#${color.slice(0, 6)}`);
        } else {
          ca.push(`#${color.slice(6 * i, 6 * (i + 1))}`);
        }
      }
      setColorArray(ca);

      const response_score = await fetch("http://localhost:8888/score", {
        //TODO:PUTに変更
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("Authorization"),
          username: localStorage.getItem("username"),
        },
        body: JSON.stringify({ score: Math.round(300 * p) }),
      });
    };
    f();
  }, [color]);

  const twitteTxt = `http://twitter.com/share?url=https://strange-voice-checker.netlify.app&text=【あなたが打ち上げた花火は${
    300 * p
  }m%まで飛びました！
   %0▼みんなも花火を作って打ち上げよう &hashtags=わくわく花火屋さん&count=horizontal&lang=ja`;

  return (
    <div className="container">
      <div>
        <P5Wrapper
          sketch={testSketch}
          color={`#${color}`}
          colors={colorArray}
          p={p}
        />
      </div>

      {fin ? (
        <div>
          <div className="score-card">
            <div className="score center">
              <div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.75rem" }}>結果発表</div>
                  <p style={{ fontSize: "3rem", margin: "0.5rem" }}>
                    <b>{Math.round(300 * p)}</b>m
                  </p>
                </div>
                <div>
                  <Score />
                </div>
                <div className="button-block">
                  <button className="nomal-button">
                    <Link
                      to={`/score`}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      ランキング
                    </Link>
                  </button>
                  <button className="nomal-button">
                    <Link
                      to={`/choice`}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      もう一回やる
                    </Link>
                  </button>
                  <button className="twitter-button">twitterで共有</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        []
      )}
    </div>
  );
}

export default Setup;
