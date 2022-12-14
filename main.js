status1 = "";

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function preload(){
}

function draw(){
    image(video, 0, 0, 640, 420);
}

function start(){
    cocossd = objectDetector("cocossd", modelLoaded);
    inputValue = document.getElementById("input1").value;
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
}