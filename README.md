<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MingquanYang's final Project</title>
</head>
<body>
    <h1>MingquanYang's final project</h1>
    <ol>
        <li>
            <h2>Steering Wheel Escape>
            <p>Description: This is a simulated driving game I designed using p5.js and the MediaPipe library. It utilizes the HandLandmarker class to recognize and calculate the relative positions of the player's wrists, allowing the player to simulate steering by controlling the horizontal position of the car. The goal is to navigate the vehicle, avoid obstacles, and collect coins.

Initially, I attempted to use PoseNet from ml5.js for dual-arm pose detection. However, I found that while PoseNet excelled in facial expression recognition, its sensitivity for pose detection was insufficient, significantly reducing the responsiveness of my driving controls. (You can experience it here: [link to code]). So, I tried using head tilting to control the horizontal position of the car, but found that it obstructed the player's view of the game screen, thus impacting the gaming experience. Consequently, I contacted Adam, and with his permission, I opted to use MediaPipe for wrist position detection. The MediaPipe HandLandmarker class accurately identifies wrist positions, which I believe provides a more realistic driving simulation, enhancing immersion for the player.

In terms of game interface design, I leveraged my expertise in visual design from my undergraduate studies, incorporating pixel art and UI element designs. Some elements, such as coins and rocks, utilized free resources from Freepik.

Regarding game mechanics, I designed three types of obstacles, each with different penalty rules. Colliding with branches and barriers results in losing a life, while colliding with kangaroos deducts points. Conversely, colliding with coins and diamonds accumulates different scores. I implemented collision detection using the hits() method and the collideRectRect() function to determine whether the car intersects with obstacles or rewards.

Through this simulated driving game, my aim is to provide players with an enjoyable gaming experience while also helping to alleviate shoulder and neck tension, easing muscle fatigue.</p>
            <iframe width="560" height="315" src="https://www.youtube.com/watch?v=IkiwghBf7KQ&t=2s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>My code is here: <a href="https://editor.p5js.org/mingquany25/sketches/vzWtSiqs6">here</a></p>
            <p>You can play here: <a href="https://editor.p5js.org/mingquany25/sketches/vzWtSiqs6">here</a></p>
            <p>All code you can find in github: <a href="https://github.com/MingquanYang/coding2-final-work-22003678-Mingquan-Yang">here</a></p>
        </li>
    </ol>
</body>

