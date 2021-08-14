import React from "react";
import { useEffect, useState } from "react";
import P5Wrapper from "react-p5-wrapper";
import testSketch from "../components/fireworks";
import "./Setup.css";
import { Link } from "react-router-dom";

function Setup() {
  const [fin, setFin] = useState(false);

  setTimeout(function () {
    console.log("time out");
    setFin(true);
    //多分10秒くらいがちょうどいい
  }, 5000);

  return (
    <div className="container">
      <div>
        <P5Wrapper sketch={testSketch} />
      </div>

      {fin ? (
        <div>
          <div style={{ marginTop: "40vh", height: "200px" }}>
            <div className="score">
              <div>
                <div>得点</div>
              </div>
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
      ) : (
        []
      )}
    </div>
  );
}

export default Setup;
