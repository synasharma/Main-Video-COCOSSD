object=[];
function preload()
{
video=createVideo("video.mp4");
video.hide();
}

function setup()
{

canvas=createCanvas(1000,600);
canvas.center();

}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded()
{
console.log("modelLoaded!");
video.loop();
video.speed(1);
video.volume(0);
status=true; //Assigning variable 'status' to value true, model has loaded.
}


function gotResult(error,result)
{
    if (error)
    {
        console.log(error);
    }

    else
    {
        console.log(result);
        object=result;
    }

}

function draw()
{
image(video,0,0,1000,600);
if (status != "")
{
objectDetector.detect(video,gotResult);
for (i=0;i<object.length;i++)
{
    document.getElementById("status").innerHTML="Status: Objects Detected";
    document.getElementById("no_objects").innerHTML="No of Objects Detected: "+object.length;
    fill ("red");
    textSize(25);
    stroke("red")
    percent=floor(object[i].confidence*100);
    text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
    noFill();
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
}
}
}