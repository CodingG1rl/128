song="";
function preload(){
song=loadSound("music.mp3");
}

scoreRightWrist=0;
scoreLeftWrist=0;

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

function modelLoaded(){
    console.log('PoseNet is initialized');
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist="+scoreRightWrist+"scoreLeftWrist="+scoreLeftWrist);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);

        if(rightWristY>0 && rightWristX<=100){
            document.getElementById("speed").innerHTML= "speed=0.5x";
            song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristX<=200){
            document.getElementById("speed").innerHTML= "speed=1x";
            song.rate(1);
        }
        else if(rightWristY>200 && rightWristX<=300){
            document.getElementById("speed").innerHTML= "speed=1.5x";
            song.rate(1.5);
        }
        else if(rightWristY>300 && rightWristX<=400){
             document.getElementById("speed").innerHTML= "speed=2x";
             song.rate(2);
        }
        else if(rightWristY>400){
            document.getElementById("speed").innerHTML= "speed2.5x";
            song.rate(2.5);
        }
    }


        if(scoreLeftWrist>0.2){
         circle(leftWristX,leftWristY,20);
         InNumber.leftWristY=Number(leftWristY);
         remove_decimals=floor(InNumber.leftWristY);
         volume=remove_decimals/500;
         document.getElementById("volume").innerHTML= "Volume="+volume;
         song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}