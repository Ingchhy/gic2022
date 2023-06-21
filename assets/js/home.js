class Player {
  constructor(name, car) {
    this.name = name;
    this.car = car;
    this.score = 0;
    this.level = 2;
  }
}

const canvas = document.querySelector("#my-canvas");
if (canvas.getContext) {
  let context = canvas.getContext("2d");

  // Variables
  const defaultSpeed = 5;
  const playGround = {
    w: 1020,
    h: 1243,
  };
  let currentY = 0;
  let current1Y = -playGround.h;

  const road = new Image();
  road.src = "./assets/images/road.png";
  const car = new Image();
  car.src = "./assets/images/red-car.png";

  const player1 = new Player("Sok", car);
  let speed = player1.level * defaultSpeed;

  // Functions
  function startGame() {
    window.requestAnimationFrame(startGame);

    context.clearRect(0, 0, playGround.w, playGround.h);
    context.drawImage(road, 0, current1Y);
    context.drawImage(road, 0, currentY);
    currentY += speed;
    current1Y += speed;

    if (currentY >= playGround.h) currentY = 0;
    if (current1Y >= 0) current1Y = -playGround.h;

    context.drawImage(player1.car, 300, 1000);
  }

  // Promises
  const loadRoadPromise = new Promise((resolve) => {
    road.onload = () => resolve();
  });
  const loadCarPromise = new Promise((resolve) => {
    car.onload = () => resolve();
  });

  Promise.all([loadRoadPromise, loadCarPromise]).then(() => {
    startGame();
  });
}
