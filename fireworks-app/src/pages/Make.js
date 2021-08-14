import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [color, setColor] = useState("yellow");

  const margin = {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20,
  };
  const contentWidth = 200;
  const contentHeight = 200;
  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;

  const [smallGunpowder, setSmallGunpowder] = useState([]);
  const [bigGunpowder, setBigGunpowder] = useState([]);

  useEffect(() => {
    const newGunpowders = [];
    for (let i = 0; i < 16; i++) {
      newGunpowders.push({ id: i, color: "black" });
    }
    setSmallGunpowder(newGunpowders);

    const newGunpowders2 = [];
    for (let i = 0; i < 20; i++) {
      newGunpowders2.push({ id: i, color: "black" });
    }
    setBigGunpowder(newGunpowders2);
  }, []);

  const c = Math.PI / 180;

  function colorChange(gunpowders, size, color) {
    const newGunpowders = JSON.parse(JSON.stringify(gunpowders));
    for (let i = 0; i < newGunpowders.length; i++) {
      newGunpowders[i].color = color;
    }
    if (size === "small") {
      setSmallGunpowder(newGunpowders);
    } else {
      setBigGunpowder(newGunpowders);
    }
  }

  const handleChange = (e) => setColor(e.target.value);

  return (
    <div>
      <svg viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}>
        <circle cx={100} cy={100} r={105} fill="#f5deb3" />
        <circle cx={100} cy={100} r={100} fill="gray" />
        <circle cx={100} cy={100} r={40} fill="lightgray" />
        {smallGunpowder?.map((s) => {
          return (
            <g transform={`translate(100, 100)`}>
              <circle
                cx={50 * Math.cos(22.5 * s.id * c)}
                cy={50 * Math.sin(22.5 * s.id * c)}
                r={9.5}
                fill="black"
                fill={s.color}
                onClick={() => colorChange(smallGunpowder, "small", color)}
              />
            </g>
          );
        })}
        {bigGunpowder.map((s) => {
          return (
            <g transform={`translate(100, 100)`}>
              <circle
                cx={86 * Math.cos(18 * s.id * c)}
                cy={86 * Math.sin(18 * s.id * c)}
                r={13}
                fill={s.color}
                onClick={() => colorChange(bigGunpowder, "big", color)}
              />
            </g>
          );
        })}
      </svg>
      <div>
        <div>
          <button>一周一括</button>
          <button disabled>1つずつ</button>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="yellow"
              onChange={handleChange}
              checked={color === "yellow"}
            />
            黄色
          </label>
          <label>
            <input
              type="radio"
              value="pink"
              onChange={handleChange}
              checked={color === "pink"}
            />
            ピンク
          </label>{" "}
          <label>
            <input
              type="radio"
              value="blue"
              onChange={handleChange}
              checked={color === "blue"}
              disabled
            />
            　青
          </label>{" "}
          <label>
            <input
              type="radio"
              value="green"
              onChange={handleChange}
              checked={color === "green"}
              disabled
            />
            緑
          </label>{" "}
        </div>
      </div>
      <div>
        <button>
          <Link to={`/setup`}>打ち上げる</Link>
        </button>
      </div>
    </div>
  );
}

export default App;
