import { useEffect, useState } from "react";
import { Link, matchPath, useParams } from "react-router-dom";
import "./Make.css";
import chochinImg from "../images/tyoutinn.png";

function App() {
  const [color, setColor] = useState("black");
  const [level, setLevel] = useState(0);
  const [indiv, setIndiv] = useState(false);
  const { min, max } = useParams;
  const [p, setP] = useState(-1);

  useEffect(() => {
    setP(Math.random(min, max));
    const f = async () => {
      const response = await fetch("http://localhost:8888/level", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
          username: localStorage.getItem("username"),
        },
      });
      const data = await response.json();
      setLevel(data.level);
    };
    f();
  }, []);

  const margin = {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20,
  };

  const palet = [
    "#d60031",
    "#40f7f7",
    "#00dd97",
    "#f2ff00",
    "#ffaa00",
    "#ff00dc",
    "#cb00ff",
  ];
  const contentWidth = 200;
  const contentHeight = 260;
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

  function colorChange(gunpowders, size, color, id) {
    const newGunpowders = JSON.parse(JSON.stringify(gunpowders));
    if (!indiv) {
      for (let i = 0; i < newGunpowders.length; i++) {
        newGunpowders[i].color = color;
      }
    } else {
      newGunpowders[id].color = color;
    }
    if (size === "small") {
      setSmallGunpowder(newGunpowders);
    } else {
      setBigGunpowder(newGunpowders);
    }
  }

  function getColorArray() {
    let colors = new Set();
    for (const c of smallGunpowder) {
      if (c.color !== "black") {
        colors.add(c.color);
      } else {
        colors.add("#fffacd");
      }
    }
    for (const c of bigGunpowder) {
      if (c.color !== "black") {
        colors.add(c.color);
      } else {
        colors.add("#fffacd");
      }
    }

    let colorCodeChar = "";
    for (const c of colors) {
      colorCodeChar += c.slice(1, 7);
    }
    return colorCodeChar;
  }

  //const handleChange = (e) => setColor(e.target.value);

  return (
    <div className="table">
      <div className="gunpowder-center">
        <svg
          viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
        >
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
                  fill={s.color}
                  onClick={() =>
                    colorChange(smallGunpowder, "small", color, s.id)
                  }
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
                  onClick={() => colorChange(bigGunpowder, "big", color, s.id)}
                />
              </g>
            );
          })}
          <g transform={`translate(${-10},${210})scale(0.9)`}>
            <rect x={0} y={0} width={127.5} height={68} />
            {palet.map((color, idx) => {
              if (level <= 3 && idx < 3) {
                return <g></g>;
              }
              return (
                <rect
                  x={5 + (idx % 4) * (25 + 5)}
                  y={5 + (25 + 5) * (idx - 3 < 0)}
                  width={27.5}
                  height={27.5}
                  fill={color}
                  stroke="black"
                  strokeWidth="3px"
                  onClick={() => {
                    setColor(color);
                  }}
                />
              );
            })}
          </g>
          <g transform={`translate(${contentWidth - 90},${210})scale(0.9)`}>
            <g onClick={() => setIndiv(false)}>
              {" "}
              <rect
                x={0}
                y={0}
                width={50}
                height={32.5}
                rx={5}
                stroke="skyblue"
                strokeWidth="2"
                fill={!indiv ? "skyblue" : "white"}
              />
              <text
                x={50 / 2}
                y={32.5 / 2}
                textAnchor="middle"
                dominantBaseline="central"
                stroke="black"
                strokeWidth="1"
                font-family="Verdana"
                font-size="20"
              >
                一周
              </text>
            </g>

            <g onClick={() => setIndiv(true)}>
              <rect
                x={0}
                y={37.5}
                width={50}
                height={30}
                rx={5}
                strokeWidth="2"
                stroke="skyblue"
                fill={indiv ? "skyblue" : "white"}
              />
              <text
                x={50 / 2}
                y={32.5 / 2 + 37.5}
                textAnchor="middle"
                dominantBaseline="central"
                stroke="black"
                strokeWidth="1"
                font-family="Verdana"
                font-size="20"
              >
                個別
              </text>
            </g>
          </g>
        </svg>
      </div>

      <div>
        <Link
          to={`/setup/${getColorArray()}/${p}`}
          style={{ color: "white", textDecoration: "none" }}
        >
          <button className="utiage-button">打ち上げ</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
