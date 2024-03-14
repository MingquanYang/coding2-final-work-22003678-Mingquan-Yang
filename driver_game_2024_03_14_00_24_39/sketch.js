let carImg;
let coin1Img, coin2Img;
let obstacleImgs = [];
let car;
let items = []; // coins and obstacles
let life = 3;
let score = 0;
let track;
let video;
let poseNet;
let poses = [];
let posX;
let angle;
let page;
let startPageImg, gameOverImg, introImg;
// Don't change the names of these global variables.
let myHandLandmarker;
let myPoseLandmarker;
let myFaceLandmarker;
let handLandmarks;
let poseLandmarks;
let faceLandmarks;
let myCapture;
let lastVideoTime = -1;
let spd = 5
let font;

// For landmarks you want, set to true; set false the ones you don't.
// Works best with just one or two sets of landmarks.
const trackingConfig = {
  doAcquireHandLandmarks: true,
  poseModelLiteOrFull: "lite" /* "lite" (3MB) or "full" (6MB) */,
  cpuOrGpuString: "GPU" /* "GPU" or "CPU" */,
  maxNumHands: 2,
};
async function preload() {
  carImg = loadImage("car.png");
  coin1Img = loadImage("award1.png");
  coin2Img = loadImage("coin.png");
  track = loadImage("track.jpg");
  steering = loadImage("steeringwheel.png");
  cab = loadImage("Cab.jpg");
  startPageImg = loadImage("cover.jpg");
  introImg = loadImage("introduction.jpg");
  gameOverImg = loadImage("gameover.jpg");
  font = loadFont("Karmatic Arcade.ttf")
  angle = 0;

  for (let i = 1; i <= 4; i++) {
    obstacleImgs.push(loadImage("barrier" + i + ".png"));
  }

  const mediapipe_module = await import(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js"
  );

  HandLandmarker = mediapipe_module.HandLandmarker;
  PoseLandmarker = mediapipe_module.PoseLandmarker;
  FaceLandmarker = mediapipe_module.FaceLandmarker;
  FilesetResolver = mediapipe_module.FilesetResolver;

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.7/wasm"
  );

  // Hand Landmark Tracking:
  // https://codepen.io/mediapipe-preview/pen/gOKBGPN
  // https://mediapipe-studio.webapps.google.com/studio/demo/hand_landmarker
  if (trackingConfig.doAcquireHandLandmarks) {
    myHandLandmarker = await HandLandmarker.createFromOptions(vision, {
      numHands: trackingConfig.maxNumHands,
      runningMode: "VIDEO",
      baseOptions: {
        delegate: trackingConfig.cpuOrGpuString,
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      },
    });
  }
}
//------------------------------------------
async function predictWebcam() {
  let startTimeMs = performance.now();
  if (lastVideoTime !== myCapture.elt.currentTime) {
    if (trackingConfig.doAcquireHandLandmarks && myHandLandmarker) {
      handLandmarks = myHandLandmarker.detectForVideo(
        myCapture.elt,
        startTimeMs
      );
    }

    lastVideoTime = myCapture.elt.currentTime;
  }
  window.requestAnimationFrame(predictWebcam);
}

function setup() {
  createCanvas(1140, 695);
  page = 0;
  textFont(font)
   score = 0;
  life = 3;
  items = [];
  posX = width / 2;
  // Create a new poseNet method with a single detection
  myCapture = createCapture(VIDEO, { flipped: true });
  myCapture.size(320, 240);
  myCapture.hide();
  option = {
    architecture: "MobileNetV1",
    imageScaleFactor: 0.3,
    outputStride: 16,
    flipHorizontal: true,
    minConfidence: 0.7,
    maxPoseDetections: 1,
    scoreThreshold: 0.5,
    nmsRadius: 20,
    detectionType: "multiple",
    inputResolution: 513,
    multiplier: 0.75,
    quantBytes: 2,
  };
  video = myCapture;

  car = new Car();
  bg = new BG();
}
function modelReady() {
  select("#status").html("Model Loaded");
}
function startGamePage() {
  image(startPageImg, 0,0, width, height);
      // console.log("1")
  if(mouseX>489
&& mouseY>521 &&mouseX<664&&mouseY<566){
    fill(0,30)
    noStroke()
    rect(489,521,175,45);
    if(mouseIsPressed){
      page = 2
    }
  }
  
  if(mouseX>377
&& mouseY>592 &&mouseX<757&&mouseY<633){
    fill(0,30)
    noStroke()
    rect(377,592,380,45);
    if(mouseIsPressed){
      page = 1
    }
  }
}

function instructionPage() {
  image(introImg, 0,0, width, height);
  if(mouseX>57&& mouseY>592 &&mouseX<138&&mouseY<652){
    fill(0,30)
    noStroke()
    rect(54,
592,88,60);
    if(mouseIsPressed){
      page = 0
    }
  }
}

