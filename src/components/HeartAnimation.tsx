import React, { useEffect } from "react";

interface HeartAnimationProps {
  fireworks: boolean;
}

const HeartAnimation: React.FC<HeartAnimationProps> = ({ fireworks }) => {
  useEffect(() => {
    if (!fireworks) return; // Jika fireworks tidak true, jangan jalankan animasi

    const canvas = document.getElementById("heart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const rand = Math.random;
    const isDevice =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
      );

    const heartPosition = (rad: number) => [
      Math.pow(Math.sin(rad), 3),
      -(
        15 * Math.cos(rad) -
        5 * Math.cos(2 * rad) -
        2 * Math.cos(3 * rad) -
        Math.cos(4 * rad)
      ),
    ];

    const scaleAndTranslate = (
      pos: [number, number],
      sx: number,
      sy: number,
      dx: number,
      dy: number
    ) => [dx + pos[0] * sx, dy + pos[1] * sy];

    const pulse = (kx: number, ky: number) => {
      for (let i = 0; i < pointsOrigin.length; i++) {
        targetPoints[i] = [
          kx * pointsOrigin[i][0] + width / 2,
          ky * pointsOrigin[i][1] + height / 2,
        ];
      }
    };

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, width, height); // Bersihkan canvas saat resize
    };

    window.addEventListener("resize", resizeCanvas);

    let pointsOrigin: [number, number][] = [];
    let traceCount = isDevice ? 20 : 50;
    let dr = isDevice ? 0.3 : 0.1;

    let i;

    for (i = 0; i < Math.PI * 2; i += dr)
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
    for (i = 0; i < Math.PI * 2; i += dr)
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));

    let heartPointsCount = pointsOrigin.length;
    let targetPoints = Array.from({ length: heartPointsCount }, () => []);

    let elements = Array.from({ length: heartPointsCount }, (_, i) => {
      let x = rand() * width;
      let y = rand() * height;
      return {
        vx: 0,
        vy: 0,
        R: 2,
        speed: rand() + 1,
        q: ~~(rand() * heartPointsCount),
        D: 2 * (i % 2) - 1,
        force: 0.2 * rand() + 0.7,
        f: "rgba(200, 162, 200, 1)",
        trace: Array.from({ length: traceCount }, () => ({ x, y })),
      };
    });

    const config = {
      traceK: 0.4,
      timeDelta: 0.6,
    };

    let time = 0;

    const loop = () => {
      const n = -Math.cos(time);
      pulse((1 + n) * 0.5, (1 + n) * 0.5);
      time += (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta;

      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, width, height);

      elements.forEach((element) => {
        const q = targetPoints[element.q];
        const dx = element.trace[0].x - q[0];
        const dy = element.trace[0].y - q[1];
        const length = Math.sqrt(dx * dx + dy * dy);

        if (length < 10) {
          if (rand() > 0.95) {
            element.q = ~~(rand() * heartPointsCount);
          } else {
            if (rand() > 0.99) element.D *= -1;
            element.q += element.D;
            element.q %= heartPointsCount;
            if (element.q < 0) element.q += heartPointsCount;
          }
        }

        element.vx += (-dx / length) * element.speed;
        element.vy += (-dy / length) * element.speed;
        element.trace[0].x += element.vx;
        element.trace[0].y += element.vy;
        element.vx *= element.force;
        element.vy *= element.force;

        for (let k = 0; k < element.trace.length - 1; k++) {
          const T = element.trace[k];
          const N = element.trace[k + 1];
          N.x -= config.traceK * (N.x - T.x);
          N.y -= config.traceK * (N.y - T.y);
        }

        ctx.fillStyle = element.f;
        element.trace.forEach((pos) => {
          ctx.fillRect(pos.x, pos.y, 1, 1);
        });
      });

      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ctx.clearRect(0, 0, width, height); // Bersihkan canvas saat efek dihapus
    };
  }, [fireworks]);

  return (
    <canvas
      id="heart"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default HeartAnimation;
