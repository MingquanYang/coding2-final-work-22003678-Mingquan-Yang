
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>final work</title>
</head>
<body>
    <h1>Final Work</h1>

    <h2>Project Introduction:</h2>
    <p>This is a simulated driving game I designed using p5.js and the MediaPipe library. It utilizes the HandLandmarker class to recognize and calculate the relative positions of the player's wrists, allowing the player to simulate steering by controlling the horizontal position of the car. The goal is to navigate the vehicle, avoid obstacles, and collect coins.

Initially, I attempted to use PoseNet from ml5.js for dual-arm pose detection. However, I found that while PoseNet excelled in facial expression recognition, its sensitivity for pose detection was insufficient, significantly reducing the responsiveness of my driving controls. (You can experience it here: [(https://editor.p5js.org/mingquany25/sketches/8sfonRSqc)]). So, I tried using head tilting to control the horizontal position of the car, but found that it obstructed the player's view of the game screen, thus impacting the gaming experience. Consequently, I contacted Adam, and with his permission, I opted to use MediaPipe for wrist position detection. The MediaPipe HandLandmarker class accurately identifies wrist positions, which I believe provides a more realistic driving simulation, enhancing immersion for the player.

In terms of game interface design, I leveraged my expertise in visual design from my undergraduate studies, incorporating pixel art and UI element designs. Some elements, such as coins and rocks, utilized free resources from Freepik.

Regarding game mechanics, I designed three types of obstacles, each with different penalty rules. Colliding with branches and barriers results in losing a life, while colliding with kangaroos deducts points. Conversely, colliding with coins and diamonds accumulates different scores. I implemented collision detection using the hits() method and the collideRectRect() function to determine whether the car intersects with obstacles or rewards.

Through this simulated driving game, my aim is to provide players with an enjoyable gaming experience while also helping to alleviate shoulder and neck tension, easing muscle fatigue.</p>

    <h2>Video:</h2>
    <iframe width="1120" height="630" src="https://www.youtube.com/embed/IkiwghBf7KQ" frameborder="0" allowfullscreen></iframe>

    <p>My code is here: <a href="https://editor.p5js.org/mingquany25/sketches/vzWtSiqs6">https://editor.p5js.org/mingquany25/sketches/vzWtSiqs6</a></p>
    <p>You can play here: <a href="https://editor.p5js.org/mingquany25/full/vzWtSiqs6">https://editor.p5js.org/mingquany25/sketches/vzWtSiqs6</a></p>
</body>
</html>


