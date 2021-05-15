var ball;
var database, position;

function setup(){
    database= firebase.database();

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //ref function is used to refer to the location o the database's value. 
    var ballposition= database.ref("ball/position")
    // On function is used to read the data from the database.
    ballposition.on("value", readPosition, showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("ball/position").set({
        "x":position.x+x,
        "y": position.y+y
    })

}
 
function showError(){
    alert("Connection failed. Please try again.");
}

function readPosition(data){
    position= data.val();
    ball.x=position.x
    ball.y=position.y
}