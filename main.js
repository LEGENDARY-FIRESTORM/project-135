status1 = "";
objects = [];

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

    if(status1 != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        cocossd.detect(gotResult);

        for(i = 0; i < objects.length; i++){
            synth = window.speechSynthesis;
            object_name = objects[i].label;
            document.getElementById("status1").innerHTML = "Status - Detected Objects";
            percent = floor(objects[i].confidence * 100);
            fill(r, g, b);
            noFill();
            stroke(r, g, b);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y + 10);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(object_name == inputValue){
                utterThis = new SpeechSynthesisUtterance(object_name + " is found");
        
                video.stop();
                document.getElementById("status2").innerHTML = object_name + " found";
                synth.speak(utterThis);
            }

            else{
                document.getElementById("status2").innerHTML = object_name + " not found";
            }
        }
    }
}

function start(){
    cocossd = ml5.objectDetector("cocossd", modelLoaded);
    inputValue = document.getElementById("input1").value;
    document.getElementById("status1").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}