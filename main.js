song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
    song = loadSound("music.mp3")
}

function setup(){
    canvas = crateCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist =" + scoreLeftWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function modelLoaded()
{
    console.log('PoseNet está inicializando');
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#800080");
    stroke("#800080");

    if(scoreLeftWrist > 0.2)
{ 
    circle(leftWristX, leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    volume = floor(InNumberleftWristY)/500;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song.setVolume(volume);
 }
}

function play()
{
    song.play(); 
    song.setVolume(1);
    song.rate(1);
}