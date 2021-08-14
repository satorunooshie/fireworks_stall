import React from "react";
import P5Wrapper from "react-p5-wrapper";
import testSketch from "../components/fireworks";

function Setup() {
  return (
    <div>
      <P5Wrapper sketch={testSketch} />
    </div>
  );
}

export default Setup;
