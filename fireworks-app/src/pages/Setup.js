import React from "react";
import P5Wrapper from "react-p5-wrapper";
import testSketch from "../components/fireworks";
import "./Setup.css";
import { Link } from "react-router-dom";

function Setup() {
  return (
    <div className="container">
      <div>
        <P5Wrapper sketch={testSketch} />
      </div>

      <div className="button-block">
        <button>
          <Link to={`/score`}>スコアを見る</Link>
        </button>
      </div>
    </div>
  );
}

export default Setup;
