import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Make.css";
import kayakuImg from "../images/kayaku.PNG";
import hanabiImg from "../images/hanabi.PNG";
import "./Choice.css";

function Choice() {
  const [size, setSize] = useState(null);
  const [kayaku, setKayaku] = useState(null);
  const [sizeId, setSizeId] = useState(-1);
  const [kayakuID, setKayakuId] = useState(-1);

  const [color, setColor] = useState("#fffacd");
  const [level, setLevel] = useState(0);
  const [indiv, setIndiv] = useState(false);

  useEffect(() => {
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
  console.log(level);

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
    <div>
      <div>サイズと火薬を選んでね</div>
      <div className="hanabi-group">
        <img
          src={hanabiImg}
          style={{
            width: "100px",
            backgroundColor:
              sizeId === 1 ? "rgb(255,0,0, 0.5)" : "rgb(0,0,0,0)",
          }}
          onClick={() => {
            setSize(0.4);
            setSizeId(1);
          }}
          alt=""
        />
        <img
          src={hanabiImg}
          style={{
            width: "125px",
            backgroundColor:
              sizeId === 2 ? "rgb(255,0,0, 0.5)" : "rgb(0,0,0,0)",
          }}
          onClick={() => {
            setSize(0.7);
            setSizeId(2);
          }}
          alt=""
        />
        <img
          src={hanabiImg}
          style={{
            width: "150px",
            backgroundColor:
              sizeId === 3 ? "rgb(255,0,0, 0.5)" : "rgb(0,0,0,0)",
          }}
          onClick={() => {
            setSize(0.9);
            setSizeId(3);
          }}
          alt=""
        />
      </div>
      <div className="kayaku-group">
        <img
          src={kayakuImg}
          style={{
            width: "100px",
            backgroundColor:
              kayakuID === 1 ? "rgb(255,0,0, 0.5)" : "rgb(0,0,0,0)",
          }}
          onClick={() => {
            setKayaku(Math.random(0.1, 1));
            setKayakuId(1);
          }}
          alt=""
        />
        <img
          src={kayakuImg}
          style={{
            width: "100px",
            backgroundColor:
              kayakuID === 2 ? "rgb(255,0,0, 0.5)" : "rgb(0,0,0,0)",
          }}
          onClick={() => {
            setKayaku(Math.random(0.1, 1));
            setKayakuId(2);
          }}
          alt=""
        />
        <img
          src={kayakuImg}
          style={{
            width: "100px",
            backgroundColor:
              kayakuID === 3 ? "rgb(255,0,0, 0.5)" : "rgb(0,0,0,0)",
          }}
          onClick={() => {
            setKayaku(Math.random(0.1, 1));
            setKayakuId(3);
          }}
          alt=""
        />
      </div>
      <div>
        <button>
          <Link to={`/make/${kayaku}/${size}`}>次へ</Link>
        </button>
      </div>
    </div>
  );
}

export default Choice;
