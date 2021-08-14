import React from "react";
import { useState } from "react";
import P5Wrapper from "react-p5-wrapper";
import testSketch from "../components/fireworks";
import "./Setup.css";
import { Link, useParams } from "react-router-dom";

function Setup() {
  const [fin, setFin] = useState(false);
  const { color } = useParams();
  const p = 0.5;
  setTimeout(function () {
    console.log("time out");
    //setFin(true);
    //多分10秒くらいがちょうどいい
  }, 5000);

  return (
    <div className="container">
      <div>
        <P5Wrapper sketch={testSketch} color={`#${color}`} p={p} />
      </div>

      {fin ? (
        <div>
          <div className="score-card">
            <div className="score center">
              <div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.75rem" }}>けっかはっぴょう</div>
                  <p style={{ fontSize: "3rem", margin: "0.5rem" }}>
                    <b>{Math.round(300 * p)}</b>m
                  </p>
                </div>
                <div className="button-block">
                  <button>
                    <Link to={`/score`}>ランキング</Link>
                  </button>
                  <button>
                    <Link to={`/make`}>もう一回やる</Link>
                  </button>
                  <button>twitterで共有</button>
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
