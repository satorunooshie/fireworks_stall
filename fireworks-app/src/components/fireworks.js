const Y_AXIS = 1;
const X_AXIS = 2;
let canvas;
let fireworks = [];
let star = [];
let originColor = "red";
let p = 0;
let colorArray = [];

const testSketch = (p5) => {
  p5.setup = () => {
    canvas = p5.createCanvas(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );
    canvas.position(0, 0);
    canvas.style("z-index", "-1");
    p5.colorMode(p5.RGB);
    p5.frameRate(60);
    preStar();
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.color) {
      originColor = props.color;
    }
    if (props.p) {
      p = props.p;
    }
    if (props.colors) {
      console.log(props.colors);
      colorArray = props.colors;
    }
  };
  console.log(originColor);
  console.log(colorArray);

  p5.draw = () => {
    // 背景色を設定
    setGradient(
      0,
      0,
      p5.width,
      p5.height,
      p5.color(0, 0, 0),
      p5.color(24, 32, 72),
      Y_AXIS
    );
    p5.noStroke();

    // 星を描く
    drawStar();

    // 花火を打ち上げる間隔を調整
    if (0 === p5.frameCount % 120 && p5.frameCount > 100) {
      // 打ち上がるスピード
      let speed = p5.random(10, 30);
      fireworks.push(
        new FireWork(
          p5.random(p5.width),
          p5.height,
          0,
          speed,
          0.98,
          "#fffacd",
          "#fffacd",
          "other"
        )
      );
    }

    //自分の花火
    if (p5.frameCount === 100) {
      fireworks.push(
        new FireWork(
          p5.width / 2,
          p5.height,
          0,
          10,
          0.98,
          colorArray[0],
          colorArray[1],
          //"#ffffff",
          //"#123456",
          "origin",
          p
        )
      );
    }

    for (let fw of fireworks) {
      // 打ち切った花火を処理対象から外す（配列から削除する）
      if (2 === fw.getType || 30000 < fw.getFrame) {
        fireworks = fireworks.filter((n) => n !== fw);
        continue;
      }

      // 打ち上げアニメーションを呼び出す
      fw.fire();
    }
  };

  class FireWork {
    // 初期設定
    constructor(x, y, vx, vy, gv, color, color2, user, p) {
      // フレームカウンター
      this.frame = 0;
      this.type = 0;
      this.next = 0;
      // 花火の色
      this.r = p5.random(155) + 80;
      this.g = p5.random(155) + 80;
      this.b = p5.random(155) + 80;
      this.a = 255;

      if (color) {
        //console.log();
        this.r = parseInt(color.substring(1, 3), 16);
        this.g = parseInt(color.substring(3, 5), 16);
        this.b = parseInt(color.substring(5, 7), 16);
      }

      this.r2 = 255; //p5.random(105) + 80;
      this.g2 = 0; //p5.random(105) + 80;
      this.b2 = 0; //p5.random(105) + 80;
      //console.log(color);
      if (color2) {
        this.r2 = parseInt(color2.substring(1, 3), 16);
        this.g2 = parseInt(color2.substring(3, 5), 16);
        this.b2 = parseInt(color2.substring(5, 7), 16);
      }

      // 初期位置
      this.x = x;
      this.y = y;

      // 玉の大きさ
      this.w = p5.random(10, 5);

      // 打ち上がる高さ
      if (user === "origin") {
        this.maxHeight = p5.height / 7 + 500 * (1 - p);
      } else {
        this.maxHeight = p5.random(p5.height / 5, p5.height / 2);
      }
      this.fireHeight = p5.height - this.maxHeight;

      // 重力
      this.vx = vx;
      this.vy = vy;
      this.gv = gv;

      // 残像表示用配列
      this.afterImages = [];
      // 爆発用配列
      this.explosions = [];

      // 消えてから爆発までの遅延時間
      this.exDelay = p5.random(10, 40);

      if (user === "origin") {
        // 爆発の大きさ
        this.large = p5.random(8, 15);
        // 爆発の玉の数
        this.ball = p5.random(50, 100);
      } else {
        this.large = p5.random(3, 5);
        this.ball = p5.random(20, 80);
      }

      // 爆発から消えるまでの長さ
      this.exend = p5.random(20, 40);
      // 爆発のブレーキ
      this.exStop = 0.96;
    }

    get getFrame() {
      return this.frame;
    }

    get getType() {
      return this.type;
    }

    // 処理コントロール
    fire() {
      // 0:打ち上げ（初期） 1:爆発
      switch (this.type) {
        case 0:
          this.rising();
          break;
        case 1:
          this.explosion();
          break;
      }
    }

    // 打ち上げアニメーション
    rising() {
      // 頂点まで達したら消す
      if (this.y * 0.8 < this.maxHeight) {
        this.a = this.a - 6;
      }

      // 指定の高さまで上昇する
      this.x += this.vx;
      this.y -=
        this.vy * ((this.fireHeight - (p5.height - this.y)) / this.fireHeight);

      // 残像を表示
      this.afterImages.push(
        new Afterimage(
          this.r,
          this.g,
          this.b,
          this.x,
          this.y,
          this.w,
          this.a,
          this.user
        )
      );
      for (let ai of this.afterImages) {
        if (ai.getAlpha <= 0) {
          this.afterImages = this.afterImages.filter((n) => n !== ai);
          continue;
        }
        ai.rsImage();
      }

      // 打ち上げ表示
      this.update(this.x, this.y, this.w);

      // 全ての表示が消えたら処理の種類を変更する
      if (0 == this.afterImages.length) {
        if (0 === this.next) {
          // 消えてから爆発まで遅延させる
          this.next = this.frame + Math.round(this.exDelay);
        } else if (this.next === this.frame) {
          // 花火の大きさ
          for (let i = 0; i < this.ball; i++) {
            // 爆発の角度
            let r = p5.random(0, 360);
            // 花火の内側を作る（バラバラ）
            let s = p5.random(0.1, 0.9);
            let vx = Math.cos((r * Math.PI) / 180) * s * this.large;
            let vy = Math.sin((r * Math.PI) / 180) * s * this.large;
            this.explosions.push(
              new FireWork(this.x, this.y, vx, vy, this.exStop)
            );
            // 花火の輪郭を作る（丸くなるようにする）
            let cr = p5.random(0, 360);
            let cs = p5.random(0.9, 1);
            let cvx = Math.cos((cr * Math.PI) / 180) * cs * this.large;
            let cvy = Math.sin((cr * Math.PI) / 180) * cs * this.large;
            this.explosions.push(
              new FireWork(this.x, this.y, cvx, cvy, this.exStop)
            );
          }
          this.a = 255;
          this.type = 1;
        }
      }
    }

    // 爆発アニメーション
    explosion() {
      for (let ex of this.explosions) {
        ex.frame++;
        // 爆発し終わった花火を配列から除去する
        if (2 === ex.getType) {
          this.explosions = this.explosions.filter((n) => n !== ex);
          continue;
        }

        // 残像を描画
        if (0 === Math.round(p5.random(0, 32))) {
          ex.afterImages.push(
            new Afterimage(
              this.r,
              this.g,
              this.b,
              ex.x,
              ex.y,
              ex.w,
              ex.a,
              this.r2,
              this.g2,
              this.b2,
              this.user
            )
          );
        }

        for (let ai of ex.afterImages) {
          if (ai.getAlpha < 0) {
            ex.afterImages = ex.afterImages.filter((n) => n !== ai);
            continue;
          }
          ai.exImage();
        }

        // 爆発を描画
        this.update(ex.x, ex.y, ex.w, ex.a);
        ex.x += ex.vx;
        ex.y += ex.vy;
        ex.vx = ex.vx * ex.gv;
        ex.vy = ex.vy * ex.gv;
        ex.vy = ex.vy + ex.gv / 30;
        if (this.exend < ex.frame) {
          ex.w -= 0.1;
          ex.a = ex.a - 4;
          if (ex.a < 0 && 0 === ex.afterImages.length) {
            ex.type = 2;
          }
        }
      }
    }

    // 花火を表示する
    update(x, y, w, a) {
      this.frame++;
      if (0 < this.a) {
        let c = p5.color(this.r, this.g, this.b);
        c.setAlpha(a);

        if (this.frame % 2 === 0) {
          //c = p5.color(this.r, this.g, this.b);
          p5.fill(c);
        } else {
          //c = p5.color(this.r2, this.g2, this.b2);
          p5.fill(c);
        }

        //p5.fill(c);
        p5.ellipse(x, y, w, w);
      }
    }
  }

  // 残像処理用クラス
  class Afterimage {
    constructor(r, g, b, x, y, w, a, r2, g2, b2, user) {
      this.frame = 0;
      this.r = r;
      this.g = g;
      this.b = b;
      this.x = x;
      this.y = y;
      this.w = w;
      this.a = a;
      this.r2 = r2;
      this.g2 = g2;
      this.b2 = b2;
      this.user = user;
      this.vx = p5.random(-0.24, 0.24);
      this.vy = p5.random(0.2, 0.8);
      this.vw = p5.random(0.05, 0.2);
    }

    get getAlpha() {
      return this.a;
    }

    // 打ち上げ用
    rsImage() {
      if (0 < this.a) {
        this.update(this.r, this.g, this.b, this.x, this.y, this.w, this.a);
        this.r += 4;
        this.g += 4;
        this.b += 4;
        this.r2 += 4;
        this.g2 += 4;
        this.b2 += 4;
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        if (0 < this.w) {
          this.w = this.w - this.vw;
        }
        this.a = this.a - 4;
      }
    }

    // 爆発用
    exImage() {
      if (0 < this.a) {
        //console.log(Math.round(this.x + this.y) / 2);
        /*if (Math.round(this.x + this.y) / 2 === 0) {
          this.update(this.r, this.g, this.b, this.x, this.y, this.w, this.a);
        } else {
          this.update(
            this.r2,
            this.g2,
            this.b2,
            this.x,
            this.y,
            this.w,
            this.a
          );
        }*/

        this.update(
          this.r,
          this.g,
          this.b,
          this.x,
          this.y,
          this.w,
          this.a,
          this.r2,
          this.g2,
          this.b2,
          this.user
        );

        this.r += 2.5;
        this.g += 2.5;
        this.b += 2.5;
        this.r2 += 2.5;
        this.g2 += 2.5;
        this.b2 += 2.5;
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        if (0 < this.w) {
          this.w = this.w - this.vw;
        }
        this.a = this.a - 1.5;
      }
    }

    update(r, g, b, x, y, w, a, r2, g2, b2, user) {
      this.frame++;
      let c = p5.color(r, g, b);
      // console.log(user);

      if (this.frame % 2 === 0) {
        c = p5.color(r, g, b);
        p5.fill(c);
      } else {
        c = p5.color(r2, g2, b2);
        p5.fill(c);
      }

      c.setAlpha(a);
      p5.ellipse(x, y, w, w);
    }
  }

  // グラデーションを描画
  function setGradient(x, y, w, h, c1, c2, axis) {
    p5.noFill();

    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = p5.map(i, y, y + h, 0, 1);
        let c = p5.lerpColor(c1, c2, inter);
        p5.stroke(c);
        p5.line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = p5.map(i, x, x + w, 0, 1);
        let c = p5.lerpColor(c1, c2, inter);
        p5.stroke(c);
        p5.line(i, y, i, y + h);
      }
    }
  }

  // 星を作成
  function preStar() {
    star = [];
    for (let i = 0; i < 100; i++) {
      star.push([
        p5.random(p5.width),
        p5.random(p5.height / 2),
        p5.random(1, 4),
      ]);
    }
  }

  // 星を描画
  function drawStar() {
    // 星を描く
    for (let s of star) {
      let c = p5.color(p5.random(150, 255), p5.random(150, 255), 255);
      c.setAlpha(p5.random(150, 200));
      p5.fill(c);
      p5.ellipse(s[0], s[1], s[2], s[2]);
    }
  }
};

export default testSketch;
