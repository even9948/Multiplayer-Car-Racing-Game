var hypnoBall ,dataBase;
var position;

function setup(){
    dataBase = firebase.database();
    createCanvas(500,500);
    hypnoBall = createSprite(250,250,10,10);
    hypnoBall.shapeColor="green";

    var hypnoBallPosition = dataBase.ref('ball/position');
    hypnoBallPosition.on("value",readPosition,showError );
}

function draw(){
    background("white");
    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        if(keyDown(RIGHT_ARROW)){
            writePosition(+1,0);
        }
        if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        if(keyDown(DOWN_ARROW)){
            writePosition(0,1);
        }
    }
    drawSprites();
}

function writePosition(x,y){
    dataBase.ref('ball/position').set({
        x: position.x + x,
        y: position.y + y
    })
    
}
function readPosition(data){
    position = data.val();
    hypnoBall.x = position.x;
    hypnoBall.y = position.y;
}
function showError(){
    console.log("error");
}