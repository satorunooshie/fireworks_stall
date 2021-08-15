import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Make.css";
import kayakuImg from "../images/kayaku.PNG";
import hanabiImg from "../images/hanabi.PNG";
import chochinImg from "../images/tyoutinn.png";
import "./Choice.css";

function Choice() {
  const [size, setSize] = useState(null);
  const [kayaku, setKayaku] = useState(null);
  const [sizeId, setSizeId] = useState(-1);
  const [kayakuID, setKayakuId] = useState(-1);

  const [level, setLevel] = useState(0);

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

  return (
    <div>
      <img
        src={chochinImg}
        style={{
          width: "100%",
        }}
        alt=""
      />
      <div
        style={{ textAlign: "center", margin: "1.25rem", fontSize: "1.75rem" }}
      >
        サイズと火薬を選んでね
      </div>
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
      {size == null || kayaku == null ? (
        <div></div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button>
            <Link to={`/make/${kayaku}/${size}`}>次へ</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default Choice;