function gameOverPage() {
  image(gameOverImg, 0, 0, width, height);
  push()
   fill(0);
  textAlign(CENTER)
    noStroke();
    textSize(30);
    text(`Score: ${score}`, width/2, height*0.3);
  pop()
  
   if(mouseX>369&& mouseY>472 &&mouseX<770&&mouseY<533){
    fill(0,30)
    noStroke()
    rect(369,
472,400,63);
    if(mouseIsPressed){
      page = 0
      setup()
    }
  }
}
function draw() {
  if (mouseIsPressed) {
    console.log(mouseX, mouseY);
  }
  if (page == 0) {
    startGamePage();
  }else if(page==1){
    instructionPage()
  } else if(page==2) {
    if(spd<10){
          spd+=0.005

    }
    if(life<=0){
      page=3
    }
    bg.run();
    // 显示和移动汽车
    car.show();
    car.move();

    // 生成金币和障碍物
    if (frameCount % 60 === 0) {
      // 每隔一段时间生成
      let type = random([1,1,2,2,2, 3, 4, 5]); // 1 和 2 代表金币，3-5 代表障碍物
      items.push(new Item(type));
    }

    // 更新和显示金币/障碍物
    for (let i = items.length - 1; i >= 0; i--) {
      items[i].show();
      items[i].update();

      // 检查碰撞
      if (car.hits(items[i])) {
        if (items[i].type == 1) {
          // 是金币
          score += 100;
        } else if(items[i].type == 2){
          // 是障碍物
          score += 30;
        }else if(items[i].type == 3){
          // 是障碍物
          score -= 50;
        }else if(items[i].type == 4){
          life -= 1;
          score-=30
        }else{
          life-=1
          score-=50
}
        items.splice(i, 1); // 移除碰撞的对象
      } else if (items[i].y > height) {
        items.splice(i, 1); // 移除屏幕外的对象
      }
    }

    // 显示分数
    fill(0);
    noStroke();
    textSize(24);
    text(`Score: ${score}`, 10, 30);
    text(`Life: ${life}`, 10, 60);

    // drawKeypoints();
    predictWebcam();

    drawHandPoints();
    drawDiagnosticInfo();
  }else{
    gameOverPage()
  }
}

// 定义汽车类
class Car {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    // this.dir = 0;
  }

  show() {
    push();
    imageMode(CENTER);
    image(carImg, this.x, this.y, 50, 100);
    pop();
  }

  // setDir(dir) {
  //   this.dir = dir;
  // }

  move() {
    // this.x += this.dir * 5;
    this.x = constrain(this.x, width * 0.35, width * 0.65);
  }

  hits(item) {
    // 简单的碰撞检测逻辑
    return collideRectRect(
      this.x,
      this.y,
      40,
      80,
      item.x,
      item.y,
      item.w,
      item.h
    );
  }
}
class BG {
  constructor() {
    this.h = -height;
    // this.speed = spd;
  }
  run() {
    this.h += spd;
    if (this.h >= height) {
      this.h = -height;
    }
    this.show();
  }
  show() {
    image(track, 0, this.h - 2 * height, width, 2 * height);
    image(track, 0, this.h, width, 2 * height);
    image(video, width * 0.71, height - 210, 300, 200);
    push();
    imageMode(CENTER);
    image(cab, 170, height - 110, 300, 200);
    translate(148, height - 110);
    // let angle = map(car.x, -1, 1, -PI / 4, PI / 4);
    let stearAngle = map(angle, -5, 5, -PI / 4, PI / 4, true);
    // console.log(angle,stearAngle)
    rotate(stearAngle);
    image(steering, 0, 0, 120, 110);
    pop();
  }
}
// 定义金币和障碍物类
class Item {
  constructor(type) {
    this.type = type;
    this.x = random(width * 0.35, width * 0.65);
    this.y = 0;
    // this.speed = spd;
    this.img =
      this.type === 1
        ? coin1Img
        : this.type === 2
        ? coin2Img
        : obstacleImgs[this.type - 3];
    this.w = this.img.width / 3;
    this.h = this.img.height / 3;
  }

  show() {
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.w, this.h);
    pop();
  }

  update() {
    this.y +=spd;
  }
}

// 碰撞检测函数
function collideRectRect(x, y, w, h, x2, y2, w2, h2) {
  return x < x2 + w2 && x + w > x2 && y < y2 + h2 && y + h > y2;
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    // console.log(pose);
    let leftEye = pose.leftEye;
    let rightEye = pose.rightEye;
    if (rightEye.confidence > 0.9 && leftEye.confidence > 0.9) {
      angle =
        (atan(
          (rightEye.y - leftEye.y) / height,
          (rightEye.x - leftEye.x) / width
        ) /
          PI) *
        180;
      stroke(255, 0, 0);
      // noStroke();
      line(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
      car.x += angle;
    }
  }
}
function drawHandPoints() {
  if (trackingConfig.doAcquireHandLandmarks) {
    if (handLandmarks && handLandmarks.landmarks) {
      const nHands = handLandmarks.landmarks.length;
      // console.log(nHands);

      if (nHands == 2) {
        // Draw lines connecting the joints of the fingers
        noFill();
        stroke("black");

        strokeWeight(2.0);

        // Draw just the joints of the hands
        strokeWeight(1.0);
        stroke("black");
        fill("red");
        let rightWrist = handLandmarks.landmarks[0][0];
        let leftWrist = handLandmarks.landmarks[1][0];
        angle =
          ((atan(rightWrist.y - leftWrist.y, rightWrist.x - leftWrist.x) / PI) *
            180) /
          4;
        stroke(255, 0, 0);
        // noStroke();
        line(
          leftWrist.x * width,
          leftWrist.y * height,
          rightWrist.x * width,
          rightWrist.y * height
        );
        car.x += angle;
      }
    }
  }
}

function drawDiagnosticInfo() {
  noStroke();
  fill("black");
    textSize(24);
  text("FPS: " + int(frameRate()), 10, 90);
}
